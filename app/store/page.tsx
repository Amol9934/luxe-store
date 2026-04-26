'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ProductCard'
import { ProductModal } from '@/components/ProductModal'
import { ProductGridSkeleton } from '@/components/ProductSkeleton'
import { products, categories } from '@/lib/products'
import { Product } from '@/types'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function StorePage() {
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Product | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const filtered = products
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .filter((p) =>
      !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-[11px] tracking-[0.25em] uppercase text-stone-400 mb-2">Spring Collection 2025</p>
        <h1 className="font-display text-2xl lg:text-3xl text-stone-900 dark:text-cream-100">
          All Products
        </h1>
        <p className="text-sm text-stone-400 mt-1">{products.length} pieces curated for the discerning wardrobe</p>
      </motion.div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search products or brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-cream-100 outline-none transition-colors rounded-sm text-stone-900 dark:text-cream-100 placeholder-stone-400"
          />
        </div>
        <div className="relative">
          <SlidersHorizontal size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="pl-9 pr-8 py-2.5 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-cream-100 outline-none transition-colors rounded-sm text-stone-900 dark:text-cream-100 appearance-none cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 text-xs tracking-[0.12em] uppercase font-medium transition-all duration-200 rounded-full ${
              activeCategory === cat
                ? 'bg-stone-900 dark:bg-cream-100 text-white dark:text-stone-900'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-cream-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <ProductGridSkeleton />
      ) : (
        <>
          <p className="text-xs text-stone-400 mb-5 tracking-wide">
            Showing {filtered.length} of {products.length} products
          </p>
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-12">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onClick={setSelected} />
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-stone-400 py-20 text-sm">
              No products found. Try a different search or category.
            </motion.p>
          )}
        </>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  )
}