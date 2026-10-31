import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Download, Eye } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGetOrders, apiUpdateOrderStatus } from '@/lib/api.service'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  preparing: 'bg-blue-500/20 text-blue-400',
  out_for_delivery: 'bg-purple-500/20 text-purple-400',
  delivered: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
}

export default function AdminOrders() {
  const [filter, setFilter] = useState('all')
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [channelFilter, setChannelFilter] = useState<'all' | 'restaurant' | 'bar'>('all')

  const queryClient = useQueryClient()

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: apiGetOrders
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => apiUpdateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
    }
  })

  const filters = ['all', 'pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']
  const filtered = (orders || []).filter(o => {
    const matchStatus = filter === 'all' || o.status === filter
    const matchChannel = channelFilter === 'all' || o.channel === channelFilter
    return matchStatus && matchChannel
  })

  const selectedOrder = orders.find(o => o._id === selectedOrderId) || null

  return (
    <>
      <Helmet><title>Orders | Royal Wow Admin</title></Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl text-white font-bold italic">Order Management</h1>
          <p className="text-white/40 mt-1">Synchronized logistics for Royal Wow Dining and Bar services.</p>
        </div>
        <button className="px-4 py-2 border border-white/10 text-white/60 text-sm rounded-lg hover:border-gold hover:text-gold transition-colors flex items-center gap-2">
          <Download size={14} /> EXPORT LOGS
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4 overflow-x-auto">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs tracking-[0.15em] font-semibold pb-2 border-b-2 transition-all whitespace-nowrap ${
                filter === f ? 'text-gold border-gold' : 'text-white/40 border-transparent hover:text-white/60'
              }`}
            >
              {f === 'all' ? 'ALL ORDERS' : f.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {['all', 'restaurant', 'bar'].map((ch) => (
            <button key={ch} onClick={() => setChannelFilter(ch as any)}
              className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
                channelFilter === ch ? 'border-gold text-gold' : 'border-white/10 text-white/40 hover:border-white/30'
              }`}
            >
              {ch === 'all' ? 'ALL' : ch.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Table */}
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-white/40 text-xs tracking-wider py-3 px-4">ORDER REFERENCE</th>
                <th className="text-left text-white/40 text-xs tracking-wider py-3 px-4">CHANNEL</th>
                <th className="text-left text-white/40 text-xs tracking-wider py-3 px-4">CLIENT</th>
                <th className="text-left text-white/40 text-xs tracking-wider py-3 px-4">VALUATION</th>
                <th className="text-left text-white/40 text-xs tracking-wider py-3 px-4">STATUS</th>
                <th className="text-left text-white/40 text-xs tracking-wider py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-10 text-white/40">Loading orders...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-white/40">No orders found.</td></tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order._id} 
                    className={`border-b border-white/5 hover:bg-white/[0.02] cursor-pointer ${selectedOrderId === order._id ? 'bg-white/[0.05]' : ''}`} 
                    onClick={() => setSelectedOrderId(order._id!)}
                  >
                    <td className="text-white text-sm py-4 px-4 font-medium">{order.orderId}</td>
                    <td className="text-white/50 text-sm py-4 px-4 uppercase text-xs">{order.channel === 'restaurant' ? 'DINING ROOM' : 'COCKTAIL BAR'}</td>
                    <td className="py-4 px-4">
                      <p className="text-white text-sm font-medium">{order.customerName}</p>
                      <p className="text-white/30 text-xs">{order.items[0]?.name}</p>
                    </td>
                    <td className="text-white text-sm py-4 px-4">₹{order.total.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 text-[10px] tracking-wider rounded-full ${statusColors[order.status]}`}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-white/30 hover:text-gold transition-colors"><Eye size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between text-white/30 text-xs">
            <span>DISPLAYING 1-{filtered.length} OF {orders.length} SYNCHRONIZED ORDERS</span>
            <div className="flex gap-2">
              <button className="hover:text-white transition-colors">PREVIOUS</button>
              <button className="text-gold hover:text-gold-light transition-colors">NEXT ORDER SET</button>
            </div>
          </div>
        </div>

        {/* Order Detail Panel */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
          {selectedOrder ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-heading text-2xl text-white italic">Order Dossier</h3>
                  <p className="text-white/40 text-xs mt-1">REF {selectedOrder.orderId}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] tracking-wider rounded-full ${statusColors[selectedOrder.status]}`}>
                  {selectedOrder.status.toUpperCase()}
                </span>
              </div>

              <div className="flex gap-2 mb-6">
                <select 
                  value={selectedOrder.status}
                  onChange={(e) => updateStatusMutation.mutate({ id: selectedOrder._id!, status: e.target.value })}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-gold transition-colors">🖨</button>
              </div>

              <div className="border-t border-white/5 pt-4 mb-4">
                <p className="text-gold text-xs tracking-wider mb-2">CLIENT PROFILE</p>
                <p className="text-white font-semibold">{selectedOrder.customerName}</p>
                <p className="text-white/40 text-xs mt-1">SECURE LINE: {selectedOrder.phone}</p>
                <p className="text-white/40 text-xs mt-1">{selectedOrder.address}</p>
              </div>

              <div className="border-t border-white/5 pt-4 mb-4">
                <p className="text-gold text-xs tracking-wider mb-3">REQUISITION LOG</p>
                {selectedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gold text-sm font-bold">{String(item.quantity).padStart(2, '0')}</span>
                      <span className="text-white text-sm">{item.name}</span>
                    </div>
                    <span className="text-white text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-white/50">
                  <span>SUBTOTAL</span>
                  <span>₹{(selectedOrder.subtotal || 0).toFixed(2)}</span>
                </div>
                {(selectedOrder.discount || 0) > 0 && (
                  <div className="flex justify-between text-green-500/80">
                    <span>DISCOUNT ({selectedOrder.discount}%)</span>
                    <span>-₹{((selectedOrder.subtotal * (selectedOrder.discount || 0)) / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/50">
                  <span>SERVICE FEE & TAX</span>
                  <span>₹{(selectedOrder.total - (selectedOrder.subtotal - (selectedOrder.subtotal * (selectedOrder.discount || 0) / 100))).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gold font-heading text-lg font-bold mt-2">
                  <span className="italic">Total Valuation</span>
                  <span>₹{(selectedOrder.total || 0).toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16 text-white/20">
              <p className="text-sm">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
