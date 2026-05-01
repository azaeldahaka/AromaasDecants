"use client"

import { ChevronLeft, ChevronRight, Shield, Truck, Sparkles, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { useUI } from "@/context/UIContext"
import productsData from "@/data/productos.json"

const heroSlides = [
  {
    image: "/perfume-lujo.jpeg",
    title: "Fragancias de Lujo",
    subtitle: "Descubre el arte de la perfumería",
    link: "/catalog?category=lujo"
  },
  {
    image: "/perfume-diseñador.jpeg",
    title: "Perfumería de Diseñador",
    subtitle: "Las mejores marcas al mejor precio",
    link: "/catalog?category=diseñador"
  },
  {
    image: "/perfume-arabe.jpeg",
    title: "Perfumería Árabe",
    subtitle: "Aromas exóticos y duraderos",
    link: "/catalog?category=arabe"
  }
]

export function HomeView() {
  const { setCatalogCategory } = useUI()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  const bestSellers = productsData.slice(0, 5)


  return (
    <div className="pt-16">
      {/* Hero Carousel */}
      <section className="relative h-[70vh] min-h-[400px] max-h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <span className="text-primary text-sm tracking-[0.3em] uppercase mb-3">
                AromaasDecants
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-4 text-balance">
                {slide.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {slide.subtitle}
              </p>
              <Link
                href={slide.link}
                className="relative z-10 pointer-events-auto px-8 py-3 bg-[#D4AF37] text-black font-semibold rounded-md hover:bg-[#D4AF37]/90 transition-colors"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        ))}

        {/* Carousel controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/30 backdrop-blur-sm rounded-full text-foreground hover:bg-background/50 transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/30 backdrop-blur-sm rounded-full text-foreground hover:bg-background/50 transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "w-6 bg-primary" : "bg-foreground/30"
                }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Category Blocks */}
      <section className="px-6 py-16 bg-black">
        <h3 className="text-2xl font-serif text-white text-center mb-10 flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-[#D4AF37]/50" />
          Categorías Destacadas
          <span className="w-12 h-px bg-[#D4AF37]/50" />
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <Link
            href="/sellados?category=diseñador"
            className="group relative aspect-[4/3] rounded-lg overflow-hidden block border border-zinc-800/50 hover:border-[#D4AF37]/50 transition-colors"
          >
            <Image
              src="/perfume-diseñador.jpeg"
              alt="Perfumería de Diseñador"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h4 className="text-xl font-serif text-white mb-1">Perfumería de Diseñador</h4>
              <p className="text-sm text-zinc-300">Jean Paul Gaultier, Valentino, Rabanne</p>
            </div>
          </Link>

          <Link
            href="/sellados?category=árabe"
            className="group relative aspect-[4/3] rounded-lg overflow-hidden block border border-zinc-800/50 hover:border-[#D4AF37]/50 transition-colors"
          >
            <Image
              src="/perfume-arabe.jpeg"
              alt="Perfumería Árabe"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h4 className="text-xl font-serif text-white mb-1">Perfumería Árabe</h4>
              <p className="text-sm text-zinc-300">Lattafa, Armaf, Rasasi</p>
            </div>
          </Link>

          <Link
            href="/sellados?category=nicho"
            className="group relative aspect-[4/3] rounded-lg overflow-hidden block border border-zinc-800/50 hover:border-[#D4AF37]/50 transition-colors"
          >
            <Image
              src="/perfume-lujo.jpeg"
              alt="Perfumería Exclusiva"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h4 className="text-xl font-serif text-white mb-1">Exclusivos y Nicho</h4>
              <p className="text-sm text-zinc-300">Tom Ford y selecciones especiales</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 border-t border-border">
        <div className="px-4 mb-6 flex items-center justify-between">
          <h3 className="font-serif text-2xl text-foreground">Más Vendidos</h3>
          <Link
            href="/catalog"
            className="text-sm text-[#D4AF37] hover:underline"
          >
            Ver todos
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
          {bestSellers.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex-shrink-0 w-40 text-left group"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-zinc-900 mb-3 border border-[#D4AF37]/20 flex items-center justify-center p-2 group-hover:border-[#D4AF37]/60 transition-colors">
                <Image src={(product as any).imagenes["3ml"]} fill alt={product.nombre} className="object-contain p-2" />
              </div>
              <h4 className="text-sm font-medium text-white truncate">
                {product.nombre}
              </h4>
              <p className="text-xs text-zinc-400 mb-1">{product.marca}</p>
              <p className="text-sm text-[#D4AF37]">
                Desde {formatPrice(product.precios["3ml"])}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-12 px-4 border-t border-border bg-card">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-1">100% Originales</h4>
            <p className="text-sm text-muted-foreground">
              Productos auténticos garantizados
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-1">Envíos a Todo el País</h4>
            <p className="text-sm text-muted-foreground">
              Llegamos a donde estés
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-1">Extracción Estéril</h4>
            <p className="text-sm text-muted-foreground">
              Proceso profesional y seguro
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border flex flex-col items-center gap-6">
        <a
          href="https://www.instagram.com/aromaasdecants/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors"
        >
          <Instagram className="w-5 h-5" />
          <span className="text-sm tracking-[0.2em] uppercase font-semibold">@aromaasdecants</span>
        </a>
        <p className="text-xs text-muted-foreground text-center">
          © 2026 AromaasDecants. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  )
}
