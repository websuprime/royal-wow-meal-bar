import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { useAdminStore } from '@/store'
import { apiAdminLogin } from '@/lib/api.service'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@royalwow.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const login = useAdminStore((s) => s.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const data = await apiAdminLogin({ email, password })
      login(email, data.token)
      navigate('/admin/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Admin Login | Royal Wow</title></Helmet>
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto bg-gold rounded-2xl flex items-center justify-center mb-6">
              <span className="text-2xl">👑</span>
            </div>
            <h1 className="font-heading text-3xl text-white font-bold">Royal Wow</h1>
            <p className="text-white/40 text-sm mt-2">Command Center Access</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/5 rounded-2xl p-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">{error}</div>
            )}
            <div>
              <label className="text-gold text-xs tracking-[0.15em] flex items-center gap-2 mb-2"><Mail size={12} /> EMAIL</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
            </div>
            <div>
              <label className="text-gold text-xs tracking-[0.15em] flex items-center gap-2 mb-2"><Lock size={12} /> PASSWORD</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 bg-gold text-[#0f0f0f] font-bold tracking-[0.2em] text-sm hover:bg-gold-light transition-colors rounded-lg disabled:opacity-50">
              {loading ? 'AUTHENTICATING...' : 'ACCESS COMMAND CENTER'}
            </button>
            <p className="text-white/20 text-xs text-center">Protected by 256-bit encryption</p>
          </form>

          <p className="text-white/20 text-xs text-center mt-6">Demo: admin@royalwow.com / admin123</p>
        </motion.div>
      </div>
    </>
  )
}
