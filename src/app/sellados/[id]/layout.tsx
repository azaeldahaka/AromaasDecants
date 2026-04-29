import type { Metadata } from 'next'
import selladosData from '@/data/sellados.json'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const product = selladosData.find(p => p.id === resolvedParams.id)

  if (!product) {
    return { title: 'Producto no encontrado' }
  }

  const title = `${product.nombre} - ${product.marca} | Sellado Original`
  const description = `Compra ${product.nombre} de ${product.marca} en formato botella sellada 100% original.`
  const imageUrl = product.imagen || '/og-image.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/sellados/${product.id}`,
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

export default function SelladoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
