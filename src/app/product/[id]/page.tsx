import productosData from "@/data/productos.json"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { AddToCartActions } from "@/components/catalog/AddToCartActions"

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
      
      <AddToCartActions product={product} />
    </div>
  )
}
