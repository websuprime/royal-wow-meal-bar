import { FastifyRequest, FastifyReply } from 'fastify'
import { menuService } from '../services/menu.service'
import { successResponse, errorResponse } from '../utils/response'
import {
  menuRecordsFromCsv,
  menuRecordsFromXlsx,
  menuItemsToCsvString,
  menuItemsToXlsxBuffer,
} from '../utils/menuImportExport'
import path from 'path'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pump = promisify(pipeline)

export class MenuController {
  constructor() {
    this.getAllMenu = this.getAllMenu.bind(this)
    this.getMenuByType = this.getMenuByType.bind(this)
    this.createMenuItem = this.createMenuItem.bind(this)
    this.updateMenuItem = this.updateMenuItem.bind(this)
    this.deleteMenuItem = this.deleteMenuItem.bind(this)
    this.exportMenuCsv = this.exportMenuCsv.bind(this)
    this.exportMenuXlsx = this.exportMenuXlsx.bind(this)
    this.importMenuFile = this.importMenuFile.bind(this)
  }

  async getAllMenu(request: FastifyRequest, reply: FastifyReply) {
    try {
      const items = await menuService.getAllMenu()
      return reply.send(successResponse(items, 'Menu items retrieved successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to fetch menu items'))
    }
  }

  async getMenuByType(request: FastifyRequest<{ Params: { type: string } }>, reply: FastifyReply) {
    try {
      const { type } = request.params
      const items = await menuService.getMenuByType(type)
      return reply.send(successResponse(items, `Menu items for ${type} retrieved successfully`))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to fetch menu items'))
    }
  }

  private async parseRequest(request: FastifyRequest) {
    const data: any = {}
    
    if (!request.isMultipart()) {
      return request.body as any
    }

    const parts = request.parts()
    for await (const part of parts) {
      if (part.type === 'file') {
        if (part.filename) {
          const filename = `${Date.now()}-${part.filename}`
          const uploadDir = path.join(__dirname, '../../uploads/menu')
          
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
          }
          
          const savePath = path.join(uploadDir, filename)
          await pump(part.file, fs.createWriteStream(savePath))
          data[part.fieldname] = `/uploads/menu/${filename}`
        } else {
          // Consume empty file streams
          await part.file.resume()
        }
      } else {
        // It's a field
        data[part.fieldname] = part.value
      }
    }

    // Explicit type casting for known fields
    if (data.price) data.price = Number(data.price)
    if (data.available !== undefined) {
      data.available = String(data.available).toLowerCase() === 'true'
    }
    
    if (data.variations) {
      try {
        data.variations = JSON.parse(data.variations)
      } catch (e) {
        console.error('Error parsing variations:', e)
        data.variations = []
      }
    }

    return data
  }

  async createMenuItem(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await this.parseRequest(request)
      
      if (!data.image && !data.name) {
        return reply.status(400).send(errorResponse('Invalid data: Name and Image are required'))
      }

      const item = await menuService.createMenuItem(data)
      return reply.code(201).send(successResponse(item, 'Menu item created successfully'))
    } catch (error: any) {
      request.log.error(error)
      return reply.status(500).send(errorResponse(error.message || 'Failed to create menu item'))
    }
  }

  async updateMenuItem(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params
      const data = await this.parseRequest(request)

      const item = await menuService.updateMenuItem(id, data)
      if (!item) return reply.status(404).send(errorResponse('Menu item not found', 404))
      
      return reply.send(successResponse(item, 'Menu item updated successfully'))
    } catch (error: any) {
      request.log.error(error)
      return reply.status(500).send(errorResponse(error.message || 'Failed to update menu item'))
    }
  }

  async deleteMenuItem(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params
      const item = await menuService.deleteMenuItem(id)
      if (!item) return reply.status(404).send(errorResponse('Menu item not found', 404))
      
      // Cleanup local files
      if (item.image && item.image.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '../../' , item.image)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }

      return reply.send(successResponse(null, 'Menu item deleted successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to delete menu item'))
    }
  }

  async exportMenuCsv(
    request: FastifyRequest<{ Querystring: { type?: string } }>,
    reply: FastifyReply
  ) {
    try {
      const t = request.query?.type
      const items =
        t === 'restaurant' || t === 'bar'
          ? await menuService.getMenuByType(t)
          : await menuService.getAllMenu()
      const csv = menuItemsToCsvString(items as never[])
      const label = t === 'restaurant' || t === 'bar' ? t : 'all'
      reply
        .header('Content-Type', 'text/csv; charset=utf-8')
        .header('Content-Disposition', `attachment; filename="menu-${label}.csv"`)
      return reply.send(csv)
    } catch (error) {
      request.log.error(error)
      return reply.status(500).send(errorResponse('Failed to export CSV'))
    }
  }

  async exportMenuXlsx(
    request: FastifyRequest<{ Querystring: { type?: string } }>,
    reply: FastifyReply
  ) {
    try {
      const t = request.query?.type
      const items =
        t === 'restaurant' || t === 'bar'
          ? await menuService.getMenuByType(t)
          : await menuService.getAllMenu()
      const buf = menuItemsToXlsxBuffer(items as never[])
      const label = t === 'restaurant' || t === 'bar' ? t : 'all'
      reply
        .header(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        .header('Content-Disposition', `attachment; filename="menu-${label}.xlsx"`)
      return reply.send(buf)
    } catch (error) {
      request.log.error(error)
      return reply.status(500).send(errorResponse('Failed to export Excel'))
    }
  }

  async importMenuFile(
    request: FastifyRequest<{ Querystring: { defaultType?: string } }>,
    reply: FastifyReply
  ) {
    try {
      const dt = request.query?.defaultType
      const defaultType =
        dt === 'restaurant' || dt === 'bar' ? dt : undefined

      const data = await request.file()
      if (!data) {
        return reply.status(400).send(errorResponse('No file uploaded (field name: file)', 400))
      }

      const buffer = await data.toBuffer()
      const name = (data.filename || '').toLowerCase()
      const looksZip = buffer.length > 2 && buffer[0] === 0x50 && buffer[1] === 0x4b
      const isExcel =
        name.endsWith('.xlsx') ||
        name.endsWith('.xls') ||
        (looksZip && !name.endsWith('.csv'))
      let records: Record<string, unknown>[]
      if (isExcel) {
        records = menuRecordsFromXlsx(buffer)
      } else {
        records = menuRecordsFromCsv(buffer.toString('utf8'))
      }

      if (!records.length) {
        return reply.status(400).send(errorResponse('No data rows found in file', 400))
      }

      const result = await menuService.importMenuFromRecords(records, defaultType)
      return reply.send(
        successResponse(result, `Import finished: ${result.created} created, ${result.updated} updated`)
      )
    } catch (error: unknown) {
      request.log.error(error)
      const msg = error instanceof Error ? error.message : 'Import failed'
      return reply.status(500).send(errorResponse(msg))
    }
  }
}

export const menuController = new MenuController()
