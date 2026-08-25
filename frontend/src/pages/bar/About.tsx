import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Wine, Lock, Award } from 'lucide-react'
import BarNavbar from '@/components/bar/BarNavbar'
import BarFooter from '@/components/bar/BarFooter'

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7 } }

export default function BarAbout() {
  return (
    <>
      <Helmet><title>The Lounge | Royal Bar</title></Helmet>
      <BarNavbar />

      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1527761668-6f0e8683c38c?w=1600')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl md:text-7xl text-white font-bold">
            The <span className="text-gold italic">Lounge</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/60 mt-6 max-w-lg text-sm">
            A destination for those who seek the extraordinary in every sip. Crafting moments of liquid gold since 1924.
          </motion.p>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-24 bg-navy section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <span className="text-gold text-xs tracking-[0.3em]">OUR PHILOSOPHY</span>
            <h2 className="font-heading text-4xl text-white font-bold mt-3">Beyond <span className="text-gold italic">Mixology</span></h2>
            <p className="text-white/60 mt-6 leading-relaxed">
              At Royal Bar, we believe every pour tells a story. Our master mixologists don't just create cocktails — they craft immersive liquid experiences that engage all five senses. From the first aroma to the last lingering note, every detail is considered.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { icon: <Wine className="text-gold" size={24} />, label: '400+', desc: 'Rare Spirits' },
                { icon: <Award className="text-gold" size={24} />, label: '12', desc: 'Awards Won' },
                { icon: <Lock className="text-gold" size={24} />, label: '100', desc: 'Years Legacy' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-2">{stat.icon}</div>
                  <p className="text-gold font-heading text-2xl font-bold">{stat.label}</p>
                  <p className="text-white/40 text-xs">{stat.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp}>
            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=700" alt="Mixology" className="w-full h-96 object-cover rounded-2xl" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* Atmosphere Gallery */}
      <section className="py-24 bg-royal-blue section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-gold text-xs tracking-[0.3em]">THE ATMOSPHERE</span>
            <h2 className="font-heading text-4xl text-white font-bold mt-3 italic">Velvet Nights</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400',
              'https://images.unsplash.com/photo-1527761668-6f0e8683c38c?w=400',
              'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400',
              'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400',
            ].map((img, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="overflow-hidden rounded-xl group cursor-pointer">
                <img src={img} alt="Lounge" className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${i % 2 === 0 ? 'h-64' : 'h-48'}`} loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy section-padding text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-heading text-4xl text-white font-bold">Ready for an <span className="text-gold italic">Extraordinary</span> Night?</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/bar/book-table" className="px-8 py-3.5 bg-gold text-navy text-sm tracking-[0.15em] font-bold hover:bg-gold-light transition-colors">RESERVE A TABLE</Link>
            <Link to="/bar/menu" className="px-8 py-3.5 border border-white/30 text-white text-sm tracking-[0.15em] font-medium hover:border-gold hover:text-gold transition-colors">VIEW THE MENU</Link>
          </div>
        </motion.div>
      </section>

      <BarFooter />
    </>
  )
}
