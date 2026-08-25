import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wine } from 'lucide-react'

export default function BarNavbar() {
  const location = useLocation()

  const links = [
    { label: 'THE LOUNGE', path: '/bar' },
    { label: 'MENU', path: '/bar/menu' },
    { label: 'EVENTS', path: '/bar/events' },
    { label: 'MEMBERS', path: '/bar/about' },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-royal-blue/95 backdrop-blur-md border-b border-white/5"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/bar" className="flex items-center gap-2">
          <Wine className="text-gold" size={20} />
          <span className="font-heading text-white font-bold text-lg tracking-wide">ROYAL BAR</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`text-xs tracking-[0.15em] font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-gold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/bar/book-table"
            className="hidden md:flex items-center gap-2 bg-gold text-royal-blue-dark px-5 py-2 rounded-full text-xs tracking-wider font-semibold hover:bg-gold-light transition-colors"
          >
            BOOK A TABLE
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
