"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface UIContextType {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  catalogCategory: string
  setCatalogCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [catalogCategory, setCatalogCategory] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <UIContext.Provider value={{
      isMenuOpen, setIsMenuOpen,
      isCartOpen, setIsCartOpen,
      catalogCategory, setCatalogCategory,
      searchQuery, setSearchQuery
    }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error("useUI debe usarse dentro de un UIProvider")
  return ctx
}
