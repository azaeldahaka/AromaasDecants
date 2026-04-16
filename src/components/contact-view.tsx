"use client"

import { Mail, MessageCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactView() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5491112345678?text=Hola, tengo una consulta sobre AromaasDecants", "_blank")
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:aromaasdecants@gmail.com"
  }

  return (
    <div className="min-h-screen bg-background pt-16 pb-12">
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <header className="py-12 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
            Hablemos
          </h1>
          <div className="w-16 h-px bg-primary mx-auto" />
        </header>

        {/* Contact Options */}
        <div className="space-y-4">
          {/* Email Card */}
          <button
            onClick={handleEmailClick}
            className="w-full bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Email</h3>
                <p className="text-primary text-sm">
                  aromaasdecants@gmail.com
                </p>
              </div>
            </div>
          </button>

          {/* WhatsApp Card */}
          <Button
            onClick={handleWhatsAppClick}
            className="w-full bg-[#25D366] hover:bg-[#22c55e] text-white rounded-lg p-6 h-auto"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-base mb-1">WhatsApp</h3>
                <p className="text-white/80 text-sm">
                  Chateá con nosotros
                </p>
              </div>
            </div>
          </Button>

          {/* Hours Card */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Horarios</h3>
                <p className="text-muted-foreground text-sm">
                  Atención online 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mt-8 p-4 bg-secondary/50 border border-border rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Envíos a todo el país por{" "}
            <span className="text-foreground font-medium">Correo Argentino</span>
          </p>
        </div>

        {/* Footer decoration */}
        <div className="mt-12 text-center">
          <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center mx-auto">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
