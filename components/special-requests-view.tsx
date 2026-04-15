"use client"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SpecialRequestsView() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    perfume: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.whatsapp || !formData.perfume) return
    
    setIsSubmitting(true)
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", whatsapp: "", perfume: "" })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background pt-16 pb-12">
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <header className="py-12 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
            Encarganos un Perfume
          </h1>
          <div className="w-16 h-px bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            ¿No encuentras la fragancia que buscas? Completa el formulario y te 
            avisaremos cuando la consigamos.
          </p>
        </header>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-foreground">
              ¡Pedido enviado! Te contactaremos pronto.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              Tu nombre
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="Juan Pérez"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="whatsapp" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              Tu número de WhatsApp
            </label>
            <input
              type="tel"
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="+54 9 11 1234-5678"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="perfume" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              Perfume exacto que buscas
            </label>
            <input
              type="text"
              id="perfume"
              value={formData.perfume}
              onChange={(e) => setFormData(prev => ({ ...prev, perfume: e.target.value }))}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="Ej: Tom Ford Tobacco Vanille"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Enviando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Enviar Pedido
              </span>
            )}
          </Button>
        </form>

        {/* Additional info */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Te responderemos en un plazo máximo de 48 horas hábiles.
        </p>
      </div>
    </div>
  )
}
