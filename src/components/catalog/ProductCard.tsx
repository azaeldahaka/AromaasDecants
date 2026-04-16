"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/CartContext"

interface Precios {
  "3ml": number
  "5ml": number
  "10ml": number
}

interface Product {
  id: string
  marca: string
  nombre: string
  precios: Precios
  imagenes: Record<string, string>
  tipo: string
  genero: string
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState<"3ml" | "5ml" | "10ml">("3ml")

  const currentPrice = product.precios[selectedSize]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(
      { id: product.id, marca: product.marca, nombre: product.nombre, imagenes: product.imagenes },
      selectedSize,
      currentPrice,
      1
    )
  }

  return (
    <div className="group flex flex-col bg-black border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/10">
      <Link href={`/product/${product.id}`} className="relative aspect-square bg-zinc-950 overflow-hidden flex items-center justify-center p-4">
        <Image src={product.imagenes[selectedSize]} fill alt={product.nombre} className="object-contain p-6 hover:scale-105 transition-transform duration-500" />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/product/${product.id}`} className="flex-1 block">
          <p className="text-xs text-zinc-400 font-medium tracking-widest uppercase mb-1">{product.marca}</p>
          <h3 className="text-white font-serif text-lg leading-tight mb-4 group-hover:text-[#D4AF37] transition-colors">{product.nombre}</h3>
        </Link>
        
        <div className="flex gap-2 mb-6 w-full">
          {(["3ml", "5ml", "10ml"] as const).map(size => (
            <button
              key={size}
              onClick={(e) => { e.preventDefault(); setSelectedSize(size) }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 border ${
                selectedSize === size
                  ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                  : "bg-transparent text-zinc-400 border-zinc-700 hover:border-[#D4AF37]/50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-white tracking-wide">{formatPrice(currentPrice)}</span>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-transparent text-[#D4AF37] text-sm font-semibold rounded-md border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black transition-all"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  )
}
