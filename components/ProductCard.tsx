'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShoppingBag, Star } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store'
import toast from 'react-hot-toast'

const badgeColors: Record<string, string> = {
  Sale: 'bg-red-600',
  New: 'bg-emerald-600',
  Bestseller: 'bg-amber-600',
  Limited: 'bg-purple-600',
}

interface Props {
  product: Product
  onClick: (p: Product) => void
  index: number
}

export function ProductCard({ product, onClick, index }: Props) {
  const { addItem, openCart } = useCartStore()

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.name} added to bag`)
    openCart()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="relative overflow-hidden bg-stone-100 dark:bg-stone-800 aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {product.badge && (
          <span className={`absolute top-3 left-3 px-2 py-1 text-white text-[10px] tracking-[0.15em] uppercase font-semibold rounded-sm ${badgeColors[product.badge] || 'bg-stone-900'}`}>
            {product.badge}
          </span>
        )}

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="absolute bottom-0 left-0 right-0 bg-stone-900/90 dark:bg-cream-100/90 text-white dark:text-stone-900 py-3 text-xs tracking-[0.15em] uppercase font-medium
                     opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                     transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingBag size={13} />
          Quick Add
        </motion.button>
      </div>

      <div className="pt-3">
        <p className="text-[10px] tracking-[0.15em] uppercase text-stone-400 mb-1">{product.brand}</p>
        <h3 className="text-sm font-medium text-stone-900 dark:text-cream-100 truncate group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span className="text-xs text-stone-500">{product.rating}</span>
          <span className="text-xs text-stone-300 dark:text-stone-600">·</span>
          <span className="text-xs text-stone-400">{product.reviews}</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-semibold text-stone-900 dark:text-cream-100">€{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through">€{product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}