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
import { SpecialRequestsView } from "@/components/special-requests-view"
import { ContactView } from "@/components/contact-view"

function AppContent() {
  const { currentView } = useStore()

  return (
    <>
      <Header />
      <MenuDrawer />
      <CartDrawer />
      
      <main>
        {currentView === "home" && <HomeView />}
        {currentView === "catalog" && <CatalogView />}
        {currentView === "product" && <ProductDetailView />}
        {currentView === "decant-info" && <DecantInfoView />}
        {currentView === "about" && <AboutView />}
        {currentView === "special-requests" && <SpecialRequestsView />}
        {currentView === "contact" && <ContactView />}
      </main>
    </>
  )
}

export default function AromaasDecants() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}
