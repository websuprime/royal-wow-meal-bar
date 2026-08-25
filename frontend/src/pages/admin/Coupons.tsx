import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Plus, X, Tag, Calendar, Percent } from 'lucide-react'

const sampleCoupons = [
  { _id: '1', code: 'ROYAL20', discountPercentage: 20, expiryDate: '2026-06-30', usageLimit: 100, usedCount: 34, active: true },
  { _id: '2', code: 'WELCOME10', discountPercentage: 10, expiryDate: '2026-12-31', usageLimit: 500, usedCount: 128, active: true },
  { _id: '3', code: 'VIP50', discountPercentage: 50, expiryDate: '2026-04-15', usageLimit: 10, usedCount: 10, active: false },
]

export default function AdminCoupons() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Helmet><title>Coupons | Royal Wow Admin</title></Helmet>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-heading text-3xl text-white font-bold italic">Coupon System</h1>
          <p className="text-white/40 mt-1">Manage discount codes and promotions.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-gold text-[#0f0f0f] text-sm font-bold rounded-lg flex items-center gap-2">
          <Plus size={14} /> Create Coupon
        </button>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {['Code', 'Discount', 'Expiry', 'Usage', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left text-white/40 text-xs tracking-wider py-3 px-4">{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleCoupons.map((coupon) => (
              <tr key={coupon._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-4 px-4">
                  <span className="flex items-center gap-2 text-gold font-mono font-bold text-sm"><Tag size={14} /> {coupon.code}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="flex items-center gap-1 text-white text-sm"><Percent size={14} className="text-gold" /> {coupon.discountPercentage}%</span>
                </td>
                <td className="py-4 px-4">
                  <span className="flex items-center gap-1 text-white/60 text-sm"><Calendar size={14} /> {coupon.expiryDate}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-white text-sm">{coupon.usedCount}/{coupon.usageLimit}</span>
                  <div className="w-20 h-1.5 bg-white/5 rounded-full mt-1">
                    <div className="h-full bg-gold rounded-full" style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }} />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-0.5 text-[10px] tracking-wider rounded-full ${coupon.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {coupon.active ? 'ACTIVE' : 'EXPIRED'}
                  </span>
                </td>
                <td className="py-4 px-4 text-white/30 text-sm">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-xl text-white font-bold">Create Coupon</h3>
              <button onClick={() => setShowModal(false)} className="text-white/30 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gold text-xs tracking-wider">COUPON CODE</label>
                <input type="text" placeholder="SUMMER30" className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold font-mono uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gold text-xs tracking-wider">DISCOUNT %</label>
                  <input type="number" placeholder="20" className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-gold text-xs tracking-wider">USAGE LIMIT</label>
                  <input type="number" placeholder="100" className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
                </div>
              </div>
              <div>
                <label className="text-gold text-xs tracking-wider">EXPIRY DATE</label>
                <input type="date" className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
              </div>
              <button className="w-full py-3 bg-gold text-[#0f0f0f] font-bold tracking-wider rounded-lg hover:bg-gold-light transition-colors">CREATE COUPON</button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
