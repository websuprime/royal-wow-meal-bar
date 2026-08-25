import { FastifyInstance } from 'fastify'
import { menuController } from '../controllers/menu.controller'

export default async function menuRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      tags: ['Menu'],
      summary: 'Get all menu items'
    }
  }, menuController.getAllMenu)

  fastify.get('/export/csv', {
    schema: {
      tags: ['Menu'],
      summary: 'Export menu as CSV',
      querystring: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['restaurant', 'bar', 'all'] }
        }
      }
    }
  }, menuController.exportMenuCsv)

  fastify.get('/export/xlsx', {
    schema: {
      tags: ['Menu'],
      summary: 'Export menu as Excel (.xlsx)',
      querystring: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['restaurant', 'bar', 'all'] }
        }
      }
    }
  }, menuController.exportMenuXlsx)

  fastify.post('/import', {
    schema: {
      tags: ['Menu'],
      summary: 'Import menu from CSV or Excel (multipart field: file)',
      consumes: ['multipart/form-data'],
      querystring: {
        type: 'object',
        properties: {
          defaultType: { type: 'string', enum: ['restaurant', 'bar'] }
        }
      }
    }
  }, menuController.importMenuFile)

  fastify.get('/:type', {
    schema: {
      tags: ['Menu'],
      summary: 'Get menu items by type (restaurant/bar)',
      params: {
        type: 'object',
        properties: { type: { type: 'string' } },
        required: ['type']
      }
    }
  }, menuController.getMenuByType)

  fastify.post('/', {
    schema: {
      tags: ['Menu'],
      summary: 'Create a menu item',
      description: 'Supports multipart/form-data for image upload',
      // We keep body generic for manual parsing but can still define fields for docs
    }
  }, menuController.createMenuItem)

  fastify.put('/:id', {
    schema: {
      tags: ['Menu'],
      summary: 'Update a menu item',
      params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] }
    }
  }, menuController.updateMenuItem)

  fastify.delete('/:id', {
    schema: {
      tags: ['Menu'],
      summary: 'Delete a menu item',
      params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] }
    }
  }, menuController.deleteMenuItem)
}
