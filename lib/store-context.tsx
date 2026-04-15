"use client"

import { createContext, useContext, useState, ReactNode } from "react"

// Types
export interface Product {
  id: string
  name: string
  brand: string
  category: "hombre" | "mujer" | "unisex"
  type: "designer" | "arabic"
  notes: string[]
  image: string
  variants: {
    size: string
    price: number
  }[]
}

export interface CartItem {
  product: Product
  variant: string
  quantity: number
  price: number
}

type ViewType = "home" | "catalog" | "product" | "decant-info" | "about" | "special-requests" | "contact"

interface StoreContextType {
  // Navigation
  currentView: ViewType
  setCurrentView: (view: ViewType) => void
  
  // Menu & Cart drawers
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  
  // Catalog filters
  currentCategory: string
  setCurrentCategory: (category: string) => void
  currentFilter: string
  setCurrentFilter: (filter: string) => void
  
  // Product detail
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  
  // Cart
  cart: CartItem[]
  addToCart: (product: Product, variant: string, quantity: number) => void
  removeFromCart: (productId: string, variant: string) => void
  updateQuantity: (productId: string, variant: string, quantity: number) => void
  cartTotal: number
  cartItemCount: number
}

// Sample products data
export const products: Product[] = [
  {
    id: "1",
    name: "Aventus",
    brand: "Creed",
    category: "hombre",
    type: "designer",
    notes: ["Cítricos", "Amaderados"],
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop",
    variants: [
      { size: "3ml", price: 15000 },
      { size: "5ml", price: 22000 },
      { size: "10ml", price: 40000 }
    ]
  },
  {
    id: "2",
    name: "Black Orchid",
    brand: "Tom Ford",
    category: "mujer",
    type: "designer",
    notes: ["Florales", "Orientales"],
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    variants: [
      { size: "3ml", price: 12000 },
      { size: "5ml", price: 18000 },
      { size: "10ml", price: 32000 }
    ]
  },
  {
    id: "3",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    category: "unisex",
    type: "designer",
    notes: ["Amaderados", "Florales"],
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
    variants: [
      { size: "3ml", price: 20000 },
      { size: "5ml", price: 30000 },
      { size: "10ml", price: 55000 }
    ]
  },
  {
    id: "4",
    name: "Oud Wood",
    brand: "Tom Ford",
    category: "unisex",
    type: "designer",
    notes: ["Amaderados", "Especiados"],
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=400&fit=crop",
    variants: [
      { size: "3ml", price: 14000 },
      { size: "5ml", price: 21000 },
      { size: "10ml", price: 38000 }
    ]
  },
  {
    id: "5",
    name: "Amber Oud",
    brand: "Al Haramain",
    category: "unisex",
    type: "arabic",
    notes: ["Orientales", "Amaderados"],
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop",
    variants: [
      { size: "3ml", price: 8000 },
      { size: "5ml", price: 12000 },
      { size: "10ml", price: 20000 }
    ]
  },
  {
    id: "6",
    name: "Lattafa Khamrah",
    brand: "Lattafa",
    category: "unisex",
    type: "arabic",
    notes: ["Dulces", "Especiados"],
    image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=400&h=400&fit=crop",
    variants: [
      { size: "3ml", price: 5000 },
      { size: "5ml", price: 7500 },
      { size: "10ml", price: 13000 }
    ]
  },
  {
    id: "7",
    name: "Bleu de Chanel",
    brand: "Chanel",
    category: "hombre",
    type: "designer",
    notes: ["Cítricos", "Amaderados"],
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop",
    variants: [
      { size: "3ml", price: 10000 },
      { size: "5ml", price: 15000 },
      { size: "10ml", price: 27000 }
    ]
  },
  {
    id: "8",
    name: "La Vie Est Belle",
    brand: "Lancôme",
    category: "mujer",
    type: "designer",
    notes: ["Florales", "Dulces"],
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=400&fit=crop",
    variants: [
      { size: "3ml", price: 8000 },
      { size: "5ml", price: 12000 },
      { size: "10ml", price: 22000 }
    ]
  }
]

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewType>("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState("todos")
  const [currentFilter, setCurrentFilter] = useState("todos")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product, variant: string, quantity: number) => {
    const variantData = product.variants.find(v => v.size === variant)
    if (!variantData) return

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.variant === variant
      )
      
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      }
      
      return [...prev, {
        product,
        variant,
        quantity,
        price: variantData.price
      }]
    })
    
    setIsCartOpen(true)
  }

  const removeFromCart = (productId: string, variant: string) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.variant === variant)
    ))
  }

  const updateQuantity = (productId: string, variant: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant)
      return
    }
    
    setCart(prev => prev.map(item => 
      item.product.id === productId && item.variant === variant
        ? { ...item, quantity }
        : item
    ))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <StoreContext.Provider value={{
      currentView,
      setCurrentView,
      isMenuOpen,
      setIsMenuOpen,
      isCartOpen,
      setIsCartOpen,
      currentCategory,
      setCurrentCategory,
      currentFilter,
      setCurrentFilter,
      selectedProduct,
      setSelectedProduct,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartItemCount
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
