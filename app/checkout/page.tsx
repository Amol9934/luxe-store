'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useCartStore } from '@/lib/store'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, CheckCircle, Lock } from 'lucide-react'

type Step = 'details' | 'payment' | 'success'

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('details')
  const [processing, setProcessing] = useState(false)
  const { items, subtotal, tax, total, clearCart } = useCartStore()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', zip: '',
    card: '', expiry: '', cvv: '', name: '',
  })

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleOrder = () => {
    setProcessing(true)
    setTimeout(() => { setProcessing(false); setStep('success'); clearCart() }, 2000)
  }

  if (step === 'success') return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
          <CheckCircle size={56} className="text-emerald-500 mx-auto mb-6" />
        </motion.div>
        <h2 className="font-display text-3xl text-stone-900 dark:text-cream-100 mb-3">Order Confirmed!</h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-4">
          Thank you for your purchase. Your order will arrive in 3–5 business days.
        </p>
        <p className="text-xs text-stone-400 tracking-widest uppercase mb-8">
          Order #LX-{Math.random().toString(36).slice(2, 8).toUpperCase()}
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/store"><button className="btn-primary tracking-widest uppercase text-xs">Continue Shopping</button></Link>
          <Link href="/dashboard"><button className="btn-outline tracking-widest uppercase text-xs">Dashboard</button></Link>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/store" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors mb-6">
          <ChevronLeft size={13} />Back to Store
        </Link>
        <h1 className="font-display text-2xl lg:text-3xl text-stone-900 dark:text-cream-100 mb-2">Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          {(['details', 'payment'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 text-xs tracking-wide uppercase ${step === s ? 'text-stone-900 dark:text-cream-100' : 'text-stone-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === s ? 'bg-stone-900 dark:bg-cream-100 text-white dark:text-stone-900' : 'bg-stone-200 dark:bg-stone-700 text-stone-400'}`}>{i + 1}</span>
                {s}
              </div>
              {i < 1 && <span className="text-stone-200 dark:text-stone-700">—</span>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr,340px] gap-10">
          {/* Form */}
          <AnimatePresence mode="wait">
            {step === 'details' && (
              <motion.div key="details" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-5">
                <h2 className="text-xs font-medium tracking-widest uppercase text-stone-500">Shipping Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[['firstName', 'First Name'], ['lastName', 'Last Name']].map(([name, label]) => (
                    <div key={name}>
                      <label className="block text-[10px] tracking-widest uppercase text-stone-400 mb-1.5">{label}</label>
                      <input name={name} value={form[name as keyof typeof form]} onChange={handle}
                        className="w-full px-4 py-3 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-cream-100 outline-none transition-colors" />
                    </div>
                  ))}
                </div>
                {[['email', 'Email'], ['address', 'Address']].map(([name, label]) => (
                  <div key={name}>
                    <label className="block text-[10px] tracking-widest uppercase text-stone-400 mb-1.5">{label}</label>
                    <input name={name} value={form[name as keyof typeof form]} onChange={handle}
                      className="w-full px-4 py-3 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-cream-100 outline-none transition-colors" />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  {[['city', 'City'], ['zip', 'Postal Code']].map(([name, label]) => (
                    <div key={name}>
                      <label className="block text-[10px] tracking-widest uppercase text-stone-400 mb-1.5">{label}</label>
                      <input name={name} value={form[name as keyof typeof form]} onChange={handle}
                        className="w-full px-4 py-3 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-cream-100 outline-none transition-colors" />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep('payment')} className="btn-primary w-full py-4 tracking-widest uppercase text-xs">
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-medium tracking-widest uppercase text-stone-500">Payment Details</h2>
                  <div className="flex items-center gap-1 text-xs text-stone-400"><Lock size={11} />Secure</div>
                </div>
                {[['name', 'Name on Card'], ['card', 'Card Number']].map(([n, l]) => (
                  <div key={n}>
                    <label className="block text-[10px] tracking-widest uppercase text-stone-400 mb-1.5">{l}</label>
                    <input name={n} value={form[n as keyof typeof form]} onChange={handle} placeholder={n === 'card' ? '1234 5678 9012 3456' : ''}
                      className="w-full px-4 py-3 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-cream-100 outline-none transition-colors" />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  {[['expiry', 'Expiry', 'MM / YY'], ['cvv', 'CVV', '•••']].map(([n, l, p]) => (
                    <div key={n}>
                      <label className="block text-[10px] tracking-widest uppercase text-stone-400 mb-1.5">{l}</label>
                      <input name={n} value={form[n as keyof typeof form]} onChange={handle} placeholder={p} type={n === 'cvv' ? 'password' : 'text'}
                        className="w-full px-4 py-3 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-cream-100 outline-none transition-colors" />
                    </div>
                  ))}
                </div>
                <motion.button whileTap={{ scale: 0.98 }} onClick={handleOrder} disabled={processing}
                  className="btn-primary w-full py-4 tracking-widest uppercase text-xs disabled:opacity-60 flex items-center justify-center gap-2">
                  {processing ? (
                    <><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full" />Processing...</>
                  ) : <>Place Order — €{total().toFixed(2)}</>}
                </motion.button>
                <button onClick={() => setStep('details')} className="w-full text-center text-xs text-stone-400 hover:text-stone-700 transition-colors">
                  ← Back to details
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Summary */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 h-fit">
            <h3 className="text-xs font-medium tracking-widest uppercase text-stone-500 mb-5">Order Summary</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-14 h-16 flex-shrink-0 bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 dark:bg-cream-100 text-white dark:text-stone-900 text-[9px] font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-stone-400 uppercase tracking-wider">{item.brand}</p>
                    <p className="text-xs font-medium text-stone-900 dark:text-cream-100 truncate">{item.name}</p>
                    <p className="text-xs text-stone-500">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-200 dark:border-stone-800 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-500"><span>Subtotal</span><span>€{subtotal().toFixed(2)}</span></div>
              <div className="flex justify-between text-stone-500"><span>Shipping</span><span className="text-emerald-600 text-xs">Free</span></div>
              <div className="flex justify-between text-stone-500"><span>Tax</span><span>€{tax().toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold text-stone-900 dark:text-cream-100 pt-2 border-t border-stone-200 dark:border-stone-800">
                <span>Total</span><span>€{total().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}