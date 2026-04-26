'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, ShoppingCart, DollarSign, RotateCcw } from 'lucide-react'

const icons = [DollarSign, ShoppingCart, TrendingUp, RotateCcw]

interface Stat {
  value: string
  change: string
  up: boolean
  label: string
}

export function StatsCards({ stats }: { stats: Record<string, Stat> }) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {Object.entries(stats).map(([key, stat], i) => {
        const Icon = icons[i]
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 rounded-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg">
                <Icon size={16} className="text-stone-600 dark:text-stone-400" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                stat.up
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-500'
              }`}>
                {stat.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-semibold text-stone-900 dark:text-cream-100 mb-1">{stat.value}</p>
            <p className="text-xs text-stone-400 tracking-wide">{stat.label}</p>
          </motion.div>
        )
      })}
    </div>
  )
}