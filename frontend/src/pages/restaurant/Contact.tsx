import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import RestaurantNavbar from '@/components/restaurant/RestaurantNavbar'
import RestaurantFooter from '@/components/restaurant/RestaurantFooter'
import { useMutation } from '@tanstack/react-query'
import { apiCreateContact } from '@/lib/api.service'
import { buildContactPayload } from '@/lib/leadTracking'

export default function RestaurantContact() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const mutation = useMutation({
    mutationFn: apiCreateContact,
    onSuccess: () => {
      setSubmitted(true)
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(buildContactPayload(formData, 'restaurant') as Record<string, unknown>)
  }

  return (
    <>
      <Helmet><title>Contact | Royal Wow Meal</title></Helmet>
      <RestaurantNavbar />

      <section className="pt-24 pb-12 bg-cream section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-8">
            {/* Left — Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-gold text-xs tracking-[0.3em] bg-gold/10 px-3 py-1 rounded-full">GET IN TOUCH</span>
              <h1 className="font-heading text-5xl md:text-6xl text-royal-green font-bold mt-6 leading-tight">
                Connect with<br /><span className="text-gold italic">Excellence</span>
              </h1>
              <p className="text-warm-gray mt-6 leading-relaxed max-w-md">
                Experience the pinnacle of fine dining. Our dedicated concierge team is prepared to assist with your inquiries, private events, and bespoke requests.
              </p>

              <div className="space-y-6 mt-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-gold" size={18} />
                  </div>
                  <div>
                    <h4 className="text-royal-green font-semibold">The Grand Estate</h4>
                    <p className="text-warm-gray text-sm">SCO 7,8, SBC WALK, behind SBC GROUP<br />Kharar, Punjab 140301</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="text-gold" size={18} />
                  </div>
                  <div>
                    <h4 className="text-royal-green font-semibold">Concierge Direct</h4>
                    <p className="text-warm-gray text-sm">097818 89898<br />Mon - Sun: 11:00 AM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="text-gold" size={18} />
                  </div>
                  <div>
                    <h4 className="text-royal-green font-semibold">Inquiries</h4>
                    <p className="text-warm-gray text-sm">reservations@royalwow.com<br />events@royalwow.com</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-10 rounded-xl overflow-hidden h-48 bg-cream-dark flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-gold mx-auto" size={32} />
                  <p className="text-warm-gray text-sm mt-2">Interactive Map</p>
                </div>
              </div>
            </motion.div>

            {/* Right — Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800" alt="Restaurant" className="w-full h-48 object-cover rounded-xl" loading="lazy" />
              </div>

              <div className="bg-white rounded-xl p-8 mt-6 shadow-luxury">
                <h3 className="font-heading text-2xl text-royal-green font-bold">Send a Message</h3>
                <p className="text-warm-gray text-sm mt-1">Our team typically responds within two business hours.</p>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                    <span className="text-gold text-4xl">✓</span>
                    <h4 className="font-heading text-xl text-royal-green font-bold mt-4">Message Sent</h4>
                    <p className="text-warm-gray text-sm mt-2">We'll respond within 2 business hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-gold text-xs tracking-[0.15em] font-medium">FIRST NAME</label>
                        <input
                          type="text" required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full mt-1 px-0 py-2 bg-transparent border-b border-cream-dark focus:border-gold outline-none text-royal-green"
                          placeholder="Alexander"
                        />
                      </div>
                      <div>
                        <label className="text-gold text-xs tracking-[0.15em] font-medium">LAST NAME</label>
                        <input
                          type="text" required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full mt-1 px-0 py-2 bg-transparent border-b border-cream-dark focus:border-gold outline-none text-royal-green"
                          placeholder="Sterling"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-gold text-xs tracking-[0.15em] font-medium">EMAIL ADDRESS</label>
                      <input
                        type="email" required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full mt-1 px-0 py-2 bg-transparent border-b border-cream-dark focus:border-gold outline-none text-royal-green"
                        placeholder="a.sterling@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-gold text-xs tracking-[0.15em] font-medium">SUBJECT</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full mt-1 px-0 py-2 bg-transparent border-b border-cream-dark focus:border-gold outline-none text-royal-green"
                      >
                        <option>General Inquiry</option>
                        <option>Reservation</option>
                        <option>Private Event</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gold text-xs tracking-[0.15em] font-medium">MESSAGE</label>
                      <textarea
                        required rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full mt-1 px-0 py-2 bg-transparent border-b border-cream-dark focus:border-gold outline-none text-royal-green resize-none"
                        placeholder="How may we assist you today?"
                      />
                    </div>
                    <button type="submit" disabled={mutation.isPending} className="w-full py-4 bg-gold text-white font-semibold tracking-wider hover:bg-gold-dark transition-colors flex items-center justify-center gap-2 rounded-lg disabled:opacity-50">
                      {mutation.isPending ? 'Sending...' : 'Send Message'} <Send size={16} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RestaurantFooter />
    </>
  )
}
