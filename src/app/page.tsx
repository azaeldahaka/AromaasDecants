import { HomeView } from "@/components/home-view"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Descubre nuestra colección de perfumes de diseñador y árabes en formato decant.',
}

export default function AromaasDecants() {
  return <HomeView />
}
