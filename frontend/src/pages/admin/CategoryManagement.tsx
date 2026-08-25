import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Plus, Edit2, Trash2, Coffee, Wine } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGetCategories, apiCreateCategory, apiUpdateCategory, apiDeleteCategory } from '@/lib/api.service'
import type { Category } from '@/types'

export default function CategoryManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState<Partial<Category>>({ name: '', type: 'restaurant', order: 0 })

  const queryClient = useQueryClient()

  const { data: categories = [] } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: apiGetCategories
  })

  const createMutation = useMutation({
    mutationFn: apiCreateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
      queryClient.refetchQueries({ queryKey: ['admin-categories'] })
      handleCloseModal()
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Category> }) => apiUpdateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
      queryClient.refetchQueries({ queryKey: ['admin-categories'] })
      handleCloseModal()
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiDeleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
      queryClient.refetchQueries({ queryKey: ['admin-categories'] })
    }
  })

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
      setFormData({ name: category.name, type: category.type, order: category.order })
    } else {
      setEditingCategory(null)
      setFormData({ name: '', type: 'restaurant', order: categories.length })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
    setFormData({ name: '', type: 'restaurant', order: 0 })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = editingCategory?._id || (editingCategory as any)?.id
    if (id) {
      updateMutation.mutate({ id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  return (
    <>
      <Helmet><title>Categories | Royal Wow Admin</title></Helmet>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-heading text-3xl text-white font-bold italic">Category Architecture</h1>
          <p className="text-white/40 mt-1">Define and organize your menu taxonomy.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> ADD CATEGORY
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Restaurant Categories */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-gold">
            <Coffee size={20} />
            <h2 className="font-heading text-xl italic font-bold">Restaurant Portfolios</h2>
          </div>
          <div className="space-y-3">
            {categories.filter(c => c.type === 'restaurant').map(category => (
              <CategoryCard 
                key={category._id || (category as any).id} 
                category={category} 
                onEdit={() => handleOpenModal(category)}
                onDelete={() => { 
                  const id = category._id || (category as any).id
                  if(id && confirm('Delete this category?')) deleteMutation.mutate(id) 
                }}
              />
            ))}
          </div>
        </section>

        {/* Bar Categories */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-gold">
            <Wine size={20} />
            <h2 className="font-heading text-xl italic font-bold">Bar Collections</h2>
          </div>
          <div className="space-y-3">
            {categories.filter(c => c.type === 'bar').map(category => (
              <CategoryCard 
                key={category._id || (category as any).id} 
                category={category} 
                onEdit={() => handleOpenModal(category)}
                onDelete={() => { 
                  const id = category._id || (category as any).id
                  if(id && confirm('Delete this category?')) deleteMutation.mutate(id) 
                }}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
              <h2 className="font-heading text-2xl text-white italic font-bold mb-6">
                {editingCategory ? 'Modify Category' : 'New Category Entry'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Category Name</label>
                  <input 
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold outline-none transition-colors"
                    placeholder="e.g. Signature Mains"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Service Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'restaurant' | 'bar' })}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-white outline-none focus:border-gold appearance-none"
                    >
                      <option value="restaurant" className="bg-[#1a1a1a]">Dining Room</option>
                      <option value="bar" className="bg-[#1a1a1a]">Cocktail Bar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Sort Order</label>
                    <input 
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" onClick={handleCloseModal}
                    className="flex-1 px-4 py-3 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors"
                  >
                    ABORT
                  </button>
                  <button 
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="flex-1 px-4 py-3 bg-gold text-black font-semibold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-50"
                  >
                    {editingCategory ? 'SYNCHRONIZE' : 'INITIATE'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

function CategoryCard({ category, onEdit, onDelete }: { category: Category, onEdit: () => void, onDelete: () => void }) {
  return (
    <div className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-white/20 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center bg-gold/10 text-gold rounded-lg font-bold text-xs">
          {category.order}
        </div>
        <span className="text-white font-medium">{category.name}</span>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button type="button" onClick={onEdit} className="p-2 text-white/40 hover:text-gold transition-colors">
          <Edit2 size={16} />
        </button>
        <button type="button" onClick={onDelete} className="p-2 text-white/40 hover:text-red-500 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
