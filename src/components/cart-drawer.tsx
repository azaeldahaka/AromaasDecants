"use client"

import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from "lucide-react"
import { useUI } from "@/context/UIContext"
import { useCart } from "@/context/CartContext"
import Image from "next/image"

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen } = useUI()
  const { cart, removeFromCart, updateQuantity, cartTotal, isHydrated } = useCart()

  const totalMl = cart.reduce((acc, item) => {
    const ml = parseInt(item.size.replace("ml", "")) || 0
    return acc + (ml * item.quantity)
  }, 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleWhatsAppCheckout = () => {
    const items = cart.map(item => 
      `- ${item.product.marca} ${item.product.nombre} (${item.size}) x${item.quantity}: ${formatPrice(item.price * item.quantity)}`
    ).join("\n")
    
    const message = encodeURIComponent(
      `¡Hola AromaasDecants, quiero realizar el siguiente pedido:\n\n${items}\n\nTotal: ${formatPrice(cartTotal)}.\nEnvío a coordinar por privado.`
    )
    
    window.open(`https://wa.me/5493874796321?text=${message}`, "_blank")
  }

  if (!isHydrated || !isCartOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      
      <aside className="fixed top-0 right-0 bottom-0 w-[380px] max-w-[90vw] bg-black border-l border-[#D4AF37]/20 z-50 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-5 border-b border-[#D4AF37]/20">
          <span className="font-serif text-lg tracking-wider text-[#D4AF37] flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            TU CARRITO ({cart.length})
          </span>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 -mr-2 text-white hover:text-[#D4AF37] transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-16 h-16 rounded-full border border-[#D4AF37]/20 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-zinc-600" />
              </div>
              <p className="text-zinc-400 mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-zinc-600">
                Explora el catálogo y añade tus decants favoritos.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#D4AF37]/10">
              {cart.map((item) => (
                <li key={`${item.product.id}-${item.size}`} className="p-5">
                  <div className="flex gap-4">
                    {/* Img */}
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-zinc-900 border border-[#D4AF37]/20 p-2 flex-shrink-0">
                      {item.product.imagenes && item.product.imagenes[item.size] && (
                        <Image src={item.product.imagenes[item.size]} fill alt={item.product.nombre} className="object-contain p-1" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate max-w-[180px]">
                        {item.product.nombre}
                      </h4>
                      <p className="text-xs text-zinc-400 mb-1">
                        {item.product.marca} · <span className="text-[#D4AF37]">{item.size}</span>
                      </p>
                      <p className="text-sm font-medium text-white">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="p-2 self-start text-zinc-500 hover:text-red-400 transition-colors"
                      aria-label="Eliminar del carrito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 rounded-md border border-[#D4AF37]/30 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 rounded-md border border-[#D4AF37]/30 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t border-[#D4AF37]/20 bg-black/90 space-y-4">
            
            <div className="bg-[#D4AF37]/10 p-3 rounded-md text-center border border-[#D4AF37]/20">
               <p className="text-[#D4AF37] text-[10px] sm:text-xs uppercase tracking-wider font-semibold">
                 El envío será coordinado y acordado mediante WhatsApp.
               </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">Total a pagar</span>
              <span className="text-2xl font-serif text-[#D4AF37]">{formatPrice(cartTotal)}</span>
            </div>

            {totalMl < 5 && (
              <div className="text-amber-500 text-xs text-center font-medium px-3 bg-amber-500/10 border border-amber-500/20 py-2 rounded-md">
                El pedido mínimo para finalizar la compra es de 5ml en total.
              </div>
            )}

            <button
              onClick={handleWhatsAppCheckout}
              disabled={totalMl < 5}
              className={`w-full py-4 font-semibold rounded-md flex items-center justify-center gap-2 transition-all duration-200 ${
                totalMl < 5 
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                  : "bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 hover:scale-[1.02] active:scale-95"
              }`}
            >
              <MessageCircle className={`w-5 h-5 ${totalMl < 5 ? "fill-zinc-500 text-zinc-500" : "fill-black text-black"}`} />
              Checkout por WhatsApp
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
