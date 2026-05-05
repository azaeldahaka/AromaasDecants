import promocionesData from "@/data/promociones.json"
import productosData from "@/data/productos.json"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { PromoAddToCartActions } from "@/components/catalog/PromoAddToCartActions"
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const promo = promocionesData.find(p => p.id === resolvedParams.id)

  if (!promo) {
    return { title: 'Promoción no encontrada' }
  }

  const title = `${promo.nombre} - Promoción Exclusiva`
  const description = promo.descripcion
  
  // Find first image for OpenGraph
  const firstProduct = productosData.find(p => p.nombre === promo.productos_incluidos[0])
  const imageUrl = firstProduct?.imagenes["10ml"] || '/og-image.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/promociones/${promo.id}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: title,
        },
      ],
    },
  }
}

export default async function PromoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const promo = promocionesData.find(p => p.id === resolvedParams.id)

  if (!promo) {
    notFound()
  }

  return (
    <div className="pt-24 pb-8 animate-in fade-in duration-500 max-w-6xl mx-auto px-4 md:px-8 min-h-screen">
      <div className="mb-6">
        <Link href="/catalog?category=promociones" className="inline-flex items-center text-sm font-medium text-[#D4AF37] hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Volver a Promociones
        </Link>
      </div>
      
      <PromoAddToCartActions promo={promo} />
    </div>
  )
}
