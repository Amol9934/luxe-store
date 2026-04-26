'use client'

import { motion } from 'framer-motion'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { CategoryChart } from '@/components/dashboard/CategoryChart'
import { RecentOrders } from '@/components/dashboard/RecentOrders'
import { TopProducts } from '@/components/dashboard/TopProducts'
import { revenueData, categoryData, recentOrders, stats } from '@/lib/dashboardData'
import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="font-display text-2xl lg:text-3xl text-stone-900 dark:text-cream-100">
            Good morning ✦
          </h1>
          <p className="text-sm text-stone-400 mt-1">Here&apos;s what&apos;s happening with LUXE today.</p>
        </div>
        <Link href="/store">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:flex items-center gap-2 btn-primary text-xs tracking-widest uppercase"
          >
            <ShoppingBag size={14} />
            Visit Store
            <ArrowRight size={13} />
          </motion.button>
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="mb-6" id="stats">
        <StatsCards stats={stats} />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-[1fr,280px] gap-5 mb-6" id="revenue">
        <RevenueChart data={revenueData} />
        <CategoryChart data={categoryData} />
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-[1fr,300px] gap-5" id="orders">
        <RecentOrders orders={recentOrders} />
        <TopProducts />
      </div>
    </div>
  )
}