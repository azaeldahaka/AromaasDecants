"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { Shield, Sparkles, Minus, Plus, Share2 } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import productosData from "@/data/productos.json"

export function PromoAddToCartActions({ promo }: { promo: any }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  const matchedProducts = promo.productos_incluidos.map((name: string) => 
    productosData.find(p => p.nombre === name)
  ).filter(Boolean)

  const handleAdd = () => {
    const firstImage = matchedProducts[0] ? (matchedProducts[0] as any).imagenes["3ml"] : "/perfume-lujo.jpeg"

    addToCart(
      { id: promo.id, marca: "Combo Exclusivo", nombre: promo.nombre, imagenes: { [`${promo.total_ml}ml`]: firstImage } },
      `${promo.total_ml}ml`,
      promo.precio,
      quantity
    )
    toast.success(`${promo.nombre} añadido al carrito`, {
      style: { background: '#18181b', color: '#D4AF37', border: '1px solid rgba(212, 175, 55, 0.2)' }
    })
  }

  const handleShare = async () => {
    const shareData = {
      title: promo.nombre,
      text: promo.descripcion,
      url: `${window.location.origin}/promociones/${promo.id}`,
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
      {/* Lado de Imagen Reactiva (Collage) */}
      <div className="relative bg-zinc-950 border border-[#D4AF37]/20 rounded-2xl aspect-square flex items-center justify-center p-8 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <div className="relative z-20 flex items-center justify-center gap-4 w-full h-full">
           {matchedProducts.length > 0 ? (
             matchedProducts.slice(0, 4).map((p: any, idx: number) => (
               <div key={p.id} className={`relative w-32 h-48 ${idx % 2 !== 0 ? 'mt-12 -ml-8 z-10' : 'z-20 -mt-12'} transform group-hover:scale-105 transition-transform duration-700`}>
                 <Image 
                   src={p.imagenes["5ml"] || p.imagenes["10ml"] || p.imagenes["3ml"]} 
                   alt={p.nombre} 
                   fill 
                   className="object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]" 
                 />
               </div>
             ))
           ) : (
             <div className="text-zinc-600 font-serif italic">Imágenes no disponibles</div>
           )}
        </div>
      </div>

      {/* Lado de Información y Componente Interactivo */}
      <div className="flex flex-col py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[#D4AF37] tracking-widest uppercase text-sm mb-2 font-semibold">
              Combo Exclusivo | {promo.total_ml}ML Total
            </p>
            <h1 className="text-4xl lg:text-5xl font-serif text-white mb-4 leading-tight max-w-xl">
              {promo.nombre}
            </h1>
          </div>
          <button
            onClick={handleShare}
            className="p-3 text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-xl hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all flex-shrink-0 mt-1"
            aria-label="Compartir"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-zinc-400 text-lg max-w-lg mb-8 leading-relaxed">
          <p className="mb-2 font-medium text-zinc-300">Incluye los siguientes decants:</p>
          <ul className="list-disc pl-5 space-y-1 text-base">
            {promo.descripcion.split(", ").map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        
        <p className="text-3xl text-white font-bold mb-8">{formatPrice(promo.precio * quantity)}</p>

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
          Añadir Combo al carrito
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
