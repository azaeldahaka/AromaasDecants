"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { Shield, Sparkles } from "lucide-react"
import Image from "next/image"

export function ProductDetailClient({ product }: { product: any }) {
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

  const handleAdd = () => {
    addToCart(
      { id: product.id, marca: product.marca, nombre: product.nombre, imagenes: product.imagenes },
      selectedSize,
      currentPrice,
      1
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
      {/* Img side */}
      <div className="relative bg-zinc-950 border border-[#D4AF37]/20 rounded-2xl aspect-square flex flex-col items-center justify-center p-8 overflow-hidden">
        {product.imagenes && product.imagenes[selectedSize] ? (
          <Image src={product.imagenes[selectedSize]} fill alt={product.nombre} className="object-contain p-8 hover:scale-110 transition-transform duration-700" />
        ) : null}
      </div>

      {/* Info side */}
      <div className="flex flex-col py-4">
        <p className="text-[#D4AF37] tracking-widest uppercase text-sm mb-2 font-semibold">
           {product.marca} | {product.genero}
        </p>
        <h1 className="text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight">{product.nombre}</h1>
        
        <p className="text-3xl text-white font-bold mb-8">{formatPrice(currentPrice)}</p>

        <div className="space-y-4 mb-10">
          <p className="text-sm text-zinc-400 uppercase tracking-wider font-semibold">Selecciona el tamaño (Decant)</p>
          <div className="flex gap-3">
            {(["3ml", "5ml", "10ml"] as const).map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 px-8 text-sm font-semibold rounded-lg transition-all duration-200 border ${
                  selectedSize === size
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] scale-[1.02]"
                    : "bg-zinc-900 shadow-inner text-white border-zinc-700 hover:border-[#D4AF37]/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-4 text-lg bg-[#D4AF37] text-black font-semibold rounded-xl hover:bg-[#D4AF37]/90 transition-all hover:scale-[1.02] active:scale-95 mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          Añadir al carrito
        </button>

        {/* Badges */}
        <div className="grid grid-cols-2 gap-4 mt-auto border-t border-zinc-800 pt-8">
          <div className="flex items-start gap-3">
             <Shield className="w-5 h-5 text-[#D4AF37] mt-0.5" />
             <div>
               <h4 className="text-white text-sm font-medium mb-1">100% Original</h4>
               <p className="text-xs text-zinc-500 leading-relaxed">Perfume original, no copias ni inspiraciones.</p>
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
