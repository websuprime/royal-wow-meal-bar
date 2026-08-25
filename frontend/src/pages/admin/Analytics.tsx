import { Helmet } from 'react-helmet-async'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const topItems = [
  { name: 'Heritage Wagyu A5', orders: 142, revenue: 26270 },
  { name: 'Velvet Nightfall', orders: 98, revenue: 2744 },
  { name: 'Blue Lobster Thermidor', orders: 87, revenue: 12615 },
  { name: 'The Royal Gilded', orders: 76, revenue: 2584 },
  { name: 'Gold Leaf Sorbet', orders: 65, revenue: 1430 },
]

const categoryData = [
  { name: 'Main Courses', value: 42 },
  { name: 'Cocktails', value: 28 },
  { name: 'Starters', value: 15 },
  { name: 'Desserts', value: 10 },
  { name: 'Whiskey', value: 5 },
]

const monthlyRevenue = [
  { month: 'Jan', revenue: 82000 },
  { month: 'Feb', revenue: 95000 },
  { month: 'Mar', revenue: 128430 },
  { month: 'Apr', revenue: 0 },
]

const COLORS = ['#0F3D2E', '#C9A227', '#0B1D51', '#D4B94E', '#1a5c44']

export default function AdminAnalytics() {
  return (
    <>
      <Helmet><title>Analytics | Royal Wow Admin</title></Helmet>

      <div className="mb-8">
        <h1 className="font-heading text-3xl text-white font-bold italic">Advanced Analytics</h1>
        <p className="text-white/40 mt-1">Deep insights into performance and trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Items */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
          <h3 className="text-white font-heading text-lg font-bold mb-6">Top Selling Items</h3>
          <div className="space-y-4">
            {topItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-gold font-heading text-lg font-bold w-6">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-white text-sm font-medium">{item.name}</span>
                    <span className="text-gold text-sm font-bold">₹{item.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full mr-4">
                      <div className="h-full bg-gold rounded-full" style={{ width: `${(item.orders / topItems[0].orders) * 100}%` }} />
                    </div>
                    <span className="text-white/40 text-xs">{item.orders} orders</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
          <h3 className="text-white font-heading text-lg font-bold mb-6">Best Selling Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {categoryData.map((item, i) => (
              <span key={i} className="flex items-center gap-1 text-white/60 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} /> {item.name} ({item.value}%)
              </span>
            ))}
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 lg:col-span-2">
          <h3 className="text-white font-heading text-lg font-bold mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              <Line type="monotone" dataKey="revenue" stroke="#C9A227" strokeWidth={3} dot={{ fill: '#C9A227', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Orders Chart */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 lg:col-span-2">
          <h3 className="text-white font-heading text-lg font-bold mb-6">Order Trends (This Week)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { day: 'Mon', orders: 32 }, { day: 'Tue', orders: 28 }, { day: 'Wed', orders: 41 },
              { day: 'Thu', orders: 38 }, { day: 'Fri', orders: 56 }, { day: 'Sat', orders: 67 }, { day: 'Sun', orders: 48 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey="orders" fill="#C9A227" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
