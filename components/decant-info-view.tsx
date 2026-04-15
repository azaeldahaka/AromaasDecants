"use client"

import { ArrowLeft, Droplets, Shield, Beaker, Package } from "lucide-react"
import Image from "next/image"
import { useStore } from "@/lib/store-context"

export function DecantInfoView() {
  const { setCurrentView } = useStore()

  return (
    <div className="pt-16 min-h-screen">
      {/* Back button */}
      <div className="px-4 py-3 border-b border-border">
        <button
          onClick={() => setCurrentView("home")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Volver al inicio</span>
        </button>
      </div>

      {/* Hero */}
      <div className="relative h-48 bg-secondary">
        <Image
          src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=400&fit=crop"
          alt="Decant de perfume"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="text-3xl font-serif text-foreground">
            ¿Qué es un Decant?
          </h1>
        </div>
      </div>

      {/* Content */}
      <article className="p-4 space-y-8 max-w-2xl mx-auto">
        {/* Intro */}
        <section>
          <p className="text-muted-foreground leading-relaxed">
            Un <strong className="text-foreground">decant</strong> es una muestra de perfume 
            original extraída directamente de la botella del fabricante y transferida a un 
            atomizador más pequeño. Es la forma perfecta de probar fragancias de lujo sin 
            comprometerte con el precio completo de un frasco.
          </p>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-xl font-serif text-foreground mb-4">
            Beneficios de los Decants
          </h2>
          <div className="grid gap-4">
            <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Droplets className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Prueba Antes de Invertir</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Conoce cómo se desarrolla una fragancia en tu piel antes de comprar la botella completa.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Variedad en tu Colección</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Arma una colección diversa de fragancias premium sin gastar una fortuna.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">100% Original</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Todas nuestras fragancias son auténticas, extraídas de botellas originales selladas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-xl font-serif text-foreground mb-4">
            Nuestro Proceso de Extracción
          </h2>
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-secondary">
            <Image
              src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=450&fit=crop"
              alt="Proceso de extracción de decant"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              En <strong className="text-foreground">AromaasDecants</strong>, nos tomamos muy 
              en serio la calidad de nuestros productos. Cada decant es preparado siguiendo 
              un riguroso protocolo de extracción estéril:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>Utilizamos jeringas y atomizadores nuevos para cada extracción</li>
              <li>El proceso se realiza en un ambiente limpio y controlado</li>
              <li>Las botellas originales son verificadas antes de cada extracción</li>
              <li>Los atomizadores son etiquetados con el nombre de la fragancia y el volumen</li>
            </ol>
          </div>
        </section>

        {/* Sizes */}
        <section>
          <h2 className="text-xl font-serif text-foreground mb-4">
            Tamaños Disponibles
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-card rounded-lg border border-border text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Beaker className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">3ml</h3>
              <p className="text-xs text-muted-foreground">~30 aplicaciones</p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Beaker className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">5ml</h3>
              <p className="text-xs text-muted-foreground">~50 aplicaciones</p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Beaker className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">10ml</h3>
              <p className="text-xs text-muted-foreground">~100 aplicaciones</p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">Botella</h3>
              <p className="text-xs text-muted-foreground">Original sellada</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-4">
          <button
            onClick={() => setCurrentView("catalog")}
            className="w-full py-4 px-6 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Explorar Catálogo
          </button>
        </section>
      </article>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border text-center mt-8">
        <p className="text-xs text-muted-foreground">
          © 2024 AromaasDecants. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  )
}
