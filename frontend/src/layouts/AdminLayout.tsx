import { useEffect, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, CalendarDays, MessageSquare, Tag, BarChart3, LogOut, Settings, Bell, Search, Wine, Layout } from 'lucide-react'
import { useAdminStore } from '@/store'

const sidebarLinks = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={18} /> },
  { label: 'Menu', path: '/admin/menu', icon: <UtensilsCrossed size={18} /> },
  { label: 'Reservations', path: '/admin/reservations', icon: <CalendarDays size={18} /> },
  { label: 'Events', path: '/admin/events', icon: <Wine size={18} /> },
  { label: 'Messages', path: '/admin/messages', icon: <MessageSquare size={18} /> },
  { label: 'Coupons', path: '/admin/coupons', icon: <Tag size={18} /> },
  { label: 'Categories', path: '/admin/categories', icon: <Layout size={18} /> },
  { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={18} /> },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { email, role, logout, isAuthenticated } = useAdminStore()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  // Prevent flash of content
  if (!isAuthenticated && location.pathname !== '/admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#141414] border-r border-white/5 flex flex-col fixed h-full">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">👑</span>
            </div>
            <span className="font-heading text-white font-bold text-lg">Royal Wow</span>
          </Link>
        </div>

        <nav className="flex-1 px-3">
          <p className="text-white/30 text-[10px] tracking-[0.2em] px-3 mb-2">MENU</p>
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1 ${
                location.pathname === link.path
                  ? 'bg-gold/10 text-gold border-l-2 border-gold'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-white/40 text-sm hover:text-white transition-colors">
            <Settings size={16} />
            Settings
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-white/40 text-sm hover:text-red-400 transition-colors w-full text-left">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-56">
        {/* Top Bar */}
        <header className="h-16 bg-[#141414] border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2 max-w-md flex-1">
            <Search size={16} className="text-white/30" />
            <input type="text" placeholder="Search insights, guests, or reports..." className="bg-transparent outline-none text-white text-sm flex-1 placeholder-white/30" />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-white/40 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
            </button>
            <button className="p-2 text-white/40 hover:text-white transition-colors">
              <Settings size={18} />
            </button>
            <div className="flex items-center gap-3 ml-2">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{email || 'Admin'}</p>
                <p className="text-gold text-[10px] tracking-wider">ESTATE MANAGER</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {role === 'demo' && (
          <p className="bg-gold/10 border-b border-gold/20 text-gold text-xs tracking-wider px-8 py-2">
            READ-ONLY DEMO: browse everything; changes are not saved.
          </p>
        )}

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
