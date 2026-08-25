import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Plus, Edit, Trash2, X, Calendar, Clock } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { BarEvent } from '@/types'
import { apiGetEvents, apiCreateEvent, apiUpdateEvent, apiDeleteEvent } from '@/lib/api.service'

export default function AdminEvents() {
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState<BarEvent | null>(null)
  
  const queryClient = useQueryClient()
  
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['admin-events'],
    queryFn: apiGetEvents
  })

  const [formData, setFormData] = useState<Partial<BarEvent>>({
    title: '', description: '', date: '', time: '', bannerImage: '', status: 'upcoming' as 'upcoming'
  })

  // Mutations
  const createMutation = useMutation({
    mutationFn: apiCreateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] })
      setShowModal(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<BarEvent> }) => apiUpdateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] })
      setShowModal(false)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: apiDeleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] })
    }
  })

  const openNew = () => {
    setEditItem(null)
    setFormData({ title: '', description: '', date: '', time: '', bannerImage: '', status: 'upcoming' })
    setShowModal(true)
  }

  const openEdit = (item: BarEvent) => {
    setEditItem(item)
    setFormData(item)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editItem) {
      updateMutation.mutate({ id: editItem._id!, data: formData })
    } else {
      createMutation.mutate(formData as any)
    }
  }

  return (
    <>
      <Helmet><title>Events Management | Royal Wow Admin</title></Helmet>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-heading text-3xl text-white font-bold italic">Event Management</h1>
          <p className="text-white/40 mt-1">Manage bar events and experiences.</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-gold text-[#0f0f0f] text-sm font-bold rounded-lg flex items-center gap-2">
          <Plus size={14} /> Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-2 text-center py-10 text-white/50">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="col-span-2 text-center py-10 text-white/50">No events hosted yet.</div>
        ) : events.map((event: BarEvent) => (
          <div key={event._id} className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
            <img src={event.bannerImage} alt={event.title} className="w-full h-44 object-cover" loading="lazy" />
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-white font-heading text-xl font-bold">{event.title}</h3>
                <span className={`px-2 py-0.5 text-[10px] tracking-wider rounded-full ${
                  event.status === 'sold_out' ? 'bg-red-500/20 text-red-400' : event.status === 'limited' ? 'bg-gold/20 text-gold' : 'bg-green-500/20 text-green-400'
                }`}>
                  {event.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-white/50 text-sm mt-2">{event.description}</p>
              <div className="flex items-center gap-4 mt-3 text-white/40 text-xs">
                <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => openEdit(event)} disabled={deleteMutation.isPending} className="p-2 text-white/30 hover:text-gold transition-colors"><Edit size={14} /></button>
                <button onClick={() => handleDelete(event._id!)} disabled={deleteMutation.isPending} className="p-2 text-white/30 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-xl text-white font-bold">Create Event</h3>
              <button onClick={() => setShowModal(false)} className="text-white/30 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gold text-xs tracking-wider">EVENT TITLE</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-gold text-xs tracking-wider">DESCRIPTION</label>
                <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gold text-xs tracking-wider">DATE</label>
                  <input type="date" value={formData.date?.split('T')[0] || ''} onChange={(e) => setFormData({...formData, date: e.target.value})} required className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-gold text-xs tracking-wider">TIME</label>
                  <input type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} required className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
                </div>
              </div>
              <div>
                <label className="text-gold text-xs tracking-wider">BANNER IMAGE URL</label>
                <input type="text" value={formData.bannerImage} onChange={(e) => setFormData({...formData, bannerImage: e.target.value})} required className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-gold text-xs tracking-wider">STATUS</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as any})} className="w-full mt-1 px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-white outline-none focus:border-gold">
                  <option value="upcoming">Upcoming</option>
                  <option value="limited">Limited</option>
                  <option value="sold_out">Sold Out</option>
                </select>
              </div>
              <button disabled={createMutation.isPending || updateMutation.isPending} className="w-full py-3 bg-gold text-[#0f0f0f] font-bold tracking-wider rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50">
                {createMutation.isPending || updateMutation.isPending ? 'PROCESSING...' : (editItem ? 'UPDATE EVENT' : 'CREATE EVENT')}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  )
}
