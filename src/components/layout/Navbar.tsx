"use client"

import { Menu, ShoppingBag, Search } from "lucide-react"
import { useUI } from "@/context/UIContext"
import { useCart } from "@/context/CartContext"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { setIsMenuOpen, setIsCartOpen, searchQuery, setSearchQuery } = useUI()
  const { cartItemCount, isHydrated } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between px-6 h-20 max-w-7xl mx-auto">
        {/* Botón de Menú Móvil */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 -ml-2 text-white hover:text-[#D4AF37] transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo Central */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center transition-opacity hover:opacity-80"
        >
          <h1 className="text-xl md:text-2xl font-serif tracking-[0.2em] text-white">
            AROMAAS<span className="text-[#D4AF37]">DECANTS</span>
          </h1>
        </Link>

        {/* Derecha: Buscador y Carrito */}
        <div className="flex items-center gap-2">
          {/* Formulario de búsqueda (Inline) */}
          <div className="flex items-center">
            {isSearchOpen && (
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push("/catalog")
                  }
                }}
                placeholder="Buscar marca o nombre..."
                className="bg-transparent border-b border-[#D4AF37] text-white text-xs sm:text-sm focus:outline-none w-24 sm:w-40 transition-all px-1 mx-2"
              />
            )}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-white hover:text-[#D4AF37] transition-colors"
              aria-label="Buscar perfume"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 -mr-2 text-white hover:text-[#D4AF37] transition-colors"
            aria-label="Ver carrito"
          >
            <ShoppingBag className="w-6 h-6" />
            {isHydrated && cartItemCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-black bg-[#D4AF37] rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
