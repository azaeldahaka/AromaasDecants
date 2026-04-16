"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface CartProductType {
  id: string
  marca: string
  nombre: string
  imagenes: Record<string, string>
}

export interface CartItem {
  product: CartProductType
  size: string // e.g., "3ml", "5ml", "10ml"
  quantity: number
  price: number // cached price for the selected size
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: CartProductType, size: string, price: number, quantity: number) => void
  removeFromCart: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  cartTotal: number
  cartItemCount: number
  isHydrated: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Cargar de localStorage en el primer render
  useEffect(() => {
    const saved = localStorage.getItem("aromaas-cart")
    if (saved) {
      try {
        setCart(JSON.parse(saved))
      } catch (e) {
        console.error("Fallo la hidratación del carrito", e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Guardar en localStorage ante cualquier cambio (siempre que se haya hidratado)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("aromaas-cart", JSON.stringify(cart))
    }
  }, [cart, isHydrated])

  const addToCart = (product: CartProductType, size: string, price: number, quantity: number) => {
    setCart(prev => {
      const existing = prev.findIndex(i => i.product.id === product.id && i.size === size)
      if (existing >= 0) {
        const next = [...prev]
        next[existing].quantity += quantity
        return next
      }
      return [...prev, { product, size, price, quantity }]
    })
  }

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(i => !(i.product.id === productId && i.size === size)))
  }

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }
    setCart(prev => prev.map(i => 
      (i.product.id === productId && i.size === size) ? { ...i, quantity } : i
    ))
  }

  const cartTotal = cart.reduce((acc, current) => acc + (current.price * current.quantity), 0)
  const cartItemCount = cart.reduce((acc, current) => acc + current.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartItemCount,
      isHydrated
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart debe usarse dentro de un CartProvider")
  return ctx
}
