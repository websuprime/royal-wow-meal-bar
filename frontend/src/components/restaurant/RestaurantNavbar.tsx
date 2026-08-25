import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, User } from 'lucide-react'
import { useCartStore } from '@/store'

export default function RestaurantNavbar() {
  const location = useLocation()
  const totalItems = useCartStore((s) => s.getTotalItems())

  const links = [
    { label: 'THE MENU', path: '/restaurant/menu' },
    { label: 'EXPERIENCE', path: '/restaurant/about' },
    { label: 'RESERVE', path: '/restaurant/contact' },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md shadow-sm"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/restaurant" className="flex items-center gap-2">
          <span className="text-gold text-xl">🍽</span>
          <span className="font-heading text-royal-green font-bold text-lg">Royal Wow Meal</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`text-xs tracking-[0.15em] font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-gold border-b border-gold pb-0.5'
                  : 'text-royal-green/70 hover:text-royal-green'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/restaurant/checkout"
            className="relative flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gold-dark transition-colors"
          >
            <ShoppingBag size={16} />
            <span>Order</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-royal-green text-white text-xs rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="p-2 rounded-full bg-royal-green text-cream hover:bg-royal-green-light transition-colors">
            <User size={16} />
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
