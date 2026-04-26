'use client'

import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts'
import { useState } from 'react'

interface Props {
  data: { month: string; revenue: number; orders: number }[]
}

export function RevenueChart({ data }: Props) {
  const [view, setView] = useState<'revenue' | 'orders'>('revenue')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-stone-900 dark:text-cream-100 tracking-wide">Performance Overview</h3>
          <p className="text-xs text-stone-400 mt-0.5">Full year 2024</p>
        </div>
        <div className="flex bg-stone-100 dark:bg-stone-800 rounded-lg p-1 gap-1">
          {(['revenue', 'orders'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                view === v
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-cream-100 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        {view === 'revenue' ? (
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1a1a1a" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#1a1a1a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: '#1a1a1a', border: 'none', borderRadius: '6px', fontSize: '12px', color: '#f5f5ef' }}
              formatter={(v: number) => [`€${v.toLocaleString()}`, 'Revenue']}
            />
            <Area type="monotone" dataKey="revenue" stroke="#1a1a1a" strokeWidth={2} fill="url(#revenueGrad)" />
          </AreaChart>
        ) : (
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#1a1a1a', border: 'none', borderRadius: '6px', fontSize: '12px', color: '#f5f5ef' }}
              formatter={(v: number) => [v, 'Orders']}
            />
            <Bar dataKey="orders" fill="#1a1a1a" radius={[3, 3, 0, 0]} opacity={0.85} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  )
}