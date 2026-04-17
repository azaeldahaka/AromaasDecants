"use client"

import Link from "next/link"
import Image from "next/image"
import selladosData from "@/data/sellados.json"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function SelladosClient() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "Todos"
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) {
      setActiveCategory(cat)
    }
  }, [searchParams])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  const filtered = activeCategory.toLowerCase() === "todos" 
    ? selladosData 
    : selladosData.filter(p => p.genero.toLowerCase() === activeCategory.toLowerCase() || (activeCategory.toLowerCase() === "oferta" && p.precio < 200000))

  return (
    <div className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
       <div className="text-center mb-12">
         <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm font-semibold mb-2 block">Colección Exclusiva</span>
         <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide">PERFUMES SELLADOS</h1>
       </div>
       
       {/* Filters */}
       <div className="flex flex-wrap justify-center gap-3 mb-16">
          {["Todos", "Hombre", "Mujer", "Unisex", "Oferta"].map(cat => (
             <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-xs sm:text-sm tracking-[0.1em] uppercase font-semibold transition-all ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-105"
                  : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50"
                }`}
             >
                {cat}
             </button>
          ))}
       </div>

       {/* Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map(product => (
             <Link key={product.id} href={`/sellados/${product.id}`} className="group bg-black/50 border border-[#D4AF37]/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/10 flex flex-col">
                <div className="relative aspect-[4/5] bg-zinc-950/50 p-8 flex justify-center items-center">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                   <Image src={product.imagen} fill alt={product.nombre} className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                </div>
                <div className="p-6 flex flex-col gap-2 flex-grow border-t border-white/5">
                   <p className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase font-bold">{product.marca}</p>
                   <h3 className="text-white font-serif text-xl truncate">{product.nombre}</h3>
                   <p className="text-zinc-400 text-sm mt-auto pt-4 border-t border-white/5">{formatPrice(product.precio)}</p>
                </div>
             </Link>
          ))}
          {filtered.length === 0 && (
             <div className="col-span-full py-24 text-center border border-dashed border-zinc-800 rounded-2xl">
               <span className="text-zinc-500 font-serif text-lg">No hay inventario sellado en esta categoría por el momento.</span>
             </div>
          )}
       </div>
    </div>
  )
}
