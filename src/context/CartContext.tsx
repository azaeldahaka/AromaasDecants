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
  addToCart: (product: CartProductType, size: string, price: number | string, quantity: number | string) => void
  removeFromCart: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number | string) => void
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

  const addToCart = (product: CartProductType, size: string, price: number | string, quantity: number | string) => {
    const parsedPrice = Number(price)
    const parsedQuantity = Number(quantity)

    setCart(prev => {
      const existingIndex = prev.findIndex(i => i.product.id === product.id && i.size === size)
      if (existingIndex >= 0) {
        const next = [...prev]
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Number(next[existingIndex].quantity) + parsedQuantity
        }
        return next
      }
      return [...prev, { product, size, price: parsedPrice, quantity: parsedQuantity }]
    })
  }

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(i => !(i.product.id === productId && i.size === size)))
  }

  const updateQuantity = (productId: string, size: string, quantity: number | string) => {
    const parsedQuantity = Number(quantity)
    if (parsedQuantity <= 0) {
      removeFromCart(productId, size)
      return
    }
    setCart(prev => prev.map(i => 
      (i.product.id === productId && i.size === size) ? { ...i, quantity: parsedQuantity } : i
    ))
  }

  const cartTotal = cart.reduce((acc, current) => acc + (Number(current.price) * Number(current.quantity)), 0)
  const cartItemCount = cart.reduce((acc, current) => acc + Number(current.quantity), 0)

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
