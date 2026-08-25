import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, ChefHat, Award, Star, ChevronDown, CalendarDays, Users } from 'lucide-react'
import RestaurantNavbar from '@/components/restaurant/RestaurantNavbar'
import RestaurantFooter from '@/components/restaurant/RestaurantFooter'
import { restaurantMenu, testimonials } from '@/data/mockData'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
}

export default function RestaurantHome() {
  const featuredDishes = restaurantMenu.slice(0, 3)

  return (
    <>
      <Helmet><title>Royal Wow Meal | A Culinary Odyssey</title></Helmet>
      <RestaurantNavbar />

      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-royal-green/60 via-royal-green/40 to-royal-green/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gold text-xs tracking-[0.4em] mb-6">
            A CULINARY ODYSSEY
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-heading text-5xl md:text-7xl text-white font-bold leading-tight">
            A Symphony of<br /><span className="text-gold italic">Flavors</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-white/70 max-w-lg mt-6 leading-relaxed">
            Where ancient techniques meet modern artistry. Experience ultra-premium dining where every ingredient tells a royal story.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-wrap gap-4 mt-10">
            <Link to="/restaurant/contact" className="px-8 py-3.5 bg-gold text-white text-sm tracking-[0.15em] font-semibold hover:bg-gold-dark transition-colors">
              RESERVE YOUR TABLE
            </Link>
            <Link to="/restaurant/menu" className="px-8 py-3.5 border border-white/30 text-white text-sm tracking-[0.15em] font-medium hover:border-gold hover:text-gold transition-colors">
              EXPLORE THE MENU
            </Link>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50">
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* Chef's Table Experience */}
      <section className="py-24 bg-cream section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-gold text-xs tracking-[0.3em] font-medium">EXCLUSIVE GASTRONOMY</span>
              <h2 className="font-heading text-4xl md:text-5xl text-royal-green font-bold mt-3 mb-6 italic">
                The Chef's Table<br />Experience
              </h2>
              <p className="text-warm-gray leading-relaxed mb-8">
                Step into the inner sanctum of our kitchen. An intimate journey through culinary excellence, guided by our master chefs in an atmosphere of unparalleled luxury. Witness the alchemy of flavor firsthand.
              </p>
              <div className="space-y-6">
                {[
                  { icon: <Star className="text-gold" size={18} />, title: 'Poetic Storytelling', desc: 'Every dish is narrated with the rich history of its origins and the hands that crafted it.' },
                  { icon: <Award className="text-gold" size={18} />, title: 'Curated Pairings', desc: 'Exquisite vintage wines selected to complement the nuances of our Royal Seven philosophy.' },
                  { icon: <ChefHat className="text-gold" size={18} />, title: 'Artisanal Craft', desc: 'Hand-curated details and gold-standard techniques in every single preparation.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-heading text-royal-green font-semibold text-lg">{item.title}</h4>
                      <p className="text-warm-gray text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500" alt="Fine dining" className="w-full h-64 object-cover rounded-lg shadow-luxury" loading="lazy" />
                <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=500" alt="Plating" className="w-full h-48 object-cover rounded-lg shadow-luxury" loading="lazy" />
              </div>
              <div className="pt-8">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500" alt="Ambience" className="w-full h-80 object-cover rounded-lg shadow-luxury" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Ingredients */}
      <section className="py-24 bg-white section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-4xl md:text-5xl text-royal-green font-bold italic">Signature Ingredients</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-4 mb-3" />
            <p className="text-warm-gray italic max-w-lg mx-auto">"We do not just cook; we curate the rarest treasures the earth provides."</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500', tag: 'RARE & EARTHY', name: 'White Alba Truffle' },
              { img: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500', tag: 'PREMIUM QUALITY', name: 'A5 Wagyu Beef' },
              { img: 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=500', tag: 'LIQUID GOLD', name: 'Saffron Gold' },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }} className="group cursor-pointer">
                <div className="overflow-hidden rounded-lg">
                  <img src={item.img} alt={item.name} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <span className="text-gold text-xs tracking-[0.2em] mt-4 block">{item.tag}</span>
                <h3 className="font-heading text-2xl text-royal-green font-semibold mt-1">{item.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 bg-cream section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.3em]">CHEF'S SELECTION</span>
            <h2 className="font-heading text-4xl md:text-5xl text-royal-green font-bold mt-3">Featured Creations</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, i) => (
              <motion.div key={dish._id} {...fadeUp} transition={{ delay: i * 0.15 }} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-luxury transition-shadow group">
                <div className="overflow-hidden h-64">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-6">
                  {dish.origin && <span className="text-gold text-xs tracking-[0.2em]">{dish.origin?.toUpperCase()}</span>}
                  <div className="flex justify-between items-start mt-1">
                    <h3 className="font-heading text-xl text-royal-green font-semibold">{dish.name}</h3>
                    <span className="text-royal-green font-heading text-lg">₹{dish.price}</span>
                  </div>
                  <p className="text-warm-gray text-sm mt-2 leading-relaxed line-clamp-2">{dish.description}</p>
                  <Link to="/restaurant/menu" className="inline-flex items-center gap-2 text-gold text-sm font-medium mt-4 hover:gap-3 transition-all">
                    ADD TO ORDER <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambience Gallery */}
      <section className="py-24 bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-gold text-xs tracking-[0.3em]">THE VENUE</span>
              <h2 className="font-heading text-4xl md:text-5xl text-royal-green font-bold mt-3 italic">Marble & Glass<br />Sanctuary</h2>
            </div>
            <Link to="/restaurant/about" className="text-gold text-sm font-medium flex items-center gap-2 mt-4 md:mt-0 hover:gap-3 transition-all">
              VIEW FULL GALLERY <ArrowRight size={14} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
              'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
              'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=400',
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
            ].map((img, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="overflow-hidden rounded-lg group cursor-pointer">
                <img src={img} alt="Ambience" className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${i === 0 ? 'h-72' : 'h-48'}`} loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-cream section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-4xl text-royal-green font-bold">Why Choose Royal Wow Meal</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-4 mb-12" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Leaf className="text-gold" size={32} />, title: 'Fresh Ingredients', desc: 'Sourced daily from the finest farms and suppliers across the globe.' },
              { icon: <Award className="text-gold" size={32} />, title: 'Luxury Ambience', desc: 'A marble and glass sanctuary designed for the most discerning guests.' },
              { icon: <ChefHat className="text-gold" size={32} />, title: 'Master Chefs', desc: 'World-renowned culinary artists with Michelin-star pedigrees.' },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }} className="bg-white p-10 rounded-xl shadow-glass hover:shadow-luxury transition-shadow">
                <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-6">{item.icon}</div>
                <h3 className="font-heading text-xl text-royal-green font-semibold mb-3">{item.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            {testimonials.map((t, i) => (
              i === 0 && (
                <div key={i}>
                  <span className="text-gold text-5xl font-heading">"</span>
                  <p className="font-heading text-2xl md:text-3xl text-royal-green italic leading-relaxed mt-4">{t.text}</p>
                  <div className="mt-8">
                    <p className="text-warm-gray text-sm tracking-wider">— {t.name.toUpperCase()}</p>
                    <p className="text-gold text-xs tracking-wider mt-1">{t.role}</p>
                  </div>
                </div>
              )
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600')` }} />
        <div className="absolute inset-0 bg-royal-green/85" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <motion.div {...fadeUp}>
            <span className="text-gold text-3xl">✦</span>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mt-4">
              An Unforgettable<br /><span className="italic">Evening Awaits</span>
            </h2>
            <p className="text-white/70 mt-6 max-w-md mx-auto">
              Reservations are highly limited to ensure the intimacy of your experience. Secure your passage to the peak of gastronomic luxury.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <CalendarDays className="text-gold" size={16} />
                <span className="text-white/80 text-sm">Date</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <Users className="text-gold" size={16} />
                <span className="text-white/80 text-sm">Guests</span>
              </div>
              <Link to="/restaurant/contact" className="bg-gold text-white px-6 py-3 text-sm font-semibold tracking-wider hover:bg-gold-dark transition-colors rounded-lg">
                CHECK
              </Link>
            </div>
            <p className="text-gold text-xs tracking-[0.2em] mt-6">CURRENTLY BOOKING FOR JUNE — AUGUST</p>
          </motion.div>
        </div>
      </section>

      <RestaurantFooter />
    </>
  )
}
