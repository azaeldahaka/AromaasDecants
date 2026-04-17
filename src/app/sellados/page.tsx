import { Suspense } from "react"
import SelladosClient from "./SelladosClient"

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
