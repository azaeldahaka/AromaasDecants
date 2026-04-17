"use client"

import selladosData from "@/data/sellados.json"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { ChevronLeft, Minus, Plus, MessageCircle, ShieldCheck } from "lucide-react"
import { useState } from "react"

export default function SelladoDetailPage() {
  const params = useParams()
  const product = selladosData.find(p => p.id === params.id)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleWhatsApp = () => {
    const text = `Hola AromaasDecants, quería consultar el stock y precio del perfume sellado: ${product.nombre} (${product.marca}) - Cantidad: ${quantity}`
    window.open(`https://wa.me/5493874431282?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="pt-32 pb-16 animate-in fade-in duration-500 max-w-6xl mx-auto px-4 md:px-8 min-h-screen">
      <div className="mb-6">
        <Link href="/sellados" className="inline-flex items-center text-sm font-semibold tracking-wider uppercase text-[#D4AF37] hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Volver a Colección
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <div className="relative bg-zinc-950/50 border border-[#D4AF37]/20 rounded-3xl aspect-square flex items-center justify-center overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-[#D4AF37]/5" />
          <Image 
            src={product.imagen} 
            fill 
            alt={product.nombre} 
            className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90" 
            priority
          />
        </div>

        <div className="flex flex-col py-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs uppercase tracking-widest rounded-full border border-[#D4AF37]/30">
               <ShieldCheck className="w-3.5 h-3.5" />
               Caja Sellada Original
            </span>
          </div>
          
          <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-2 font-bold">
           {product.marca} | {product.genero}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight text-balance">
           {product.nombre}
          </h1>
          <p className="text-zinc-400 leading-relaxed max-w-lg mb-8 text-lg">
            {product.descripcion}
          </p>

          <p className="text-4xl text-white font-serif mb-10">{formatPrice(product.precio * quantity)}</p>

          <div className="space-y-4 mb-12">
            <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-bold">Cantidad Solicitada</p>
            <div className="flex items-center gap-6 bg-black border border-zinc-800 w-fit rounded-xl p-2 shadow-inner">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-8 text-center text-xl font-medium text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            onClick={handleWhatsApp}
            className="w-full inline-flex items-center justify-center gap-4 py-5 text-lg bg-[#25D366] text-white font-bold tracking-wide uppercase rounded-2xl hover:bg-[#25D366]/90 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(37,211,102,0.2)] border border-green-400/20"
          >
            <MessageCircle className="w-6 h-6" />
            Consultar Stock en WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
