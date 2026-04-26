'use client'

import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface Props {
  data: { name: string; value: number; color: string }[]
}

export function CategoryChart({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-sm"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-stone-900 dark:text-cream-100 tracking-wide">Sales by Category</h3>
        <p className="text-xs text-stone-400 mt-0.5">Revenue distribution</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: '#1a1a1a', border: 'none', borderRadius: '6px', fontSize: '12px', color: '#f5f5ef' }}
            formatter={(v: number) => [`${v}%`, 'Share']}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="space-y-2 mt-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color, border: '1px solid #e5e7eb' }} />
              <span className="text-stone-600 dark:text-stone-400">{item.name}</span>
            </div>
            <span className="font-medium text-stone-900 dark:text-cream-100">{item.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}