"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import { Share2 } from "lucide-react"
import { toast } from "sonner"

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
  descripcion?: string
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
    toast.success(`${product.nombre} añadido al carrito`, {
      style: { background: '#18181b', color: '#D4AF37', border: '1px solid rgba(212, 175, 55, 0.2)' }
    })
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const shareData = {
      title: product.nombre,
      text: product.descripcion,
      url: `${window.location.origin}/product/${product.id}`,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
        toast('Enlace copiado al portapapeles', {
          style: { background: '#18181b', color: '#fff', border: '1px solid rgba(212, 175, 55, 0.2)' }
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="group flex flex-col bg-black border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/10">
      <Link href={`/product/${product.id}`} className="relative aspect-square bg-zinc-950 overflow-hidden flex items-center justify-center p-4">
        <Image src={product.imagenes[selectedSize]} fill alt={product.nombre} className="object-contain p-6 hover:scale-105 transition-transform duration-500" />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/product/${product.id}`} className="flex-1 block">
          <p className="text-xs text-zinc-400 font-medium tracking-widest uppercase mb-1">{product.marca}</p>
          <h3 className="text-white font-serif text-lg leading-tight mb-2 group-hover:text-[#D4AF37] transition-colors">{product.nombre}</h3>
          {product.descripcion && (
            <p className="text-sm text-gray-400 line-clamp-2 mb-4">{product.descripcion}</p>
          )}
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
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-zinc-400 hover:text-[#D4AF37] transition-colors"
              aria-label="Compartir producto"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-transparent text-[#D4AF37] text-sm font-semibold rounded-md border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
