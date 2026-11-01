import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowRight } from 'lucide-react'
import BarNavbar from '@/components/bar/BarNavbar'
import BarFooter from '@/components/bar/BarFooter'
import { useQuery } from '@tanstack/react-query'
import { apiGetMenuByType, apiGetCategories } from '@/lib/api.service'
import { getFileUrl } from '@/lib/utils'
import type { MenuItem, Variation } from '@/types'

function DrinkItemCard({ drink }: { drink: MenuItem }) {
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    drink.variations && drink.variations.length > 0 ? drink.variations[0] : undefined
  )

  const currentPrice = selectedVariation ? selectedVariation.price : drink.price

  return (
    <motion.div whileHover={{ y: -6 }} className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
      <div className="overflow-hidden">
        <img src={getFileUrl(drink.image)} alt={drink.name} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="font-heading text-xl text-white font-semibold">{drink.name}</h3>
          <span className="text-gold font-heading text-lg font-bold">₹{currentPrice}</span>
        </div>
        <p className="text-white/50 text-sm mt-2 leading-relaxed">{drink.description}</p>
        
        {drink.variations && drink.variations.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {drink.variations.map((v) => (
              <button
                key={v.label}
                onClick={() => setSelectedVariation(v)}
                className={`px-3 py-1 text-[10px] tracking-wider rounded-full border transition-all ${
                  selectedVariation?.label === v.label
                    ? 'bg-gold text-navy border-gold'
                    : 'bg-transparent text-gold/40 border-gold/20 hover:border-gold/50'
                }`}
              >
                {v.label.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {drink.tags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {drink.tags.map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 border border-gold/30 text-gold text-[10px] tracking-wider rounded-full">{tag.toUpperCase()}</span>
            ))}
          </div>
        )}
        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-bold">In-Person Order Only</span>
          <ArrowRight size={14} className="text-gold/40" />
        </div>
      </div>
    </motion.div>
  )
}

export default function BarMenu() {

  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['menu', 'bar'],
    queryFn: () => apiGetMenuByType('bar')
  })

  const { data: categoriesData = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: apiGetCategories
  })

  const categories = ['All', ...categoriesData
    .filter(c => c.type === 'bar')
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map(c => c.name)]

  const [activeCategory, setActiveCategory] = useState('All')


  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter((item: any) => item.category === activeCategory)

  return (
    <>
      <Helmet><title>The Spirits Menu | Royal Bar</title></Helmet>
      <BarNavbar />

      {/* Hero */}
      <section className="relative h-[45vh] overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1600')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" />
        <div className="relative z-10 h-full flex flex-col items-center justify-end text-left px-6 pb-12 max-w-7xl mx-auto w-full">
          <div className="w-full">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block bg-gold/20 text-gold px-3 py-1 text-xs tracking-wider rounded-full font-medium mb-4">MIDNIGHT COLLECTION</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-heading text-5xl md:text-6xl text-white font-bold">
              Artisanal<br /><span className="text-gold italic">Libations</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/50 mt-4 max-w-md text-sm leading-relaxed">
              Curated for the connoisseur. Experience a symphony of rare botanicals, vintage aged spirits, and molecular precision.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-navy border-b border-white/5 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6 overflow-x-auto">
          {categories.map((cat: any) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`text-xs tracking-[0.15em] font-semibold whitespace-nowrap pb-2 border-b-2 transition-all ${
                activeCategory === cat ? 'text-gold border-gold' : 'text-white/40 border-transparent hover:text-white/70'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Drinks Grid */}
      <section className="py-16 bg-navy section-padding min-h-screen">
        <div className="max-w-7xl mx-auto">
          <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-10">
            <h2 className="font-heading text-3xl text-white">The <span className="text-gold italic">{activeCategory}</span> Series</h2>
            <div className="flex-1 h-[1px] bg-gold/20" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {isLoading ? (
                <div className="col-span-full py-20 text-center text-gold/60 text-xl font-playfair">
                  Unlocking the vault...
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="col-span-full py-20 text-center text-gold/60 text-xl font-playfair">
                  No selections available.
                </div>
              ) : (
                filteredItems.map((drink: any) => (
                  <DrinkItemCard key={drink._id} drink={drink} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Vault Selection */}
      <section className="py-16 bg-navy section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...{initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }}} className="flex flex-col md:flex-row bg-white/[0.03] rounded-2xl overflow-hidden border border-white/10">
            <img src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600" alt="Highland Legacy" className="md:w-3/5 h-72 md:h-auto object-cover" loading="lazy" />
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-gold text-xs tracking-[0.3em]">VAULT SELECTION</span>
              <h3 className="font-heading text-3xl text-gold italic font-bold mt-2">1974 Highland Legacy</h3>
              <p className="text-white/60 mt-4 leading-relaxed">
                Only 12 bottles remain in the private vault. This rare single malt features notes of honeyed peat, dried apricot, and antique oak. A truly singular experience for the refined palate.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <button className="px-6 py-3 bg-gold text-navy text-sm font-bold tracking-wider hover:bg-gold-light transition-colors">
                  RESERVE A POUR — ₹150
                </button>
                <button className="px-6 py-3 border border-white/20 text-white text-sm font-medium tracking-wider hover:border-gold hover:text-gold transition-colors">
                  LEARN HISTORY
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <BarFooter />
    </>
  )
}
