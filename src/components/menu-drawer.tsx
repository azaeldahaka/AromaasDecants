"use client"

import { X, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useUI } from "@/context/UIContext"
import Link from "next/link"

export function MenuDrawer() {
  const { isMenuOpen, setIsMenuOpen, setCatalogCategory } = useUI()
  const [catalogExpanded, setCatalogExpanded] = useState(false)
  const [selladosExpanded, setSelladosExpanded] = useState(false)

  const handleCategoryClick = (category: string) => {
    setCatalogCategory(category)
    setIsMenuOpen(false)
    setCatalogExpanded(false)
  }

  if (!isMenuOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Drawer */}
      <aside className="fixed top-0 left-0 bottom-0 w-[280px] max-w-[85vw] bg-black border-r border-[#D4AF37]/20 z-50 flex flex-col animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#D4AF37]/20">
          <span className="font-serif text-lg tracking-wider text-[#D4AF37]">MENÚ</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 -mr-2 text-white hover:text-[#D4AF37] transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {/* Catálogo */}
            <li>
              <button
                onClick={() => setCatalogExpanded(!catalogExpanded)}
                className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white/5 transition-colors"
              >
                <span className="text-base">Catálogo</span>
                {catalogExpanded ? (
                  <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
                )}
              </button>
              
              {catalogExpanded && (
                <ul className="bg-black/50 py-2">
                  {[
                    { id: "todos", label: "Todos", isPrimary: true },
                    { id: "hombre", label: "Hombre" },
                    { id: "mujer", label: "Mujer" },
                    { id: "unisex", label: "Unisex" },
                    { id: "ofertas", label: "Ofertas" }
                  ].map(cat => (
                    <li key={cat.id}>
                      <Link
                        href="/catalog"
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`block w-full py-2.5 text-sm transition-all ${
                          cat.isPrimary 
                            ? 'text-[#D4AF37] hover:bg-white/5 border-l-2 border-[#D4AF37] pl-7 pr-8 font-medium' 
                            : 'text-zinc-400 hover:text-white hover:bg-white/5 px-8'
                        }`}
                      >
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Sellados */}
            <li>
              <button
                onClick={() => setSelladosExpanded(!selladosExpanded)}
                className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white/5 transition-colors"
              >
                <span className="text-base">Perfumes Sellados</span>
                {selladosExpanded ? (
                  <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
                )}
              </button>
              
              {selladosExpanded && (
                <ul className="bg-black/50 py-2">
                  {["Todos", "Hombre", "Mujer", "Unisex", "Diseñador", "Árabe", "Nicho"].map(cat => (
                    <li key={cat}>
                      <Link
                        href={`/sellados?category=${cat}`}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block w-full py-2.5 text-sm transition-all ${
                          cat === "Todos" 
                            ? "text-[#D4AF37] hover:bg-white/5 border-l-2 border-[#D4AF37] pl-7 pr-8 font-medium" 
                            : "text-zinc-400 hover:text-white hover:bg-white/5 px-8"
                        }`}
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Links Estáticos */}
            <li>
              <Link
                href="/decants"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-4 py-3 text-white hover:bg-white/5 transition-colors"
              >
                Información
              </Link>
            </li>
            <li>
              <Link
                href="/special-requests"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-4 py-3 text-white hover:bg-white/5 transition-colors"
              >
                Pedidos Especiales
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-4 py-3 text-white hover:bg-white/5 transition-colors"
              >
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-4 py-3 text-white hover:bg-white/5 transition-colors"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#D4AF37]/20">
          <p className="text-xs text-zinc-500 text-center">
            © 2024 AromaasDecants
          </p>
        </div>
      </aside>
    </>
  )
}
