'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { products } from '@/lib/products'

export function TopProducts() {
  const top = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5)
  const maxSold = top[0].sold

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-sm"
    >
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-stone-900 dark:text-cream-100 tracking-wide">Top Sellers</h3>
        <p className="text-xs text-stone-400 mt-0.5">By units sold</p>
      </div>
      <div className="space-y-4">
        {top.map((product, i) => (
          <div key={product.id} className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-300 dark:text-stone-600 w-4">{i + 1}</span>
            <div className="relative w-10 h-12 flex-shrink-0 overflow-hidden bg-stone-100 dark:bg-stone-800">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-stone-900 dark:text-cream-100 truncate">{product.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(product.sold / maxSold) * 100}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    className="h-full bg-stone-900 dark:bg-cream-100 rounded-full"
                  />
                </div>
                <span className="text-[10px] text-stone-400 flex-shrink-0">{product.sold}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}