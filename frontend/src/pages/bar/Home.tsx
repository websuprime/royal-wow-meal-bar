import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Wine, Lock } from 'lucide-react'
import BarNavbar from '@/components/bar/BarNavbar'
import BarFooter from '@/components/bar/BarFooter'
import { barMenu, barEvents } from '@/data/mockData'

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7 } }

export default function BarHome() {
  const signatureCocktails = barMenu.filter(i => i.category === 'Signature Cocktails').slice(0, 4)

  return (
    <>
      <Helmet><title>Royal Bar | The Art of the Midnight Pour</title></Helmet>
      <BarNavbar />

      {/* Hero */}
      <section className="relative h-screen overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1600')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gold text-xs tracking-[0.4em]">
            EST. 1924 • LONDON
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-heading text-5xl md:text-7xl text-white font-bold mt-4 leading-tight">
            The Art of the<br /><span className="text-gold italic">Midnight Pour</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-white/60 max-w-lg mt-6 leading-relaxed text-sm">
            An ultra-premium sanctuary where royal blue velvet meets the world's rarest spirits. Experience the pinnacle of nocturnal luxury.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-wrap gap-4 mt-10">
            <Link to="/bar/book-table" className="px-8 py-3.5 bg-gold text-royal-blue-dark text-sm tracking-[0.15em] font-bold hover:bg-gold-light transition-colors">
              RESERVE YOUR SEAT
            </Link>
            <Link to="/bar/menu" className="px-8 py-3.5 border border-gold/50 text-gold text-sm tracking-[0.15em] font-medium hover:bg-gold/10 transition-colors">
              THE SPIRITS MENU
            </Link>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30">
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* Signature Collection */}
      <section className="py-24 bg-navy section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="text-gold text-xs tracking-[0.3em]">SIGNATURE COLLECTION</span>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mt-3">
              The Art of <span className="text-gold italic">Mixology</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-14">
            {signatureCocktails.map((drink, i) => (
              <motion.div key={drink._id} {...fadeUp} transition={{ delay: i * 0.1 }} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl border border-white/5">
                  <img src={drink.image} alt={drink.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <h3 className="font-heading text-lg text-white font-semibold mt-4">{drink.name}</h3>
                <p className="text-white/50 text-xs mt-1 leading-relaxed line-clamp-2">{drink.description}</p>
                <Link to="/bar/menu" className="text-gold text-xs font-medium mt-3 flex items-center gap-1 hover:gap-2 transition-all">
                  THEIR STORY <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Private Vault */}
      <section className="py-24 bg-royal-blue section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <span className="text-gold text-xs tracking-[0.3em]">EXCLUSIVE SANCTUARY</span>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mt-3 italic">
              The Private Vault
            </h2>
            <p className="text-white/60 mt-6 leading-relaxed">
              Behind the heavy bronze doors lies a climate-controlled sanctuary housing over 400 of the world's rarest spirits. From pre-prohibition bourbons to silent distillery scotches, the Vault is a testament to the history of fine spirits.
            </p>
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3">
                <Wine className="text-gold shrink-0" size={18} />
                <div>
                  <h4 className="text-white font-semibold text-sm">Vintage Scotches</h4>
                  <p className="text-white/40 text-xs">Bottlings dating back to the late 19th century from vanished Highland distilleries.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="text-gold shrink-0" size={18} />
                <div>
                  <h4 className="text-white font-semibold text-sm">Private Lockers</h4>
                  <p className="text-white/40 text-xs">Personalized storage for our most distinguished member's private collections.</p>
                </div>
              </div>
            </div>
            <Link to="/bar/about" className="text-gold text-sm font-semibold tracking-[0.15em] mt-8 inline-flex items-center gap-2 hover:gap-3 transition-all">
              INQUIRE ABOUT ACCESS <ArrowRight size={14} />
            </Link>
          </motion.div>
          <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" alt="Vault" className="w-full h-72 object-cover rounded-lg" loading="lazy" />
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500" alt="Spirits" className="w-full h-36 object-cover rounded-lg" loading="lazy" />
              <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500" alt="Bar" className="w-full h-32 object-cover rounded-lg" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Midnight Series Events */}
      <section className="py-24 bg-navy section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row justify-between items-start gap-4 mb-14">
            <div>
              <span className="text-gold text-xs tracking-[0.3em]">NOCTURNAL SCHEDULE</span>
              <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mt-3 italic">Midnight Series</h2>
            </div>
            <p className="text-white/50 text-sm max-w-md">Our curated series of intimate musical performances and spirit tastings held after the clock strikes twelve.</p>
          </motion.div>

          <div className="space-y-6">
            {barEvents.slice(0, 3).map((event, i) => (
              <motion.div key={event._id} {...fadeUp} transition={{ delay: i * 0.1 }} className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-6 gap-4">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-gold font-heading text-2xl font-bold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</p>
                    <p className="text-white font-heading text-lg">{new Date(event.date).getDate()}</p>
                    <p className="text-white/40 text-xs">{event.time}</p>
                  </div>
                  <div>
                    <h3 className="text-white font-heading text-xl font-semibold">{event.title}</h3>
                    <p className="text-white/50 text-sm mt-1">{event.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {event.status === 'sold_out' && <span className="text-white/40 text-sm font-medium">Sold Out</span>}
                  {event.status === 'limited' && <span className="text-gold text-sm font-medium">{event.seatsRemaining} Seats Remaining</span>}
                  <Link to="/bar/events" className={`px-6 py-2 text-sm font-bold tracking-wider transition-colors ${
                    event.status === 'sold_out' 
                      ? 'border border-white/20 text-white/40 cursor-not-allowed' 
                      : 'bg-gold text-navy hover:bg-gold-light'
                  }`}>
                    {event.status === 'sold_out' ? 'JOIN WAITLIST' : 'BOOK NOW'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-24 bg-royal-blue section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="text-gold text-xs tracking-[0.3em]">THE GOLDEN CIRCLE</span>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mt-4">Ascend to Membership</h2>
            <p className="text-white/60 mt-6 max-w-md mx-auto">
              Access to the Private Vault, priority reservations for Midnight Series events, and a personal concierge for your rare spirit acquisitions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link to="/bar/about" className="px-8 py-3.5 bg-gold text-royal-blue-dark text-sm tracking-[0.15em] font-bold hover:bg-gold-light transition-colors">
                APPLY FOR MEMBERSHIP
              </Link>
              <Link to="/bar/about" className="px-8 py-3.5 border border-white/30 text-white text-sm tracking-[0.15em] font-medium hover:border-gold hover:text-gold transition-colors">
                View Member Benefits
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <BarFooter />
    </>
  )
}
