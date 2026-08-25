import { Helmet } from 'react-helmet-async'
import { Mail, Phone, User, Clock } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGetContacts, apiUpdateContactStatus } from '@/lib/api.service'
import type { ContactMessage } from '@/types'

export default function AdminMessages() {
  const queryClient = useQueryClient()
  
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: apiGetContacts
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => apiUpdateContactStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] })
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400'
      case 'read': return 'bg-gold/20 text-gold'
      case 'replied': return 'bg-green-500/20 text-green-400'
      default: return 'bg-white/10 text-white/40'
    }
  }

  return (
    <>
      <Helmet><title>Messages | Royal Wow Admin</title></Helmet>

      <div className="mb-8">
        <h1 className="font-heading text-3xl text-white font-bold italic">Customer Messages</h1>
        <p className="text-white/40 mt-1">Contact form submissions and inquiries.</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-white/50 py-10">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-white/50 py-10">No messages found.</div>
        ) : (
          messages.map((msg: ContactMessage) => (
            <div key={msg._id} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 hover:border-gold/20 transition-colors">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                      <User className="text-gold" size={16} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{msg.firstName} {msg.lastName}</h3>
                      <div className="flex items-center gap-3 text-white/40 text-xs mt-0.5">
                        <span className="flex items-center gap-1"><Mail size={10} /> {msg.email}</span>
                        {msg.phone && <span className="flex items-center gap-1"><Phone size={10} /> {msg.phone}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {msg.venue && (
                      <span className="inline-block px-2 py-0.5 bg-white/10 text-white/70 text-[10px] tracking-wider rounded-full uppercase">
                        {msg.venue}
                      </span>
                    )}
                    {msg.leadSource && (
                      <span className="inline-block px-2 py-0.5 bg-blue-500/15 text-blue-300 text-[10px] tracking-wider rounded-full">
                        {msg.leadSource}
                      </span>
                    )}
                    {msg.relatedEventTitle && (
                      <span className="inline-block px-2 py-0.5 bg-purple-500/15 text-purple-300 text-[10px] tracking-wider rounded-full max-w-[200px] truncate" title={msg.relatedEventTitle}>
                        {msg.relatedEventTitle}
                      </span>
                    )}
                    {(msg.utmSource || msg.utmMedium || msg.utmCampaign) && (
                      <span className="inline-block px-2 py-0.5 bg-white/5 text-white/40 text-[10px] rounded-full">
                        UTM: {[msg.utmSource, msg.utmMedium, msg.utmCampaign].filter(Boolean).join(' / ')}
                      </span>
                    )}
                    <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold text-[10px] tracking-wider rounded-full uppercase">{msg.subject}</span>
                    <button 
                      onClick={() => {
                        if (!msg._id) return
                        const nextStatus = msg.status === 'new' ? 'read' : msg.status === 'read' ? 'replied' : 'new'
                        updateStatusMutation.mutate({ id: msg._id, status: nextStatus })
                      }}
                      className={`px-2 py-0.5 text-[10px] tracking-wider rounded-full transition-colors uppercase cursor-pointer ${getStatusColor(msg.status)}`}
                    >
                      {msg.status}
                    </button>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{msg.message}</p>
                  {(msg.pagePath || msg.referrer) && (
                    <p className="text-white/25 text-[10px] mt-2 font-mono break-all">
                      {msg.pagePath && <span>Page: {msg.pagePath}</span>}
                      {msg.pagePath && msg.referrer ? ' · ' : ''}
                      {msg.referrer && <span>Ref: {msg.referrer}</span>}
                    </p>
                  )}
                </div>
                <div className="flex items-start gap-1 text-white/30 text-xs shrink-0">
                  <Clock size={12} />
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
