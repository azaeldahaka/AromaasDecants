import type { Metadata } from 'next'
import selladosData from '@/data/sellados.json'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const product = selladosData.find(p => p.id === resolvedParams.id)

  if (!product) {
    return { title: 'Producto no encontrado' }
  }

  const title = `${product.nombre} - ${product.marca}`
  const description = product.descripcion || `Compra ${product.nombre} de ${product.marca} en formato botella sellada 100% original.`
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

export default async function SelladoLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const product = selladosData.find(p => p.id === resolvedParams.id)

  if (!product) {
    return <>{children}</>
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
    image: product.imagen,
    offers: {
      '@type': 'Offer',
      price: product.precio,
      priceCurrency: 'ARS',
      availability: 'https://schema.org/InStock',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aromaasdecants.com.ar'}/sellados/${product.id}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
