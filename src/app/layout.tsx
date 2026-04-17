import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'AromaasDecants | Perfumería de Lujo',
  description: 'Descubre fragancias de diseñador y perfumería árabe en presentaciones decant. 100% originales, extracción estéril.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-dark.png',
        media: '(prefers-color-scheme: light)',
        type: 'image/png',
      },
      {
        url: '/icon-light.png',
        media: '(prefers-color-scheme: dark)',
        type: 'image/png',
      },
    ],
    // Apple Touch Icon (usamos la versión light por defecto para luxury)
    apple: '/icon-light.png', 
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

import { UIProvider } from '@/context/UIContext'
import { CartProvider } from '@/context/CartContext'
import { Navbar } from '@/components/layout/Navbar'
import { MenuDrawer } from '@/components/menu-drawer'
import { CartDrawer } from '@/components/cart-drawer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen bg-black text-white">
        <UIProvider>
          <CartProvider>
            <Navbar />
            <MenuDrawer />
            <CartDrawer />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
              {children}
            </main>
          </CartProvider>
        </UIProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
