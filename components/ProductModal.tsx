'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ShoppingBag, Star, Check } from 'lucide-react'
import { useState } from 'react'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store'
import toast from 'react-hot-toast'

interface Props { product: Product | null; onClose: () => void }

export function ProductModal({ product, onClose }: Props) {
  const [added, setAdded] = useState(false)
  const [selectedImg, setSelectedImg] = useState(0)
  const { addItem, openCart } = useCartStore()

  const handleAdd = () => {
    if (!product) return
    addItem(product)
    setAdded(true)
    toast.success(`${product.name} added to bag`)
    setTimeout(() => { setAdded(false); onClose(); openCart() }, 800)
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-cream-50 dark:bg-stone-950 z-[70] overflow-y-auto shadow-2xl rounded-sm"
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-stone-900/80 rounded-full hover:bg-white dark:hover:bg-stone-800 transition-colors">
              <X size={16} />
            </button>
            <div className="grid md:grid-cols-2 min-h-full">
              {/* Image */}
              <div className="relative aspect-[4/5] md:h-full bg-stone-100 dark:bg-stone-800">
                <Image src={product.images[selectedImg] || product.image} alt={product.name} fill className="object-cover" />
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {product.images.map((img, i) => (
                      <button key={i} onClick={() => setSelectedImg(i)}
                        className={`w-12 h-14 relative overflow-hidden border-2 ${i === selectedImg ? 'border-stone-900 dark:border-cream-100' : 'border-transparent opacity-60'}`}>
                        <Image src={img} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-8 md:p-10 flex flex-col justify-center space-y-5">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1">{product.brand} · {product.category}</p>
                  <h2 className="font-display text-2xl md:text-3xl text-stone-900 dark:text-cream-100">{product.name}</h2>
                </div>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-200 dark:text-stone-700'} />
                  ))}
                  <span className="text-xs text-stone-500 ml-1">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-stone-900 dark:text-cream-100">€{product.price}</span>
                  {product.originalPrice && <span className="text-base text-stone-400 line-through">€{product.originalPrice}</span>}
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{product.description}</p>
                <div className="border-t border-stone-200 dark:border-stone-800 pt-4 space-y-2">
                  {product.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="w-1 h-1 bg-stone-300 dark:bg-stone-600 rounded-full" />{d}
                    </div>
                  ))}
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  className={`w-full py-4 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 ${added ? 'bg-green-600 text-white' : 'btn-primary'}`}
                >
                  {added ? <><Check size={14} />Added to Bag</> : <><ShoppingBag size={14} />Add to Bag</>}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}