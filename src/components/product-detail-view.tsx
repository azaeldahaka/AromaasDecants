"use client"

import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useStore } from "@/lib/store-context"
import promocionesData from "@/data/promociones.json"

export function ProductDetailView() {
  const { selectedProduct, setCurrentView, addToCart, setCurrentFilter } = useStore()
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!selectedProduct) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Producto no encontrado</p>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  const currentVariant = selectedProduct.variants[selectedVariant]
  const totalPrice = currentVariant.price * quantity

  const relatedPromo = promocionesData.find(promo => promo.productos_incluidos.includes(selectedProduct.name))

  const handleAddToCart = () => {
    addToCart(selectedProduct, currentVariant.size, quantity)
    setQuantity(1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Back button */}
      <div className="px-4 py-3 border-b border-border">
        <button
          onClick={() => setCurrentView("catalog")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Volver al catálogo</span>
        </button>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square bg-secondary">
        <Image
          src={selectedProduct.image}
          alt={selectedProduct.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-6">
        {/* Title and Brand */}
        <div>
          <p className="text-sm text-primary uppercase tracking-wider mb-1">
            {selectedProduct.brand}
          </p>
          <h1 className="text-2xl font-serif text-foreground">
            {selectedProduct.name}
          </h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedProduct.notes.map((note) => (
              <span
                key={note}
                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Variant Selector - Toggle Chips */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">
            Selecciona el tamaño
          </h3>
          <div className="flex gap-3">
            {selectedProduct.variants.map((variant, index) => (
              <button
                key={variant.size}
                onClick={() => setSelectedVariant(index)}
                className={`flex-1 py-4 px-3 rounded-lg text-center font-medium transition-all ${
                  selectedVariant === index
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                <span className="block text-base font-semibold">{variant.size}</span>
              </button>
            ))}
          </div>
          
          {/* Price Display */}
          <div className="text-center py-2">
            <span className="text-3xl font-serif text-primary">
              {formatPrice(currentVariant.price)}
            </span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Cantidad
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center border border-border rounded-lg bg-secondary">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="w-14 h-14 flex items-center justify-center text-foreground hover:bg-background/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
                aria-label="Reducir cantidad"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-14 text-center text-xl font-semibold text-foreground">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="w-14 h-14 flex items-center justify-center text-foreground hover:bg-background/50 transition-colors rounded-r-lg"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Total</p>
              <p className="text-2xl font-serif text-primary">
                {formatPrice(totalPrice)}
              </p>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-5 px-6 bg-primary text-primary-foreground font-bold text-lg rounded-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          <ShoppingBag className="w-6 h-6" />
          Agregar al Carrito
        </button>

        {/* Product Description */}
        <div className="pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Descripción
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {selectedProduct.name} de {selectedProduct.brand} es una fragancia 
            {selectedProduct.category === "hombre" ? " masculina" : 
             selectedProduct.category === "mujer" ? " femenina" : " unisex"} 
            con notas de {selectedProduct.notes.join(", ").toLowerCase()}. 
            Ideal para quienes buscan una fragancia sofisticada y memorable.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            Todos nuestros decants son extraídos de manera estéril con jeringas 
            nuevas, garantizando la calidad y autenticidad del producto.
          </p>
          
          {relatedPromo && (
            <div 
              className="mt-6 p-4 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/5 relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => {
                setCurrentFilter("promociones")
                setCurrentView("catalog")
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-3 relative z-10">
                <span className="text-xl mt-0.5">✨</span>
                <div>
                  <h4 className="text-[#D4AF37] font-semibold mb-1">{relatedPromo.nombre}: Ahorra llevando este perfume en formato combo.</h4>
                  <p className="text-xs text-zinc-400">Toca para ver los combos exclusivos del catálogo.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
