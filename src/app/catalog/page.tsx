"use client"

import { useUI } from "@/context/UIContext"
import { ProductCard } from "@/components/catalog/ProductCard"
import productosData from "@/data/productos.json"
import { useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"

function CatalogContent() {
  const { catalogCategory, setCatalogCategory, searchQuery } = useUI()
  const searchParams = useSearchParams()

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) {
      setCatalogCategory(cat)
    }
  }, [searchParams, setCatalogCategory])

  // Filtro de productos según la UI
  const filteredProducts = productosData.filter((product) => {
    // Filtro por Buscador
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const matchSearch = product.nombre.toLowerCase().includes(q) || product.marca.toLowerCase().includes(q)
      if (!matchSearch) return false
    }
    if (catalogCategory === "todos") return true
    if (catalogCategory === "ofertas") return true
    if (catalogCategory === "designer") return product.tipo.toLowerCase() === "diseñador"
    if (catalogCategory === "arabic") return product.tipo.toLowerCase() === "árabe"
    if (catalogCategory === "lujo") return product.tipo.toLowerCase() === "lujo"
    
    // Filtros por género
    if (["hombre", "mujer", "unisex"].includes(catalogCategory)) {
       return product.genero.toLowerCase() === catalogCategory
    }
    
    return true
  })

  const categoryTitles: Record<string, string> = {
    "todos": "Nuestra Colección",
    "hombre": "Para Hombre",
    "mujer": "Para Mujer",
    "unisex": "Fragancias Unisex",
    "ofertas": "Ofertas Especiales",
    "designer": "Diseñador",
    "arabic": "Árabes",
    "lujo": "Lujo / Nicho"
  }

  const title = categoryTitles[catalogCategory] || "Catálogo"

  return (
    <div className="py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-3 text-[#D4AF37]">{title}</h1>
          <p className="text-zinc-400 max-w-lg">Descubre nuestra prestigiosa colección de decants. Extracción clínica de las mejores marcas a nivel mundial.</p>
        </div>
        
        {/* Chips de filtrado rápido */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide max-w-full">
            {["todos", "lujo", "designer", "arabic", "hombre", "mujer"].map(cat => (
              <button
                key={cat}
                onClick={() => setCatalogCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  catalogCategory === cat 
                  ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]" 
                  : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-[#D4AF37]/50"
                }`}
              >
                {categoryTitles[cat] || cat}
              </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product as any} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-32 text-zinc-500 border border-zinc-800/50 rounded-2xl bg-zinc-950/50">
            <p className="text-xl font-serif text-zinc-400 mb-2">No encontramos perfumes.</p>
            <p className="text-sm">Intenta seleccionando otra categoría en el menú superior.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-[#D4AF37] font-serif animate-pulse">Cargando catálogo...</div>}>
      <CatalogContent />
    </Suspense>
  )
}
