import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import RestaurantNavbar from '@/components/restaurant/RestaurantNavbar'
import RestaurantFooter from '@/components/restaurant/RestaurantFooter'

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7 } }

export default function RestaurantAbout() {
  return (
    <>
      <Helmet><title>About | Royal Wow Meal</title></Helmet>
      <RestaurantNavbar />

      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1600')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-royal-green/50 to-royal-green/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold text-xs tracking-[0.4em] mb-4">ESTABLISHED 1924</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-heading text-5xl md:text-7xl text-white font-bold">
            A Symphony of<br /><span className="text-gold italic">Senses</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-white/70 mt-6 max-w-lg text-sm leading-relaxed">
            Where the mastery of the flame meets the poetry of the plate. Royal Wow is a sanctuary for those who seek the extraordinary in every bite and every sip.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Link to="/restaurant/menu" className="inline-flex items-center gap-2 mt-8 bg-gold text-white px-8 py-3 text-sm tracking-[0.15em] font-semibold hover:bg-gold-dark transition-colors">
              EXPLORE OUR LEGACY
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Two Worlds */}
      <section className="py-24 bg-cream section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-4xl md:text-5xl text-royal-green font-bold leading-tight">
              Two Worlds.<br /><span className="italic">One Unrivaled<br />Standard.</span>
            </h2>
            <p className="text-warm-gray mt-6 leading-relaxed">
              Royal Wow is the harmonious convergence of two distinct philosophies. <strong className="text-royal-green">Royal Wow Meal</strong> brings the art of fine dining to life with innovative culinary alchemy, while <strong className="text-royal-green">Royal Bar</strong> redefines the cocktail experience through avant-garde mixology and rare vintages.
            </p>
            <div className="flex gap-8 mt-8">
              <div>
                <h4 className="text-gold text-xs tracking-[0.2em] font-semibold">THE KITCHEN</h4>
                <p className="text-warm-gray text-sm mt-1">Michelin-calibre gastronomy, curated tasting menus.</p>
              </div>
              <div>
                <h4 className="text-gold text-xs tracking-[0.2em] font-semibold">THE BAR</h4>
                <p className="text-warm-gray text-sm mt-1">Maestros of spirits and botanical art flavors.</p>
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500" alt="Kitchen" className="w-full h-64 object-cover rounded-lg shadow-luxury" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500" alt="Bar" className="w-full h-64 object-cover rounded-lg shadow-luxury mt-8" loading="lazy" />
          </motion.div>
        </div>
      </section>


      {/* Timeline */}
      <section className="py-24 bg-cream section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-4xl text-royal-green font-bold italic">A Century of Elegance</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-4 mb-16" />
          </motion.div>
          {[
            { year: '1924', title: 'The Genesis', desc: 'Founded in a Parisian attic. The Royal Vault in Mayfair began as an exclusive chef supper club for European elite.' },
            { year: '1965', title: 'Golden Era', desc: 'The establishment transformed into a lavish grande brasserie, serving international cuisine from the finest local ingredients.' },
            { year: '2024', title: 'The Centennial', desc: 'Expanded to include the Edwardian cocktail bar concept, marrying a century of history while claiming the future of global fine dining.' },
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }} className={`flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'text-left' : 'text-right flex-row-reverse'}`}>
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <span className="text-gold font-heading text-sm font-bold">{item.year}</span>
              </div>
              <div>
                <h3 className="font-heading text-2xl text-royal-green italic">{item.title}</h3>
                <p className="text-warm-gray text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 bg-white section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="text-gold text-5xl font-heading">"</span>
            <p className="font-heading text-2xl md:text-3xl text-royal-green italic leading-relaxed mt-4">
              "Luxury is not just seen; it is felt in the weight of the silver, the clarity of the ice, and the silence of a perfect service."
            </p>
            <p className="text-warm-gray text-sm tracking-wider mt-8">— ARTHUR STERLING III</p>
          </motion.div>
        </div>
      </section>

      <RestaurantFooter />
    </>
  )
}
