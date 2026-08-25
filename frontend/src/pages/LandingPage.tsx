import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { UtensilsCrossed, Wine, Instagram, CalendarDays, Users } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Royal Wow Meal & Royal Bar | Luxury Dining & Spirits</title>
        <meta name="description" content="A symphony of flavors at Royal Wow Meal and an atmospheric escape at Royal Bar. Experience the pinnacle of gastronomic artistry." />
      </Helmet>

      <div className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-black">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-10 py-5">
          <span className="text-white/80 text-sm tracking-[0.3em] font-body">EST. 1924</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin')}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/20 transition-all"
            >
              <Users size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/20 transition-all">
              <div className="flex flex-col gap-1">
                <span className="w-4 h-[1.5px] bg-white/80"></span>
                <span className="w-4 h-[1.5px] bg-white/80"></span>
                <span className="w-3 h-[1.5px] bg-white/80"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Left Side — Restaurant */}
        <motion.div
          className="relative w-full md:w-1/2 h-1/2 md:h-full cursor-pointer group overflow-hidden"
          onClick={() => navigate('/restaurant')}
          whileHover="hover"
        >
          {/* Background Image */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200')`,
            }}
            variants={{
              hover: { scale: 1.05 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F3D2E]/70 via-[#0F3D2E]/50 to-[#0F3D2E]/80" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
                <UtensilsCrossed className="text-gold" size={28} />
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-2">
                Royal Wow
              </h2>
              <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-gold italic mb-6">
                Meal
              </h3>
              <p className="text-white/70 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10">
                A symphony of flavors crafted for the most discerning palates.
                Experience the pinnacle of gastronomic artistry.
              </p>
              <motion.button
                className="px-10 py-4 border border-gold text-gold tracking-[0.25em] text-sm font-medium hover:bg-gold hover:text-white transition-all duration-500"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                ENTER RESTAURANT
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Center Logo Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 hidden md:flex">
          <motion.div
            className="w-20 h-20 rounded-full bg-charcoal border-2 border-gold flex items-center justify-center shadow-gold"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
          >
            <span className="text-gold font-heading text-2xl font-bold">W</span>
          </motion.div>
        </div>

        {/* Right Side — Bar */}
        <motion.div
          className="relative w-full md:w-1/2 h-1/2 md:h-full cursor-pointer group overflow-hidden"
          onClick={() => navigate('/bar')}
          whileHover="hover"
        >
          {/* Background Image */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200')`,
            }}
            variants={{
              hover: { scale: 1.05 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D51]/80 via-[#0B1D51]/60 to-[#0B1D51]/90" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
                <Wine className="text-gold" size={28} />
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-2">
                Royal Bar
              </h2>
              <p className="text-white/70 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10">
                Where mixology meets mystery. An atmospheric escape
                defined by artisanal spirits and velvet nights.
              </p>
              <motion.button
                className="px-10 py-4 border border-gold text-gold tracking-[0.25em] text-sm font-medium hover:bg-gold hover:text-white transition-all duration-500"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                ENTER LOUNGE
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="absolute bottom-0 left-0 right-0 z-40 hidden md:flex justify-center items-center gap-10 py-6 text-white/50 text-xs tracking-[0.2em]">
          <a href="#" className="hover:text-gold transition-colors flex items-center gap-2">
            <Instagram size={14} />
            INSTAGRAM
          </a>
          <a href="/restaurant/contact" className="hover:text-gold transition-colors flex items-center gap-2">
            <CalendarDays size={14} />
            RESERVATIONS
          </a>
          <a href="/bar/events" className="hover:text-gold transition-colors flex items-center gap-2">
            <Users size={14} />
            PRIVATE EVENTS
          </a>
        </div>

        {/* Live Jazz Badge */}
        <motion.div
          className="absolute bottom-20 right-6 z-40 hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-white text-xs tracking-wider">LIVE JAZZ TONIGHT</span>
        </motion.div>
      </div>
    </>
  )
}
