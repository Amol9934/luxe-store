export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  description: string
  details: string[]
  badge?: 'Sale' | 'New' | 'Bestseller' | 'Limited'
  rating: number
  reviews: number
  inStock: boolean
  sold: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  customer: string
  product: string
  amount: number
  status: 'completed' | 'pending' | 'cancelled'
  date: string
  avatar: string
}