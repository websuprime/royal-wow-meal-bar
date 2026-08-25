import mongoose from 'mongoose'
import { MenuItem } from '../models/MenuItem'
import { normalizeRecordKeys, rowToMenuPayload } from '../utils/menuImportExport'

export class MenuService {
  async getAllMenu() {
    return MenuItem.find()
  }

  async getMenuByType(type: string) {
    return MenuItem.find({ type })
  }

  async createMenuItem(data: any) {
    const item = new MenuItem(data)
    await item.save()
    return item
  }

  async updateMenuItem(id: string, data: any) {
    return MenuItem.findByIdAndUpdate(id, data, { new: true })
  }

  async deleteMenuItem(id: string) {
    return MenuItem.findByIdAndDelete(id)
  }

  async importMenuFromRecords(
    records: Record<string, unknown>[],
    defaultType?: 'restaurant' | 'bar'
  ): Promise<{ created: number; updated: number; errors: string[] }> {
    const errors: string[] = []
    let created = 0
    let updated = 0

    for (let i = 0; i < records.length; i++) {
      const row = normalizeRecordKeys(records[i])
      const line = i + 2
      const keys = Object.keys(row).filter((k) => row[k] !== '')
      if (keys.length === 0) continue

      try {
        const payload = rowToMenuPayload(row, defaultType)
        const rawId = (row.id || row._id || '').trim()
        if (rawId && mongoose.Types.ObjectId.isValid(rawId)) {
          const doc = await MenuItem.findByIdAndUpdate(rawId, payload, { new: true })
          if (!doc) {
            errors.push(`Row ${line}: id ${rawId} not found`)
            continue
          }
          updated++
        } else {
          await MenuItem.create(payload)
          created++
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e)
        errors.push(`Row ${line}: ${msg}`)
      }
    }

    return { created, updated, errors }
  }
}

export const menuService = new MenuService()
