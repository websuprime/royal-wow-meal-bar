import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import RestaurantNavbar from '@/components/restaurant/RestaurantNavbar'
import RestaurantFooter from '@/components/restaurant/RestaurantFooter'
import { useQuery } from '@tanstack/react-query'
import { apiGetMenuByType, apiGetCategories } from '@/lib/api.service'
import { getFileUrl } from '@/lib/utils'
import { useCartStore } from '@/store'
import type { MenuItem, Variation } from '@/types'

function MenuItemCard({ item, addItem }: { item: MenuItem, addItem: (item: MenuItem, v?: Variation) => void }) {
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    item.variations && item.variations.length > 0 ? item.variations[0] : undefined
  )

  const currentPrice = selectedVariation ? selectedVariation.price : item.price

  return (
    <motion.div
      key={item._id}
      className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-luxury transition-all group"
      whileHover={{ y: -4 }}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-2/5 overflow-hidden">
          <img src={getFileUrl(item.image)} alt={item.name} className="w-full h-56 md:h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        </div>
        <div className="md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            {item.origin && <span className="text-gold text-xs tracking-[0.2em] uppercase">{item.origin}</span>}
            <div className="flex justify-between items-start mt-1 mb-2">
              <h3 className="font-heading text-xl text-royal-green font-semibold">{item.name}</h3>
              <span className="text-royal-green font-heading text-lg font-semibold">₹{currentPrice}</span>
            </div>
            <p className="text-warm-gray text-sm leading-relaxed mb-4">{item.description}</p>
            
            {item.variations && item.variations.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.variations.map((v) => (
                  <button
                    key={v.label}
                    onClick={() => setSelectedVariation(v)}
                    className={`px-3 py-1 text-[10px] tracking-wider rounded-full border transition-all ${
                      selectedVariation?.label === v.label
                        ? 'bg-royal-green text-white border-royal-green'
                        : 'bg-transparent text-royal-green/40 border-royal-green/20 hover:border-royal-green/50'
                    }`}
                  >
                    {v.label.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => addItem(item, selectedVariation)}
            className="mt-auto w-full py-3 border border-royal-green/20 text-royal-green text-xs tracking-[0.2em] font-medium hover:bg-royal-green hover:text-cream transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} />
            ADD TO ORDER
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function RestaurantMenu() {
  const addItem = useCartStore((s: any) => s.addItem)

  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['menu', 'restaurant'],
    queryFn: () => apiGetMenuByType('restaurant')
  })

  const { data: categoriesData = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: apiGetCategories
  })

  const categories = ['All', ...categoriesData
    .filter(c => c.type === 'restaurant')
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map(c => c.name)]

  const [activeCategory, setActiveCategory] = useState('All')

  
  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter((item: any) => item.category === activeCategory)

  return (
    <>
      <Helmet><title>The Menu | Royal Wow Meal</title></Helmet>
      <RestaurantNavbar />

      {/* Hero */}
      <section className="relative h-[45vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-royal-green/70 to-royal-green/90" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold text-xs tracking-[0.4em] mb-4">SEASON OF EXCELLENCE</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-heading text-5xl md:text-6xl text-white italic">
            The Autumn Collection
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/60 mt-4 max-w-md text-sm">
            A curated journey through the season's finest harvests, featuring rare truffles, sustainably sourced lobster, and aged Wagyu.
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-cream border-b border-cream-dark sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center gap-4 md:gap-8 overflow-x-auto">
          {categories.map((cat: string, i: number) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs tracking-[0.15em] font-medium whitespace-nowrap pb-2 border-b-2 transition-all ${
                activeCategory === cat ? 'text-royal-green border-royal-green' : 'text-warm-gray border-transparent hover:text-royal-green'
              }`}
            >
              <span className="text-gold mr-1 text-[10px]">{String(i + 1).padStart(2, '0')}</span> {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16 bg-cream section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.h2 key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl text-royal-green text-center mb-12">
            Artisanal {activeCategory}
          </motion.h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {isLoading ? (
                <div className="col-span-full py-20 text-center text-royal-green/60 text-xl font-playfair">
                  Curating the menu...
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="col-span-full py-20 text-center text-royal-green/60 text-xl font-playfair">
                  No items available in this category.
                </div>
              ) : (
                filteredItems.map((item: any) => (
                  <MenuItemCard key={item._id} item={item} addItem={addItem} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-royal-green" />
        <div className="relative z-10 text-center px-6">
          <span className="text-gold text-2xl">✦</span>
          <h2 className="font-heading text-3xl md:text-4xl text-white font-bold mt-4">
            An evening of <span className="italic">absolute</span><br />refinement awaits.
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/restaurant/contact" className="px-8 py-3.5 bg-gold text-white text-sm tracking-[0.15em] font-semibold hover:bg-gold-dark transition-colors">
              BOOK A TABLE
            </Link>
            <Link to="/restaurant/contact" className="px-8 py-3.5 border border-white/30 text-white text-sm tracking-[0.15em] font-medium hover:border-gold hover:text-gold transition-colors">
              PRIVATE DINING
            </Link>
          </div>
        </div>
      </section>

      <RestaurantFooter />
    </>
  )
}
