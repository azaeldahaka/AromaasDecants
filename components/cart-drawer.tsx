"use client"

import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useStore } from "@/lib/store-context"

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal } = useStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleWhatsAppCheckout = () => {
    const items = cart.map(item => 
      `- ${item.product.name} (${item.variant}) x${item.quantity}: ${formatPrice(item.price * item.quantity)}`
    ).join("\n")
    
    const message = encodeURIComponent(
      `¡Hola! Me gustaría realizar el siguiente pedido:\n\n${items}\n\n*Subtotal: ${formatPrice(cartTotal)}*\n\n¿Podrían confirmar disponibilidad y costo de envío?`
    )
    
    window.open(`https://wa.me/5491112345678?text=${message}`, "_blank")
  }

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <aside className="fixed top-0 right-0 bottom-0 w-[340px] max-w-[90vw] bg-sidebar z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <span className="font-serif text-lg tracking-wider text-sidebar-foreground">
            Tu Carrito ({cart.length})
          </span>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 -mr-2 text-sidebar-foreground hover:text-primary transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground">
                Explora nuestro catálogo y encuentra tu fragancia perfecta
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {cart.map((item) => (
                <li key={`${item.product.id}-${item.variant}`} className="p-4">
                  <div className="flex gap-3">
                    {/* Image */}
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.product.brand} · {item.variant}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.variant)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Eliminar del carrito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.variant, item.quantity - 1)}
                      className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                      aria-label="Reducir cantidad"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)}
                      className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-sidebar-border space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-lg font-serif text-foreground">{formatPrice(cartTotal)}</span>
            </div>

            {/* Shipping note */}
            <p className="text-xs text-muted-foreground text-center">
              El costo de envío se coordina por WhatsApp
            </p>

            {/* Checkout button */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 px-4 bg-primary text-primary-foreground font-medium rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Completar pedido por WhatsApp
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
