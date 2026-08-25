import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'
import * as XLSX from 'xlsx'

export function normalizeRecordKeys(row: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(row)) {
    if (k === '__rowNum__') continue
    const key = String(k)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
    const val = v === null || v === undefined ? '' : String(v).trim()
    out[key] = val
  }
  return out
}

export function menuRecordsFromCsv(text: string): Record<string, unknown>[] {
  const trimmed = text.replace(/^\uFEFF/, '')
  if (!trimmed.trim()) return []
  return parse(trimmed, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  }) as Record<string, unknown>[]
}

export function menuRecordsFromXlsx(buffer: Buffer): Record<string, unknown>[] {
  const wb = XLSX.read(buffer, { type: 'buffer' })
  const name = wb.SheetNames[0]
  if (!name) return []
  const sheet = wb.Sheets[name]
  return XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false }) as Record<string, unknown>[]
}

function itemToExportRow(item: {
  _id?: { toString(): string }
  name?: string
  description?: string
  price?: number
  category?: string
  image?: string
  type?: string
  origin?: string
  tags?: string[]
  available?: boolean
  variations?: { label: string; price: number }[]
}) {
  return {
    id: item._id?.toString() ?? '',
    name: item.name ?? '',
    description: item.description ?? '',
    price: item.price ?? '',
    category: item.category ?? '',
    image: item.image ?? '',
    type: item.type ?? '',
    origin: item.origin ?? '',
    tags: Array.isArray(item.tags) ? item.tags.join('|') : '',
    available: item.available === false ? 'false' : 'true',
    variations: item.variations?.length ? JSON.stringify(item.variations) : '',
  }
}

export function menuItemsToCsvString(items: Parameters<typeof itemToExportRow>[0][]): string {
  const records = items.map(itemToExportRow)
  return stringify(records, { header: true, quoted: true })
}

export function menuItemsToXlsxBuffer(items: Parameters<typeof itemToExportRow>[0][]): Buffer {
  const records = items.map(itemToExportRow)
  const ws = XLSX.utils.json_to_sheet(records)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Menu')
  const out = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  return Buffer.isBuffer(out) ? out : Buffer.from(out)
}

export function rowToMenuPayload(
  row: Record<string, string>,
  defaultType?: 'restaurant' | 'bar'
): Record<string, unknown> {
  const name = row.name?.trim()
  const description = row.description?.trim()
  const category = row.category?.trim()
  const price = Number(row.price)
  let type = (row.type?.trim().toLowerCase() as 'restaurant' | 'bar') || defaultType
  if (type !== 'restaurant' && type !== 'bar') {
    if (defaultType) type = defaultType
    else throw new Error('type must be restaurant or bar (column or defaultType query)')
  }

  if (!name) throw new Error('name is required')
  if (!description) throw new Error('description is required')
  if (!category) throw new Error('category is required')
  if (Number.isNaN(price) || price < 0) throw new Error('invalid price')

  const image =
    row.image?.trim() ||
    'https://placehold.co/600x400/1a1a1a/C9A227?text=Menu+Item'

  let variations: { label: string; price: number }[] = []
  if (row.variations?.trim()) {
    const parsed = JSON.parse(row.variations) as unknown
    if (!Array.isArray(parsed)) throw new Error('variations must be a JSON array')
    variations = parsed.map((v: { label?: string; price?: unknown }) => ({
      label: String(v.label ?? ''),
      price: Number(v.price),
    }))
    for (const v of variations) {
      if (!v.label || Number.isNaN(v.price)) throw new Error('invalid variation entry')
    }
  }

  const tags = row.tags
    ? row.tags.split('|').map((t) => t.trim()).filter(Boolean)
    : []

  const av = row.available?.toLowerCase()
  const available =
    row.available === undefined ||
    row.available === '' ||
    av === 'true' ||
    row.available === '1' ||
    av === 'yes'

  const origin = row.origin?.trim() || undefined

  return {
    name,
    description,
    price,
    category,
    image,
    type,
    origin,
    tags,
    available,
    variations,
  }
}
