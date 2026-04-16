import productosData from "@/data/productos.json"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { AddToCartActions } from "@/components/catalog/AddToCartActions"
import Image from "next/image"

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const product = productosData.find(p => p.id === resolvedParams.id)

  if (!product) {
    notFound() // Genera la página de error 404 automática de Next
  }

  return (
    <div className="pt-24 pb-8 animate-in fade-in duration-500 max-w-6xl mx-auto px-4 md:px-8 min-h-screen">
      <div className="mb-6">
        <Link href="/catalog" className="inline-flex items-center text-sm font-medium text-[#D4AF37] hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Volver al Catálogo
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
        {/* Lado de Imagen (Server Rendered) */}
        <div className="relative bg-zinc-950 border border-[#D4AF37]/20 rounded-2xl aspect-square flex flex-col items-center justify-center p-8 overflow-hidden group">
          <Image 
            src={product.imagen} 
            fill 
            alt={product.nombre} 
            className="object-contain p-8 group-hover:scale-105 transition-transform duration-700" 
            priority
          />
        </div>

        {/* Lado de Información y Componente Interactivo */}
        <div className="flex flex-col py-4">
          <p className="text-[#D4AF37] tracking-widest uppercase text-sm mb-2 font-semibold">
           {product.marca} | {product.genero}
          </p>
          <h1 className="text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight max-w-xl">
           {product.nombre}
          </h1>
          
          <AddToCartActions product={product} />
        </div>
      </div>
    </div>
  )
}
