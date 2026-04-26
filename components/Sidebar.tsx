'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, ShoppingBag, Sun, Moon,
  TrendingUp, Package, Menu, X, ChevronRight
} from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/store', icon: ShoppingBag, label: 'Store' },
  { href: '/dashboard#orders', icon: Package, label: 'Orders' },
  { href: '/dashboard#revenue', icon: TrendingUp, label: 'Analytics' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { toggleCart, itemCount } = useCartStore()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const count = itemCount()

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-stone-200 dark:border-stone-800">
        <Link href="/dashboard" className="font-display text-2xl font-semibold tracking-[0.15em] text-stone-900 dark:text-cream-100">
          LUXE
        </Link>
        <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mt-1">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (pathname === '/' && href === '/dashboard')
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-stone-900 dark:bg-cream-100 text-white dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-cream-100'
                }`}
              >
                <Icon size={17} />
                <span className="tracking-wide">{label}</span>
                {isActive && <ChevronRight size={13} className="ml-auto opacity-60" />}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-stone-200 dark:border-stone-800 space-y-1">
        {/* Cart button */}
        <button
          onClick={() => { toggleCart(); setMobileOpen(false) }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-cream-100 transition-all"
        >
          <div className="relative">
            <ShoppingBag size={17} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-stone-900 dark:bg-cream-100 text-white dark:text-stone-900 text-[9px] font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <span>My Bag</span>
          {count > 0 && <span className="ml-auto text-xs text-stone-400">{count} items</span>}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-cream-100 transition-all"
        >
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-cream-50 dark:bg-stone-950 border-r border-stone-200 dark:border-stone-800 fixed left-0 top-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-cream-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="font-display text-xl font-semibold tracking-[0.15em] text-stone-900 dark:text-cream-100">
          LUXE
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={toggleCart} className="relative p-2">
            <ShoppingBag size={18} className="text-stone-900 dark:text-cream-100" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-stone-900 dark:bg-cream-100 text-white dark:text-stone-900 text-[9px] font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(true)} className="p-2">
            <Menu size={20} className="text-stone-900 dark:text-cream-100" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-72 bg-cream-50 dark:bg-stone-950 z-50 lg:hidden"
            >
              <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-2">
                <X size={18} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}