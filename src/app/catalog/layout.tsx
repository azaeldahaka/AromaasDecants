import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Decants',
  description: 'Explora nuestra colección de decants de perfumes árabes y de diseñador. Muestras de 3ml, 5ml y 10ml extraídas con calidad estéril.',
  openGraph: {
    title: 'Catálogo de Decants - AromaasDecants',
    description: 'Explora nuestra colección de decants de perfumes árabes y de diseñador.',
    url: '/catalog',
  }
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
