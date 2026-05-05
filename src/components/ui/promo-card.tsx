"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { useUI } from "@/context/UIContext"
import { ShoppingBag } from "lucide-react"
import productsData from "@/data/productos.json"

interface PromoType {
  id: string
  nombre: string
  descripcion: string
  precio: number
  total_ml: number
  productos_incluidos: string[]
}

export function PromoCard({ promo }: { promo: PromoType }) {
  const { addToCart } = useCart()
  const { setIsCartOpen } = useUI()

  // Find products matching the names in the promo to get their images
  const matchedProducts = promo.productos_incluidos.map(name => 
    productsData.find(p => p.nombre === name)
  ).filter(Boolean)

  const handleAddPromo = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Determine image for the cart (just use the first one if available)
    const firstImage = matchedProducts[0] ? (matchedProducts[0] as any).imagenes["3ml"] : "/perfume-lujo.jpeg"
    
    addToCart({
      id: promo.id,
      marca: "Combo Exclusivo",
      nombre: promo.nombre,
      imagenes: {
        [`${promo.total_ml}ml`]: firstImage
      }
    }, `${promo.total_ml}ml`, promo.precio, 1)

    setIsCartOpen(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="group relative bg-zinc-900/50 border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37]/60 transition-colors flex flex-col">
      <Link href={`/promociones/${promo.id}`} className="flex flex-col flex-1">
        {/* Collage Header */}
        <div className="relative h-48 bg-zinc-950 flex p-4 justify-center items-center overflow-hidden border-b border-[#D4AF37]/10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        
        {/* If we have at least 1 image, display them */}
        <div className="relative z-0 flex items-center justify-center gap-4 w-full h-full">
           {matchedProducts.length > 0 ? (
             matchedProducts.slice(0, 2).map((p, idx) => (
               <div key={(p as any).id} className={`relative w-24 h-32 ${idx === 1 ? '-ml-8 mt-6' : 'z-10 -mt-6'} transform group-hover:scale-105 transition-transform duration-500`}>
                 <Image 
                   src={(p as any).imagenes["3ml"] || "/perfume-lujo.jpeg"} 
                   alt={(p as any).nombre} 
                   fill 
                   className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.15)]" 
                 />
               </div>
             ))
           ) : (
             <div className="text-zinc-600 font-serif italic text-sm relative z-20">Imágenes no disponibles</div>
           )}
        </div>
        
        {/* Badge */}
        <div className="absolute top-3 right-3 z-20 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1 rounded shadow-lg">
          {promo.total_ml}ML
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-lg text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
          {promo.nombre}
        </h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">
            {promo.descripcion}
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5 flex items-center justify-between mt-auto pt-4 border-t border-[#D4AF37]/10">
        <span className="text-xl font-serif text-[#D4AF37] font-medium">
          {formatPrice(promo.precio)}
        </span>
        <button
          onClick={handleAddPromo}
          className="flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-[#D4AF37] text-white hover:text-black transition-all z-10"
          aria-label="Agregar combo al carrito"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
