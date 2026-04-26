import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Sidebar } from '@/components/Sidebar'
import { CartDrawer } from '@/components/CartDrawer'

export const metadata: Metadata = {
  title: 'LUXE — Dashboard & Store',
  description: 'Premium fashion dashboard and store',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen bg-cream-50 dark:bg-stone-950">
            <Sidebar />
            {/* Main content offset for sidebar */}
            <div className="flex-1 lg:ml-64 pt-14 lg:pt-0">
              {children}
            </div>
          </div>
          <CartDrawer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 2500,
              style: {
                background: '#1a1a1a',
                color: '#F5F5EF',
                borderRadius: '4px',
                fontSize: '13px',
                letterSpacing: '0.02em',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}