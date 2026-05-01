"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { Shield, Sparkles, Minus, Plus } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

export function AddToCartActions({ product }: { product: any }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState<"3ml" | "5ml" | "10ml">("3ml")
  const [quantity, setQuantity] = useState(1)
  const currentPrice = product.precios[selectedSize]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleAdd = () => {
    addToCart(
      { id: product.id, marca: product.marca, nombre: product.nombre, imagenes: product.imagenes },
      selectedSize,
      currentPrice,
      quantity
    )
    toast.success(`${product.nombre} añadido al carrito`, {
      style: { background: '#18181b', color: '#D4AF37', border: '1px solid rgba(212, 175, 55, 0.2)' }
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
      {/* Lado de Imagen Reactiva */}
      <div className="relative bg-zinc-950 border border-[#D4AF37]/20 rounded-2xl aspect-square flex flex-col items-center justify-center p-8 overflow-hidden group">
        {product.imagenes && product.imagenes[selectedSize] ? (
          <Image 
            src={product.imagenes[selectedSize]} 
            fill 
            alt={product.nombre} 
            className="object-contain p-8 group-hover:scale-105 transition-transform duration-700" 
            priority
          />
        ) : null}
      </div>

      {/* Lado de Información y Componente Interactivo */}
      <div className="flex flex-col py-4">
        <p className="text-[#D4AF37] tracking-widest uppercase text-sm mb-2 font-semibold">
          {product.marca} | {product.genero}
        </p>
        <h1 className="text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight max-w-xl">
          {product.nombre}
        </h1>
        
        <p className="text-3xl text-white font-bold mb-8">{formatPrice(currentPrice * quantity)}</p>

        {/* Selectores de Tamaño */}
        <div className="space-y-4 mb-8">
          <p className="text-sm text-zinc-400 uppercase tracking-wider font-semibold">Selecciona el volumen</p>
          <div className="flex gap-3">
            {(["3ml", "5ml", "10ml"] as const).map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 px-6 sm:px-8 text-sm font-semibold rounded-lg transition-all duration-200 border ${
                  selectedSize === size
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    : "bg-zinc-900 shadow-inner text-white border-zinc-700 hover:border-[#D4AF37]/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Cantidad */}
        <div className="space-y-4 mb-10">
          <p className="text-sm text-zinc-400 uppercase tracking-wider font-semibold">Cantidad</p>
          <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-700 w-fit rounded-lg p-1">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/5 rounded-md transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-8 text-center text-lg font-medium text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/5 rounded-md transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-4 text-lg bg-[#D4AF37] text-black font-semibold rounded-xl hover:bg-[#D4AF37]/90 transition-all hover:scale-[1.02] active:scale-95 mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          Añadir al carrito
        </button>

        {/* Badges */}
        <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-8">
          <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#D4AF37] mt-0.5" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">100% Original</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">Perfume original, sin falsificaciones.</p>
              </div>
          </div>
          <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#D4AF37] mt-0.5" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">Decant Clínico</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">Extracción mediante jeringa estéril.</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
