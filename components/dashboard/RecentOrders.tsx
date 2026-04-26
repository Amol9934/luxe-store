'use client'

import { motion } from 'framer-motion'
import { Order } from '@/types'

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
  pending: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600',
  cancelled: 'bg-red-50 dark:bg-red-900/20 text-red-500',
}

export function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-stone-900 dark:text-cream-100 tracking-wide">Recent Orders</h3>
          <p className="text-xs text-stone-400 mt-0.5">Live activity</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-emerald-600">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Live
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100 dark:border-stone-800">
              {['Order', 'Customer', 'Product', 'Amount', 'Status', 'Time'].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[10px] tracking-[0.15em] uppercase text-stone-400 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="border-b border-stone-50 dark:border-stone-800/50 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
              >
                <td className="px-6 py-4 text-xs font-mono text-stone-500">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-[10px] font-bold text-stone-600 dark:text-stone-300 flex-shrink-0">
                      {order.avatar}
                    </div>
                    <span className="text-xs text-stone-700 dark:text-stone-300 font-medium">{order.customer}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-stone-500">{order.product}</td>
                <td className="px-6 py-4 text-xs font-semibold text-stone-900 dark:text-cream-100">€{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-[10px] font-medium rounded-full capitalize ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-stone-400">{order.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="md:hidden divide-y divide-stone-100 dark:divide-stone-800">
        {orders.map((order) => (
          <div key={order.id} className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-[10px] font-bold text-stone-600 dark:text-stone-300">
                {order.avatar}
              </div>
              <div>
                <p className="text-xs font-medium text-stone-900 dark:text-cream-100">{order.customer}</p>
                <p className="text-[10px] text-stone-400">{order.product} · {order.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-stone-900 dark:text-cream-100">€{order.amount}</p>
              <span className={`text-[10px] font-medium capitalize ${order.status === 'completed' ? 'text-emerald-600' : order.status === 'pending' ? 'text-amber-600' : 'text-red-500'}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}