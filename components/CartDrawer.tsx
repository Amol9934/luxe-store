'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, tax, total } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream-50 dark:bg-stone-950 z-[60] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <span className="font-display text-lg text-stone-900 dark:text-cream-100">Your Bag</span>
                <span className="text-xs text-stone-400">({items.length})</span>
              </div>
              <button onClick={closeCart} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 gap-4">
                    <ShoppingBag size={40} className="text-stone-200 dark:text-stone-700" />
                    <p className="text-sm text-stone-400 tracking-wide">Your bag is empty</p>
                    <button onClick={closeCart} className="btn-outline text-xs mt-2">Continue Shopping</button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id} layout
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20, height: 0 }}
                      className="flex gap-4"
                    >
                      <div className="relative w-20 h-24 flex-shrink-0 bg-stone-100 dark:bg-stone-800 overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] tracking-[0.15em] uppercase text-stone-400 mb-0.5">{item.brand}</p>
                        <p className="text-sm font-medium text-stone-900 dark:text-cream-100 truncate">{item.name}</p>
                        <p className="text-sm text-stone-700 dark:text-stone-300 mt-0.5">€{item.price.toLocaleString()}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-stone-200 dark:border-stone-700">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800">
                              <Minus size={11} />
                            </button>
                            <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800">
                              <Plus size={11} />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="p-1.5 text-stone-400 hover:text-red-500 transition-colors">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border-t border-stone-200 dark:border-stone-800 px-6 py-5 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-stone-500"><span>Subtotal</span><span>€{subtotal().toFixed(2)}</span></div>
                  <div className="flex justify-between text-stone-500"><span>Tax (8%)</span><span>€{tax().toFixed(2)}</span></div>
                  <div className="flex justify-between font-semibold text-stone-900 dark:text-cream-100 pt-2 border-t border-stone-200 dark:border-stone-800">
                    <span>Total</span><span>€{total().toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout" onClick={closeCart}>
                  <button className="btn-primary w-full text-center tracking-widest uppercase text-xs">Checkout</button>
                </Link>
                <button onClick={closeCart} className="w-full text-center text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors tracking-wide">
                  Continue Shopping
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}