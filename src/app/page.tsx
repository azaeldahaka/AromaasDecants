"use client"

import { StoreProvider, useStore } from "@/lib/store-context"
import { Header } from "@/components/header"
import { MenuDrawer } from "@/components/menu-drawer"
import { CartDrawer } from "@/components/cart-drawer"
import { HomeView } from "@/components/home-view"
import { CatalogView } from "@/components/catalog-view"
import { ProductDetailView } from "@/components/product-detail-view"
import { DecantInfoView } from "@/components/decant-info-view"
import { AboutView } from "@/components/about-view"
import { HomeView } from "@/components/home-view"

export default function AromaasDecants() {
  return <HomeView />
}
