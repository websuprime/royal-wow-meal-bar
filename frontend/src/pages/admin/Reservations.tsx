import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Check, X, Calendar, Clock, Users } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGetReservations, apiUpdateReservationStatus } from '@/lib/api.service'
import type { Reservation } from '@/types'

export default function AdminReservations() {
  const queryClient = useQueryClient()
  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ['admin-reservations'],
    queryFn: apiGetReservations,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiUpdateReservationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reservations'] })
    },
  })

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const filtered =
    filter === 'all'
      ? reservations
      : reservations.filter((r) => r.status === filter)

  return (
    <>
      <Helmet><title>Reservations | Royal Wow Admin</title></Helmet>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-heading text-3xl text-white font-bold italic">Reservation Management</h1>
          <p className="text-white/40 mt-1">Manage table reservations for restaurant and bar.</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded-lg border transition-colors ${
                filter === f ? 'border-gold text-gold bg-gold/10' : 'border-white/10 text-white/40 hover:border-white/30'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {['Guest', 'Type', 'Date & Time', 'Guests', 'Requests', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left text-white/40 text-xs tracking-wider py-3 px-4">
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center text-white/40 py-10">
                  Loading reservations…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-white/40 py-10">
                  No reservations match this filter.
                </td>
              </tr>
            ) : (
              filtered.map((r: Reservation) => (
                <tr key={r._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-4 px-4">
                    <p className="text-white text-sm font-medium">{r.customerName}</p>
                    <p className="text-white/30 text-xs">{r.phone}</p>
                    {r.email && <p className="text-white/30 text-xs">{r.email}</p>}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] tracking-wider rounded-full ${
                        r.type === 'restaurant'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {r.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-white text-sm">
                      <Calendar size={12} className="text-gold" /> {r.date}
                    </div>
                    <div className="flex items-center gap-1 text-white/50 text-xs mt-1">
                      <Clock size={12} /> {r.time}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-white text-sm">
                      <Users size={12} className="text-gold" /> {r.guests}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white/40 text-xs max-w-[150px]">
                    {r.specialRequests || '—'}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] tracking-wider rounded-full ${
                        r.status === 'approved'
                          ? 'bg-green-500/20 text-green-400'
                          : r.status === 'rejected'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {r.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {r.status === 'pending' && r._id && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={updateMutation.isPending}
                          onClick={() => updateMutation.mutate({ id: r._id!, status: 'approved' })}
                          className="p-1.5 bg-green-500/10 text-green-400 rounded hover:bg-green-500/20 transition-colors disabled:opacity-50"
                          title="Approve"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          type="button"
                          disabled={updateMutation.isPending}
                          onClick={() => updateMutation.mutate({ id: r._id!, status: 'rejected' })}
                          className="p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
                          title="Reject"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
