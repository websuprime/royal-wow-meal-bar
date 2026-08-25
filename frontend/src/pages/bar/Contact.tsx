import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import BarNavbar from '@/components/bar/BarNavbar'
import BarFooter from '@/components/bar/BarFooter'
import { useMutation } from '@tanstack/react-query'
import { apiCreateContact } from '@/lib/api.service'
import { buildContactPayload } from '@/lib/leadTracking'

export default function BarContact() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const prefilledFromUrl = useRef(false)
  const privatePrefill = useRef(false)

  useEffect(() => {
    const related = searchParams.get('relatedEvent')
    const lead = searchParams.get('leadSource') || ''
    if (related && !prefilledFromUrl.current) {
      prefilledFromUrl.current = true
      const title = decodeURIComponent(related.replace(/\+/g, ' '))
      const waitlist = lead.includes('waitlist')
      setForm((f) => ({
        ...f,
        subject: waitlist ? 'Bar event — waitlist' : 'Bar event — booking request',
        message: `Event: ${title}\n\nPlease share availability and next steps.`,
      }))
      return
    }
    if (
      searchParams.get('subjectContext') === 'private' &&
      !related &&
      !privatePrefill.current
    ) {
      privatePrefill.current = true
      setForm((f) => ({
        ...f,
        subject: 'Private Event',
        message: 'I would like to discuss hosting a private event at Royal Bar.\n\n',
      }))
    }
  }, [searchParams])

  const mutation = useMutation({
    mutationFn: apiCreateContact,
    onSuccess: () => {
      setSubmitted(true)
      setForm({ firstName: '', lastName: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(buildContactPayload(form, 'bar') as Record<string, unknown>)
  }

  return (
    <>
      <Helmet><title>Contact | Royal Bar</title></Helmet>
      <BarNavbar />

      <section className="min-h-screen bg-navy pt-24 pb-16 section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-gold text-xs tracking-[0.3em]">GET IN TOUCH</span>
            <h1 className="font-heading text-5xl text-white font-bold mt-4">Contact <span className="text-gold italic">Us</span></h1>
            <p className="text-white/60 mt-4 max-w-md leading-relaxed">
              For reservations, private events, or general inquiries, our team is at your service.
            </p>
            <div className="space-y-6 mt-10">
              {[
                { icon: <MapPin className="text-gold" size={18} />, title: 'Location', info: 'SCO 7,8, SBC WALK, Kharar, Punjab 140301' },
                { icon: <Phone className="text-gold" size={18} />, title: 'Phone', info: '097818 89898' },
                { icon: <Mail className="text-gold" size={18} />, title: 'Email', info: 'lounge@royalwow.com' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">{item.icon}</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                    <p className="text-white/50 text-sm">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="font-heading text-2xl text-white font-bold">Send a Message</h3>
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
                <span className="text-gold text-4xl">✓</span>
                <p className="text-white font-heading text-xl mt-4">Message Sent</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gold text-xs tracking-[0.15em]">FIRST NAME</label>
                    <input type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" placeholder="Alexander" />
                  </div>
                  <div>
                    <label className="text-gold text-xs tracking-[0.15em]">LAST NAME</label>
                    <input type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" placeholder="Sterling" />
                  </div>
                </div>
                <div>
                  <label className="text-gold text-xs tracking-[0.15em]">EMAIL</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-gold text-xs tracking-[0.15em]">PHONE (OPTIONAL)</label>
                  <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" placeholder="+44 ..." />
                </div>
                <div>
                  <label className="text-gold text-xs tracking-[0.15em]">SUBJECT</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold"
                  >
                    <option>General Inquiry</option>
                    <option>Reservation</option>
                    <option>Private Event</option>
                    <option>Bar event — booking request</option>
                    <option>Bar event — waitlist</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="text-gold text-xs tracking-[0.15em]">MESSAGE</label>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold resize-none" placeholder="How can we help?" />
                </div>
                <button type="submit" disabled={mutation.isPending} className="w-full py-3.5 bg-gold text-navy font-bold tracking-wider hover:bg-gold-light transition-colors rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                  {mutation.isPending ? 'SENDING...' : 'SEND MESSAGE'} <Send size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <BarFooter />
    </>
  )
}
