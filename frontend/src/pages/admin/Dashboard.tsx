import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { DollarSign, ShoppingBag, CalendarDays, TrendingUp, TrendingDown, CheckCircle, AlertCircle, Clock, Star, Download, Plus } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { weeklyRevenue } from '@/data/mockData'
import { useQuery } from '@tanstack/react-query'
import { apiGetDashboardStats } from '@/lib/api.service'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: apiGetDashboardStats,
    refetchInterval: 30000 // refresh every 30s
  })
  return (
    <>
      <Helmet><title>Dashboard | Royal Wow Admin</title></Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl text-white font-bold italic">Executive Dashboard</h1>
          <p className="text-white/40 mt-1">Welcome back, Alexander. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-white/10 text-white/60 text-sm rounded-lg hover:border-gold hover:text-gold transition-colors flex items-center gap-2">
            <Download size={14} /> Export Report
          </button>
          <button className="px-4 py-2 bg-gold text-[#0f0f0f] text-sm font-bold rounded-lg hover:bg-gold-light transition-colors flex items-center gap-2">
            <Plus size={14} /> New Booking
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {isLoading ? (
          <div className="col-span-3 text-center text-white/50 py-10">Loading dashboard data...</div>
        ) : (
          [
            { label: 'TOTAL REVENUE', value: `₹${(stats as any)?.totalRevenue?.toLocaleString() || 0}.00`, icon: <DollarSign size={20} />, change: '+12.5%', changeLabel: 'vs last month', positive: true },
            { label: 'ACTIVE ORDERS', value: (stats as any)?.activeOrders?.toString() || '0', icon: <ShoppingBag size={20} />, change: '-2.4%', changeLabel: 'avg. turnaround', positive: false },
            { label: 'UPCOMING BOOKINGS', value: (stats as any)?.upcomingBookings?.toString() || '0', icon: <CalendarDays size={20} />, change: '+5.8%', changeLabel: 'this weekend', positive: true },
          ].map((stat, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/40 text-xs tracking-[0.15em] font-medium">{stat.label}</p>
                  <p className="text-white font-heading text-3xl font-bold mt-2">{stat.value}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {stat.positive ? <TrendingUp className="text-green-400" size={14} /> : <TrendingDown className="text-red-400" size={14} />}
                    <span className={`text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</span>
                    <span className="text-white/30 text-xs">{stat.changeLabel}</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">{stat.icon}</div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white font-heading text-xl font-bold">Comparative Performance</h3>
              <p className="text-white/40 text-sm mt-1">Revenue breakdown: Meals vs. Bar</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#0F3D2E] rounded-full" /> Meals</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-gold rounded-full" /> Bar</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey="meals" fill="#0F3D2E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="bar" fill="#C9A227" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Real-time Activity */}
        <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-heading text-xl font-bold">Real-time Activity</h3>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          <div className="space-y-5">
            {[
              { icon: <CheckCircle className="text-green-400" size={16} />, text: 'Table #12 Order Fulfilled', time: '2 minutes ago', bg: 'bg-green-400/10' },
              { icon: <CalendarDays className="text-gold" size={16} />, text: 'New Booking: VIP Penthouse', time: '15 minutes ago', bg: 'bg-gold/10' },
              { icon: <AlertCircle className="text-orange-400" size={16} />, text: 'Wine Inventory: Stock Alert', time: '1 hour ago', bg: 'bg-orange-400/10' },
              { icon: <Clock className="text-blue-400" size={16} />, text: 'Mr. Sterling Checked-In', time: '3 hours ago', bg: 'bg-blue-400/10' },
              { icon: <Star className="text-gold" size={16} />, text: 'New 5-Star Review Received', time: '5 hours ago', bg: 'bg-gold/10' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 ${item.bg} rounded-full flex items-center justify-center shrink-0`}>{item.icon}</div>
                <div>
                  <p className="text-white text-sm font-medium">{item.text}</p>
                  <p className="text-white/30 text-xs">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 text-gold text-sm font-medium hover:underline">View All Events →</button>
        </motion.div>
      </div>

      {/* Bottom Widget */}
      <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="mt-6 bg-gradient-to-r from-[#0F3D2E] to-[#0F3D2E]/80 rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-white/60 text-xs tracking-wider">Current Shift</p>
          <h4 className="text-white font-heading text-xl font-bold mt-1">Imperial Suite</h4>
        </div>
        <button className="px-6 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors">
          Manage Floor
        </button>
      </motion.div>
    </>
  )
}
