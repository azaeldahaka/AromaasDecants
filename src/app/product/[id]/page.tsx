import productosData from "@/data/productos.json"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { AddToCartActions } from "@/components/catalog/AddToCartActions"
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const product = productosData.find(p => p.id === resolvedParams.id)

  if (!product) {
    return { title: 'Producto no encontrado' }
  }

  const title = `${product.nombre} - ${product.marca}`
  const description = product.descripcion || `Adquiere un decant de ${product.nombre} por ${product.marca}. Disponible en 3ml, 5ml y 10ml.`
  const imageUrl = product.imagenes["10ml"] || '/og-image.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/product/${product.id}`,
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

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const product = productosData.find(p => p.id === resolvedParams.id)

  if (!product) {
    notFound() // Genera la página de error 404 automática de Next
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nombre,
    description: product.descripcion,
    brand: {
      '@type': 'Brand',
      name: product.marca
    },
    image: product.imagenes['10ml'],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'ARS',
      lowPrice: product.precios['3ml'],
      highPrice: product.precios['10ml'],
      offerCount: 3,
      offers: Object.entries(product.precios).map(([size, price]) => ({
        '@type': 'Offer',
        name: `${size} Decant`,
        price: price,
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aromaasdecants.com.ar'}/product/${product.id}`
      }))
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-24 pb-8 animate-in fade-in duration-500 max-w-6xl mx-auto px-4 md:px-8 min-h-screen">
        <div className="mb-6">
          <Link href="/catalog" className="inline-flex items-center text-sm font-medium text-[#D4AF37] hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver al Catálogo
          </Link>
        </div>
        
        <AddToCartActions product={product as any} />
      </div>
    </>
  )
}
