import { Order } from '@/types'

export const revenueData = [
  { month: 'Jan', revenue: 42000, orders: 134 },
  { month: 'Feb', revenue: 38500, orders: 118 },
  { month: 'Mar', revenue: 51200, orders: 162 },
  { month: 'Apr', revenue: 47800, orders: 149 },
  { month: 'May', revenue: 63400, orders: 198 },
  { month: 'Jun', revenue: 58900, orders: 184 },
  { month: 'Jul', revenue: 71200, orders: 221 },
  { month: 'Aug', revenue: 68500, orders: 213 },
  { month: 'Sep', revenue: 79300, orders: 247 },
  { month: 'Oct', revenue: 84100, orders: 263 },
  { month: 'Nov', revenue: 92600, orders: 289 },
  { month: 'Dec', revenue: 108400, orders: 338 },
]

export const categoryData = [
  { name: 'Outerwear', value: 32, color: '#1a1a1a' },
  { name: 'Knitwear', value: 24, color: '#4b5563' },
  { name: 'Accessories', value: 18, color: '#9ca3af' },
  { name: 'Footwear', value: 14, color: '#d1d5db' },
  { name: 'Tops', value: 7, color: '#e5e7eb' },
  { name: 'Bottoms', value: 5, color: '#f3f4f6' },
]

export const recentOrders: Order[] = [
  { id: 'LX-8821', customer: 'Sophie Laurent', product: 'Trench Coat', amount: 495, status: 'completed', date: '2 min ago', avatar: 'SL' },
  { id: 'LX-8820', customer: 'Marco Bianchi', product: 'Cashmere Turtleneck', amount: 260, status: 'pending', date: '18 min ago', avatar: 'MB' },
  { id: 'LX-8819', customer: 'Elena Fischer', product: 'Derby Shoes', amount: 345, status: 'completed', date: '1 hr ago', avatar: 'EF' },
  { id: 'LX-8818', customer: 'James Whitfield', product: 'Merino Overcoat', amount: 420, status: 'completed', date: '2 hr ago', avatar: 'JW' },
  { id: 'LX-8817', customer: 'Camille Dupont', product: 'Silk Scarf', amount: 145, status: 'cancelled', date: '3 hr ago', avatar: 'CD' },
  { id: 'LX-8816', customer: 'Luca Romano', product: 'Leather Belt', amount: 95, status: 'completed', date: '4 hr ago', avatar: 'LR' },
  { id: 'LX-8815', customer: 'Nina Hoffmann', product: 'Silk Blouse', amount: 195, status: 'pending', date: '5 hr ago', avatar: 'NH' },
]

export const stats = {
  totalRevenue: { value: '€ 805,400', change: '+18.2%', up: true, label: 'Total Revenue' },
  totalOrders: { value: '2,316', change: '+12.5%', up: true, label: 'Total Orders' },
  avgOrderValue: { value: '€ 347', change: '+4.8%', up: true, label: 'Avg. Order Value' },
  returnRate: { value: '3.2%', change: '-0.8%', up: false, label: 'Return Rate' },
}