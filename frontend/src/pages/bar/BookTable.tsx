import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { Calendar, Clock, Users, User, Phone, Mail } from 'lucide-react'
import BarNavbar from '@/components/bar/BarNavbar'
import BarFooter from '@/components/bar/BarFooter'
import { useMutation } from '@tanstack/react-query'
import { apiCreateReservation } from '@/lib/api.service'

export default function BarBookTable() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    requests: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ev = searchParams.get('event')
    if (!ev) return
    const title = decodeURIComponent(ev.replace(/\+/g, ' '))
    setForm((f) => ({
      ...f,
      requests: f.requests ? f.requests : `Interest in event: ${title}\n`,
    }))
  }, [searchParams])

  const mutation = useMutation({
    mutationFn: apiCreateReservation,
    onSuccess: () => {
      setSubmitted(true)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      customerName: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      date: form.date,
      time: form.time,
      guests: Number(form.guests) || 2,
      specialRequests: form.requests.trim() || undefined,
      type: 'bar',
    })
  }

  return (
    <>
      <Helmet><title>Book a Table | Royal Wow Bar</title></Helmet>
      <BarNavbar />

      <section className="min-h-screen bg-navy pt-24 pb-16 section-padding">
        <div className="max-w-4xl mx-auto pt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-gold text-xs tracking-[0.4em]">RESERVATIONS</span>
            <h1 className="font-heading text-5xl text-white font-bold mt-4">Reserve Your <span className="text-gold italic">Table</span></h1>
            <p className="text-white/50 mt-4 max-w-md mx-auto text-sm">Secure your experience at the Royal Wow Bar. Tables are limited to preserve the intimate atmosphere.</p>
          </motion.div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 border border-gold/30 rounded-2xl p-12 text-center">
              <span className="text-gold text-6xl block mb-4">✓</span>
              <h2 className="font-heading text-3xl text-white font-bold">Reservation Submitted</h2>
              <p className="text-white/60 mt-4">Our concierge will confirm your reservation within 2 hours. You will receive a confirmation call.</p>
              <p className="text-gold text-sm mt-6 italic">Strict dress code applies. Smart elegant required.</p>
            </motion.div>
          ) : (
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 space-y-6">
              {mutation.isError && (
                <p className="text-red-400 text-sm text-center">
                  Could not submit. Please check your details and try again.
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gold text-xs tracking-[0.15em] flex items-center gap-2"><User size={12} /> FULL NAME</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-gold text-xs tracking-[0.15em] flex items-center gap-2"><Mail size={12} /> EMAIL</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" placeholder="you@email.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-gold text-xs tracking-[0.15em] flex items-center gap-2"><Phone size={12} /> PHONE</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" placeholder="+91 9876543210" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-gold text-xs tracking-[0.15em] flex items-center gap-2"><Calendar size={12} /> DATE</label>
                  <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-gold text-xs tracking-[0.15em] flex items-center gap-2"><Clock size={12} /> TIME</label>
                  <input type="time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-gold text-xs tracking-[0.15em] flex items-center gap-2"><Users size={12} /> GUESTS</label>
                  <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gold text-xs tracking-[0.15em]">SPECIAL REQUESTS</label>
                <textarea rows={3} value={form.requests} onChange={(e) => setForm({ ...form, requests: e.target.value })} className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold resize-none" placeholder="Birthday celebration, preferred seating, dietary requirements..." />
              </div>
              <button type="submit" disabled={mutation.isPending} className="w-full py-4 bg-gold text-navy font-bold text-sm tracking-[0.2em] hover:bg-gold-light transition-colors rounded-lg disabled:opacity-50">
                {mutation.isPending ? 'SUBMITTING…' : 'CONFIRM RESERVATION'}
              </button>
              <p className="text-white/30 text-xs text-center italic">Strict dress code applies. Smart elegant required.</p>
            </motion.form>
          )}
        </div>
      </section>

      <BarFooter />
    </>
  )
}
