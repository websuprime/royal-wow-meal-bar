import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Minus, Plus, X, CreditCard, Smartphone, Banknote, Lock, ShieldCheck } from 'lucide-react'
import RestaurantNavbar from '@/components/restaurant/RestaurantNavbar'
import { useCartStore } from '@/store'
import { getFileUrl, generateOrderId } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { apiCreateOrder } from '@/lib/api.service'

export default function RestaurantCheckout() {
  const { items, updateQuantity, removeItem, getSubtotal, getServiceFee, getTotal, clearCart } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pinCode: '', instructions: '' })

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'ROYAL20') {
      setDiscount(20)
    }
  }

  const finalTotal = getTotal() - (getSubtotal() * discount / 100)

  const mutation = useMutation({
    mutationFn: apiCreateOrder,
    onSuccess: () => {
      setOrderPlaced(true)
      clearCart()
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const orderData = {
      orderId: generateOrderId(),
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      pinCode: form.pinCode,
      specialInstructions: form.instructions,
      items: items.map(item => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.selectedVariation ? item.selectedVariation.price : item.price
      })),
      subtotal: getSubtotal(),
      serviceFee: getServiceFee(),
      total: finalTotal,
      paymentMethod,
      channel: 'restaurant' as const
    }

    mutation.mutate(orderData as any)
  }

  if (orderPlaced) {
    return (
      <>
        <RestaurantNavbar />
        <div className="min-h-screen bg-cream flex items-center justify-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-12 text-center shadow-luxury max-w-md">
            <span className="text-gold text-6xl block mb-4">✓</span>
            <h2 className="font-heading text-3xl text-royal-green font-bold">Order Confirmed</h2>
            <p className="text-warm-gray mt-4">Your Royal Wow Meal experience is being prepared. You will receive a confirmation shortly.</p>
            <Link to="/restaurant" className="inline-block mt-8 px-8 py-3 bg-gold text-white font-semibold tracking-wider hover:bg-gold-dark transition-colors rounded-lg">
              RETURN HOME
            </Link>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet><title>Checkout | Royal Wow Meal</title></Helmet>
      <RestaurantNavbar />

      <div className="min-h-screen bg-cream pt-24 pb-16 section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl text-royal-green font-bold">Secure Checkout</h1>
            <p className="text-warm-gray mt-2">Finalize your exquisite culinary journey with us.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
            {/* Left — Cart */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-xl text-royal-green font-semibold flex items-center gap-2">
                  ✦ Your Selection
                </h3>
                <span className="text-gold text-sm font-medium">{items.length} Items</span>
              </div>

              {items.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center shadow-card">
                  <p className="text-warm-gray">Your selection is empty.</p>
                  <Link to="/restaurant/menu" className="inline-block mt-4 text-gold font-medium text-sm hover:underline">Browse the Menu →</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div key={item.uniqueId} layout className="bg-white rounded-xl p-4 shadow-card flex items-center gap-4">
                      <img src={getFileUrl(item.image)} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <span className="text-gold text-xs tracking-wider">{item.category.toUpperCase()}</span>
                        <h4 className="text-royal-green font-semibold">
                          {item.name}
                          {item.selectedVariation && (
                            <span className="ml-2 px-1.5 py-0.5 bg-gold/10 text-gold text-[10px] rounded">
                              {item.selectedVariation.label.toUpperCase()}
                            </span>
                          )}
                        </h4>
                        <p className="text-warm-gray text-xs truncate max-w-[200px]">{item.description}</p>
                        <p className="text-royal-green font-heading font-bold mt-1">₹{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)} className="w-7 h-7 rounded-full border border-cream-dark flex items-center justify-center text-warm-gray hover:border-gold hover:text-gold transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="text-royal-green font-medium w-6 text-center">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)} className="w-7 h-7 rounded-full border border-cream-dark flex items-center justify-center text-warm-gray hover:border-gold hover:text-gold transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button type="button" onClick={() => removeItem(item.uniqueId)} className="text-warm-gray hover:text-red-500 transition-colors">
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Coupon */}
              <div className="mt-6">
                <label className="text-gold text-xs tracking-[0.15em] font-medium">PROMOTIONAL CODE</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="ENTER CODE"
                    className="flex-1 px-4 py-2.5 bg-white border border-cream-dark rounded-lg outline-none focus:border-gold text-royal-green text-sm"
                  />
                  <button type="button" onClick={applyCoupon} className="px-6 py-2.5 bg-gold text-white text-sm font-semibold rounded-lg hover:bg-gold-dark transition-colors">
                    APPLY
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between text-warm-gray"><span>Subtotal</span><span>₹{getSubtotal().toFixed(2)}</span></div>
                <div className="flex justify-between text-warm-gray"><span>Service Fee (12%)</span><span>₹{getServiceFee().toFixed(2)}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount ({discount}%)</span><span>-₹{(getSubtotal() * discount / 100).toFixed(2)}</span></div>}
                <div className="flex justify-between text-warm-gray"><span>Delivery</span><span className="text-gold italic">Complimentary</span></div>
                <div className="border-t border-cream-dark pt-3 mt-3 flex justify-between">
                  <span className="text-royal-green font-heading text-lg font-bold">TOTAL DUE</span>
                  <span className="text-royal-green font-heading text-xl font-bold">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Right — Guest Details & Payment */}
            <div>
              <h3 className="font-heading text-xl text-royal-green font-semibold flex items-center gap-2 mb-6">
                👤 Guest Details
              </h3>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gold text-xs tracking-[0.15em] font-medium">FULL NAME</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white border border-cream-dark rounded-lg outline-none focus:border-gold text-royal-green" placeholder="Alexander Sterling" />
                  </div>
                  <div>
                    <label className="text-gold text-xs tracking-[0.15em] font-medium">PHONE NUMBER</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white border border-cream-dark rounded-lg outline-none focus:border-gold text-royal-green" placeholder="+1 (555) 000-8888" />
                  </div>
                </div>
                <div>
                  <label className="text-gold text-xs tracking-[0.15em] font-medium">DELIVERY ADDRESS</label>
                  <textarea required rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white border border-cream-dark rounded-lg outline-none focus:border-gold text-royal-green resize-none" placeholder="742 Evergreen Terrace, Penthouse Suite 4, New York, NY 10001" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gold text-xs tracking-[0.15em] font-medium">CITY</label>
                    <input type="text" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white border border-cream-dark rounded-lg outline-none focus:border-gold text-royal-green" placeholder="New York" />
                  </div>
                  <div>
                    <label className="text-gold text-xs tracking-[0.15em] font-medium">PIN CODE</label>
                    <input type="text" required value={form.pinCode} onChange={(e) => setForm({ ...form, pinCode: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white border border-cream-dark rounded-lg outline-none focus:border-gold text-royal-green" placeholder="10001" />
                  </div>
                </div>
                <div>
                  <label className="text-gold text-xs tracking-[0.15em] font-medium">SPECIAL INSTRUCTIONS</label>
                  <input type="text" value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white border border-cream-dark rounded-lg outline-none focus:border-gold text-royal-green" placeholder="Any dietary requirements or preferences" />
                </div>
              </div>

              {/* Payment Method */}
              <h3 className="font-heading text-xl text-royal-green font-semibold flex items-center gap-2 mt-10 mb-6">
                💳 Payment Method
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'card' as const, label: 'Credit Card', desc: 'Visa, Amex, MC', icon: <CreditCard size={24} /> },
                  { id: 'upi' as const, label: 'UPI Pay', desc: 'Instant transfer', icon: <Smartphone size={24} /> },
                  { id: 'cod' as const, label: 'COD', desc: 'Cash on arrival', icon: <Banknote size={24} /> },
                ].map((method) => (
                  <button
                    key={method.id} type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      paymentMethod === method.id ? 'border-gold bg-gold/5' : 'border-cream-dark hover:border-gold/50'
                    }`}
                  >
                    <div className={`mx-auto ${paymentMethod === method.id ? 'text-gold' : 'text-warm-gray'}`}>{method.icon}</div>
                    <h4 className="text-royal-green font-semibold text-sm mt-2">{method.label}</h4>
                    <p className="text-warm-gray text-xs">{method.desc}</p>
                  </button>
                ))}
              </div>

              {/* Card details */}
              {paymentMethod === 'card' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-royal-green rounded-xl p-6 space-y-4">
                  <div>
                    <label className="text-gold/80 text-xs tracking-[0.15em]">CARDHOLDER NAME</label>
                    <input type="text" className="w-full mt-1 px-4 py-2.5 bg-white/10 rounded-lg outline-none text-white placeholder-white/30 focus:ring-1 focus:ring-gold" placeholder="ALEXANDER STERLING" />
                  </div>
                  <div>
                    <label className="text-gold/80 text-xs tracking-[0.15em]">CARD NUMBER</label>
                    <input type="text" className="w-full mt-1 px-4 py-2.5 bg-white/10 rounded-lg outline-none text-white placeholder-white/30 focus:ring-1 focus:ring-gold" placeholder="**** **** **** 1234" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gold/80 text-xs tracking-[0.15em]">EXPIRY DATE</label>
                      <input type="text" className="w-full mt-1 px-4 py-2.5 bg-white/10 rounded-lg outline-none text-white placeholder-white/30 focus:ring-1 focus:ring-gold" placeholder="MM / YY" />
                    </div>
                    <div>
                      <label className="text-gold/80 text-xs tracking-[0.15em]">CVV</label>
                      <input type="text" className="w-full mt-1 px-4 py-2.5 bg-white/10 rounded-lg outline-none text-white placeholder-white/30 focus:ring-1 focus:ring-gold" placeholder="***" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={items.length === 0 || mutation.isPending}
                className="w-full mt-8 py-4 bg-gold text-white font-bold tracking-[0.2em] text-sm hover:bg-gold-dark transition-colors rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? 'PROCESSING...' : 'CONFIRM ROYAL ORDER'} <Lock size={16} />
              </button>
              <div className="flex items-center justify-center gap-2 text-warm-gray text-xs mt-4">
                <ShieldCheck size={14} className="text-gold" />
                Encrypted 256-bit secure checkout
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
