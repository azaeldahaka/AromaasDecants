"use client"

import { Menu, ShoppingBag } from "lucide-react"
import { useStore } from "@/lib/store-context"

export function Header() {
  const { setIsMenuOpen, setIsCartOpen, cartItemCount, setCurrentView } = useStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Menu button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 -ml-2 text-foreground hover:text-primary transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <button
          onClick={() => setCurrentView("home")}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <h1 className="text-lg font-serif tracking-[0.2em] text-foreground">
            AROMAAS<span className="text-primary">DECANTS</span>
          </h1>
        </button>

        {/* Cart button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 -mr-2 text-foreground hover:text-primary transition-colors"
          aria-label="Ver carrito"
        >
          <ShoppingBag className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-medium rounded-full">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
