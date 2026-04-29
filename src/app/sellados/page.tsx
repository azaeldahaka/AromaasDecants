import { Suspense } from "react"
import type { Metadata } from 'next';
import SelladosClient from "./SelladosClient"

export const metadata: Metadata = {
  title: 'Perfumes Sellados Originales',
  description: 'Compra perfumes de lujo y árabes en botella sellada 100% originales. Envíos seguros y garantía de autenticidad.',
  openGraph: {
    title: 'Perfumes Sellados Originales - AromaasDecants',
    description: 'Compra perfumes de lujo y árabes en botella sellada 100% originales.',
    url: '/sellados',
  }
};

export default function SelladosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center pt-24 text-[#D4AF37] font-serif text-2xl animate-pulse">
        Cargando Colección Sellada...
      </div>
    }>
      <SelladosClient />
    </Suspense>
  )
}
