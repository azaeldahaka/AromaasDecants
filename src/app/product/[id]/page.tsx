import productosData from "@/data/productos.json"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { ProductDetailClient } from "@/components/catalog/ProductDetailClient"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = productosData.find(p => p.id === params.id)

  if (!product) {
    notFound() // Genera la página de error 404 automática de Next
  }

  return (
    <div className="py-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="mb-4">
        <Link href="/catalog" className="inline-flex items-center text-sm font-medium text-[#D4AF37] hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Volver al Catálogo
        </Link>
      </div>
      <ProductDetailClient product={product} />
    </div>
  )
}
