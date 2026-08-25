import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Plus, Edit, Trash2, X, Download, Upload } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { MenuItem } from '@/types'
import {
  apiGetMenuByType,
  apiCreateMenuItem,
  apiUpdateMenuItem,
  apiDeleteMenuItem,
  apiGetCategories,
  apiExportMenuCsv,
  apiExportMenuXlsx,
  apiImportMenuFile,
} from '@/lib/api.service'
import { getFileUrl } from '@/lib/utils'

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function AdminMenuManagement() {
  const [activeTab, setActiveTab] = useState<'restaurant' | 'bar'>('restaurant')
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState<MenuItem | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [importSummary, setImportSummary] = useState<string | null>(null)
  const importInputRef = useRef<HTMLInputElement>(null)

  const queryClient = useQueryClient()
  
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['admin-menu', activeTab],
    queryFn: () => apiGetMenuByType(activeTab)
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: apiGetCategories
  })

  // Form State
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '', description: '', price: 0, category: '', image: '', tags: [], available: true, type: activeTab, variations: []
  })

  const openEdit = (item: MenuItem) => { 
    setEditItem(item)
    setFormData(item)
    setImagePreview(getFileUrl(item.image))
    setImageFile(null)
    setShowModal(true) 
  }
  
  const openNew = () => { 
    setEditItem(null)
    setFormData({ name: '', description: '', price: 0, category: '', image: '', tags: [], available: true, type: activeTab })
    setImageFile(null)
    setImagePreview(null)
    setShowModal(true) 
  }

  const createMutation = useMutation({
    mutationFn: apiCreateMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-menu', activeTab] })
      setShowModal(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<MenuItem> | FormData }) => apiUpdateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-menu', activeTab] })
      setShowModal(false)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: apiDeleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-menu', activeTab] })
    }
  })

  const exportCsvMutation = useMutation({
    mutationFn: () => apiExportMenuCsv(activeTab),
    onSuccess: (blob) => {
      downloadBlob(blob, `menu-${activeTab}.csv`)
    },
  })

  const exportXlsxMutation = useMutation({
    mutationFn: () => apiExportMenuXlsx(activeTab),
    onSuccess: (blob) => {
      downloadBlob(blob, `menu-${activeTab}.xlsx`)
    },
  })

  const importMutation = useMutation({
    mutationFn: (file: File) => apiImportMenuFile(file, activeTab),
    onSuccess: (body) => {
      const { created, updated, errors } = body.data
      queryClient.invalidateQueries({ queryKey: ['admin-menu', activeTab] })
      queryClient.invalidateQueries({ queryKey: ['admin-menu'] })
      const errPart =
        errors.length > 0
          ? ` Errors (${errors.length}): ${errors.slice(0, 8).join(' · ')}${errors.length > 8 ? '…' : ''}`
          : ''
      setImportSummary(`Imported: ${created} created, ${updated} updated.${errPart}`)
    },
    onError: (err: unknown) => {
      const ax = err as { response?: { data?: { message?: string } }; message?: string }
      const msg =
        ax.response?.data?.message ||
        (err instanceof Error ? err.message : null) ||
        ax.message ||
        'Import failed'
      setImportSummary(msg)
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalData = new FormData()
    finalData.append('name', formData.name || '')
    finalData.append('description', formData.description || '')
    finalData.append('price', String(formData.price || 0))
    finalData.append('category', formData.category || '')
    finalData.append('type', formData.type || activeTab)
    finalData.append('available', String(formData.available))
    if (imageFile) {
      finalData.append('image', imageFile)
    } else if (formData.image) {
      finalData.append('image', formData.image)
    }

    if (formData.variations && formData.variations.length > 0) {
      finalData.append('variations', JSON.stringify(formData.variations))
    }

    const id = editItem?._id || (editItem as any)?.id
    if (id) {
      updateMutation.mutate({ id, data: finalData })
    } else {
      createMutation.mutate(finalData as any)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <>
      <Helmet><title>Menu Management | Royal Wow Admin</title></Helmet>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="font-heading text-3xl text-white font-bold italic">Menu Management</h1>
          <p className="text-white/40 mt-1">Curate the culinary and mixology offerings.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={importInputRef}
            type="file"
            accept=".csv,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              e.target.value = ''
              if (f) importMutation.mutate(f)
            }}
          />
          <button
            type="button"
            onClick={() => importInputRef.current?.click()}
            disabled={importMutation.isPending}
            className="px-4 py-2 border border-white/15 text-white/80 text-sm font-bold rounded-lg hover:border-gold hover:text-gold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Upload size={14} /> {importMutation.isPending ? 'Importing…' : 'Import CSV / Excel'}
          </button>
          <button
            type="button"
            onClick={() => exportCsvMutation.mutate()}
            disabled={exportCsvMutation.isPending}
            className="px-4 py-2 border border-white/15 text-white/80 text-sm font-bold rounded-lg hover:border-gold hover:text-gold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Download size={14} /> CSV
          </button>
          <button
            type="button"
            onClick={() => exportXlsxMutation.mutate()}
            disabled={exportXlsxMutation.isPending}
            className="px-4 py-2 border border-white/15 text-white/80 text-sm font-bold rounded-lg hover:border-gold hover:text-gold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Download size={14} /> Excel
          </button>
          <button onClick={openNew} className="px-4 py-2 bg-gold text-[#0f0f0f] text-sm font-bold rounded-lg hover:bg-gold-light transition-colors flex items-center gap-2">
            <Plus size={14} /> Add Item
          </button>
        </div>
      </div>

      {importSummary && (
        <div
          className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
            importSummary.startsWith('Imported:')
              ? 'border-gold/30 bg-gold/5 text-white/90'
              : 'border-red-500/30 bg-red-500/10 text-red-200'
          }`}
        >
          <span className="block">{importSummary}</span>
          <button
            type="button"
            onClick={() => setImportSummary(null)}
            className="mt-2 text-xs text-white/50 hover:text-white underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tab Switcher */}
      <div className="flex gap-3 mb-6">
        {['restaurant', 'bar'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-bold tracking-wider rounded-lg border transition-colors ${
              activeTab === tab ? 'border-gold text-gold bg-gold/10' : 'border-white/10 text-white/40 hover:border-white/30'
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-3 text-center text-white/50 py-10">Loading menu items...</div>
        ) : menuItems.length === 0 ? (
          <div className="col-span-3 text-center text-white/50 py-10">No items found for {activeTab}.</div>
        ) : (
          menuItems.map((item: MenuItem) => (
          <motion.div key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden group">
            <img src={getFileUrl(item.image)} alt={item.name} className="w-full h-40 object-cover" loading="lazy" />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-gold text-xs tracking-wider">{item.category.toUpperCase()}</span>
                  <h3 className="text-white font-semibold mt-1">{item.name}</h3>
                  {item.variations && item.variations.length > 0 && (
                    <span className="text-[10px] text-gold/60 block mt-0.5">{item.variations.length} VARIATIONS</span>
                  )}
                </div>
                <span className="text-gold font-heading font-bold">₹{item.price}</span>
              </div>
              <p className="text-white/40 text-xs mt-2 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className={`px-2 py-0.5 text-[10px] rounded-full ${item.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {item.available ? 'AVAILABLE' : 'UNAVAILABLE'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} disabled={deleteMutation.isPending} className="p-1.5 text-white/30 hover:text-gold transition-colors"><Edit size={14} /></button>
                  <button onClick={() => handleDelete(item._id)} disabled={deleteMutation.isPending} className="p-1.5 text-white/30 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-xl text-white font-bold">{editItem ? 'Edit Item' : 'Add New Item'}</h3>
              <button onClick={() => setShowModal(false)} className="text-white/30 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gold text-xs tracking-wider">NAME</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-gold text-xs tracking-wider">DESCRIPTION</label>
                <textarea rows={2} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gold text-xs tracking-wider">PRICE (₹)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} required className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-gold text-xs tracking-wider">CATEGORY</label>
                  <select 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})} 
                    required 
                    className="w-full mt-1 px-4 py-2.5 bg-[#2a2a2a] border border-white/10 rounded-lg text-white outline-none focus:border-gold appearance-none"
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Select Category</option>
                    {categories.filter(c => c.type === activeTab).map(c => (
                      <option key={c._id} value={c.name} className="bg-[#1a1a1a]">{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gold text-xs tracking-wider">IMAGE</label>
                <div className="mt-1 flex items-center gap-4">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-white/10" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="flex-1 text-xs text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20" 
                  />
                </div>
              </div>

              {/* Variations */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gold text-xs tracking-wider">VARIATIONS (HALF/FULL ETC.)</label>
                  <button type="button" onClick={() => setFormData({...formData, variations: [...(formData.variations || []), { label: '', price: 0 }]})} className="text-gold hover:text-gold-light text-xs font-bold transition-colors">+ ADD</button>
                </div>
                <div className="space-y-2">
                  {(formData.variations || []).map((v, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" placeholder="Label" value={v.label} onChange={(e) => {
                        const newV = [...(formData.variations || [])]
                        newV[i].label = e.target.value
                        setFormData({...formData, variations: newV})
                      }} className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-gold" />
                      <input type="number" placeholder="Price" value={v.price} onChange={(e) => {
                        const newV = [...(formData.variations || [])]
                        newV[i].price = Number(e.target.value)
                        setFormData({...formData, variations: newV})
                      }} className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-gold" />
                      <button type="button" onClick={() => {
                        const newV = (formData.variations || []).filter((_, idx) => idx !== i)
                        setFormData({...formData, variations: newV})
                      }} className="p-2 text-white/30 hover:text-red-400 transition-colors"><X size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={formData.available} onChange={(e) => setFormData({...formData, available: e.target.checked})} id="available" className="accent-gold" />
                <label htmlFor="available" className="text-white/60 text-sm">Available</label>
              </div>
              <button disabled={createMutation.isPending || updateMutation.isPending} className="w-full py-3 bg-gold text-[#0f0f0f] font-bold tracking-wider rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50">
                {createMutation.isPending || updateMutation.isPending ? 'PROCESSING...' : (editItem ? 'UPDATE ITEM' : 'ADD ITEM')}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  )
}
