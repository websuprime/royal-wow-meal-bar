import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Calendar, Clock, MapPin } from 'lucide-react'
import BarNavbar from '@/components/bar/BarNavbar'
import BarFooter from '@/components/bar/BarFooter'
import { useQuery } from '@tanstack/react-query'
import { apiGetEvents } from '@/lib/api.service'

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7 } }

export default function BarEvents() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: apiGetEvents
  })
  return (
    <>
      <Helmet><title>Events | Royal Wow Bar</title></Helmet>
      <BarNavbar />

      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold text-xs tracking-[0.4em]">AFTER MIDNIGHT</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-heading text-5xl md:text-7xl text-white font-bold mt-4">
            Upcoming <span className="text-gold italic">Events</span>
          </motion.h1>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-navy section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-gold/60 text-xl font-playfair border border-gold/10 rounded-xl bg-white/5 backdrop-blur-md">
              Loading upcoming events...
            </div>
          ) : events.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gold/60 text-xl font-playfair border border-gold/10 rounded-xl bg-white/5 backdrop-blur-md">
              No events currently scheduled. Check back soon.
            </div>
          ) : (
            events.map((event: any, i: number) => (
              <motion.div key={event._id} {...fadeUp} transition={{ delay: i * 0.1 }} className="border border-white/10 rounded-2xl overflow-hidden group hover:border-gold/30 transition-colors">
                <div className="relative overflow-hidden h-56">
                  <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs tracking-wider font-bold rounded-full ${
                      event.status === 'sold_out' ? 'bg-red-500/20 text-red-400' 
                      : event.status === 'limited' ? 'bg-gold/20 text-gold'
                      : 'bg-green-500/20 text-green-400'
                    }`}>
                      {event.status === 'sold_out' ? 'SOLD OUT' : event.status === 'limited' ? 'LIMITED ACCESS' : 'UPCOMING'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-white/40 text-xs mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                  </div>
                  <h3 className="font-heading text-2xl text-white font-bold">{event.title}</h3>
                  <p className="text-white/50 text-sm mt-2">{event.description}</p>
                  {event.seatsRemaining != null && event.seatsRemaining > 0 && (
                    <p className="text-gold text-sm mt-3 font-medium">{event.seatsRemaining} seats remaining</p>
                  )}
                  {event.status === 'sold_out' ? (
                    <Link
                      to={`/bar/contact?leadSource=bar_events_waitlist&relatedEvent=${encodeURIComponent(event.title)}`}
                      className="inline-block mt-4 px-6 py-2.5 text-sm font-bold tracking-wider transition-colors border border-gold/50 text-gold hover:bg-gold/10"
                    >
                      JOIN WAITLIST
                    </Link>
                  ) : (
                    <Link
                      to={`/bar/book-table?event=${encodeURIComponent(event.title)}`}
                      className="inline-block mt-4 px-6 py-2.5 text-sm font-bold tracking-wider transition-colors bg-gold text-navy hover:bg-gold-light"
                    >
                      BOOK NOW
                    </Link>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Venue Info */}
      <section className="py-16 bg-royal-blue section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl text-white font-bold">Private Event Bookings</h2>
            <p className="text-white/60 mt-4">
              Host your exclusive celebrations in the Royal Wow Bar. Our event coordinators craft bespoke experiences for up to 120 guests.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-white/40 text-sm">
              <MapPin className="text-gold" size={16} />
              <span>Mayfair, London • The Grand Estate</span>
            </div>
            <Link
              to="/bar/contact?leadSource=bar_private_events_section&subjectContext=private"
              className="inline-block mt-6 px-8 py-3 bg-gold text-navy font-bold text-sm tracking-wider hover:bg-gold-light transition-colors"
            >
              INQUIRE NOW
            </Link>
          </motion.div>
        </div>
      </section>

      <BarFooter />
    </>
  )
}
