"use client"

import { X, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useStore } from "@/lib/store-context"

export function MenuDrawer() {
  const { isMenuOpen, setIsMenuOpen, setCurrentView, setCurrentCategory } = useStore()
  const [catalogExpanded, setCatalogExpanded] = useState(false)

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category)
    setCurrentView("catalog")
    setIsMenuOpen(false)
    setCatalogExpanded(false)
  }

  const handleNavClick = (view: "home" | "catalog" | "product" | "decant-info" | "about" | "special-requests" | "contact") => {
    setCurrentView(view)
    setIsMenuOpen(false)
  }

  if (!isMenuOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Drawer */}
      <aside className="fixed top-0 left-0 bottom-0 w-[280px] max-w-[85vw] bg-sidebar z-50 flex flex-col animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <span className="font-serif text-lg tracking-wider text-sidebar-foreground">Menú</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 -mr-2 text-sidebar-foreground hover:text-primary transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {/* Catálogo with submenu */}
            <li>
              <button
                onClick={() => setCatalogExpanded(!catalogExpanded)}
                className="flex items-center justify-between w-full px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <span className="text-base">Catálogo</span>
                {catalogExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              
              {catalogExpanded && (
                <ul className="bg-background/50 py-2">
                  <li>
                    <button
                      onClick={() => handleCategoryClick("todos")}
                      className="w-full px-8 py-2.5 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                    >
                      Todos
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleCategoryClick("hombre")}
                      className="w-full px-8 py-2.5 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                    >
                      Hombre
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleCategoryClick("mujer")}
                      className="w-full px-8 py-2.5 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                    >
                      Mujer
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleCategoryClick("unisex")}
                      className="w-full px-8 py-2.5 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                    >
                      Unisex
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleCategoryClick("ofertas")}
                      className="w-full px-8 py-2.5 text-left text-sm text-primary hover:bg-sidebar-accent transition-colors"
                    >
                      Ofertas
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Other links */}
            <li>
              <button
                onClick={() => handleNavClick("decant-info")}
                className="w-full px-4 py-3 text-left text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                ¿Qué es un Decant?
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("special-requests")}
                className="w-full px-4 py-3 text-left text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                Pedidos Especiales
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("about")}
                className="w-full px-4 py-3 text-left text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                Sobre Nosotros
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("contact")}
                className="w-full px-4 py-3 text-left text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                Contacto
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground text-center">
            © 2024 AromaasDecants
          </p>
        </div>
      </aside>
    </>
  )
}
