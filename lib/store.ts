'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  subtotal: () => number
  tax: () => number
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        const items = get().items
        const existing = items.find((i) => i.id === product.id)
        if (existing) {
          set({ items: items.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }
      },

      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) { get().removeItem(id); return }
        set({ items: get().items.map((i) => i.id === id ? { ...i, quantity } : i) })
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      tax: () => get().subtotal() * 0.08,
      total: () => get().subtotal() + get().tax(),
      itemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    {
      name: 'luxe-cart',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          if (typeof window === 'undefined') return null
          return localStorage.getItem(name)
        },
        setItem: (name, value) => {
          if (typeof window !== 'undefined') localStorage.setItem(name, value)
        },
        removeItem: (name) => {
          if (typeof window !== 'undefined') localStorage.removeItem(name)
        },
      })),
    }
  )
)
