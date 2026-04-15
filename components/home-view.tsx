"use client"

import { ChevronLeft, ChevronRight, Shield, Truck, Sparkles } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { useStore, products } from "@/lib/store-context"

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=800&fit=crop",
    title: "Fragancias de Lujo",
    subtitle: "Descubre el arte de la perfumería"
  },
  {
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&h=800&fit=crop",
    title: "Perfumería de Diseñador",
    subtitle: "Las mejores marcas al mejor precio"
  },
  {
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=1200&h=800&fit=crop",
    title: "Perfumería Árabe",
    subtitle: "Aromas exóticos y duraderos"
  }
]

export function HomeView() {
  const { setCurrentView, setSelectedProduct, setCurrentCategory } = useStore()
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

  const handleProductClick = (product: typeof products[0]) => {
    setSelectedProduct(product)
    setCurrentView("product")
  }

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category)
    setCurrentView("catalog")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  const bestSellers = products.slice(0, 5)

  return (
    <div className="pt-16">
      {/* Hero Carousel */}
      <section className="relative h-[70vh] min-h-[400px] max-h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
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
              <button
                onClick={() => setCurrentView("catalog")}
                className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Ver Catálogo
              </button>
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
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "w-6 bg-primary" : "bg-foreground/30"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Category Blocks */}
      <section className="px-4 py-12">
        <h3 className="text-center font-serif text-2xl text-foreground mb-8">
          Explora Nuestras Colecciones
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <button
            onClick={() => handleCategoryClick("designer")}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=450&fit=crop"
              alt="Perfumería de Diseñador"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h4 className="text-xl font-serif text-foreground mb-1">Perfumería de Diseñador</h4>
              <p className="text-sm text-muted-foreground">Creed, Tom Ford, Chanel y más</p>
            </div>
          </button>

          <button
            onClick={() => handleCategoryClick("arabic")}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=450&fit=crop"
              alt="Perfumería Árabe"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h4 className="text-xl font-serif text-foreground mb-1">Perfumería Árabe</h4>
              <p className="text-sm text-muted-foreground">Al Haramain, Lattafa, Armaf</p>
            </div>
          </button>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 border-t border-border">
        <div className="px-4 mb-6 flex items-center justify-between">
          <h3 className="font-serif text-2xl text-foreground">Más Vendidos</h3>
          <button
            onClick={() => setCurrentView("catalog")}
            className="text-sm text-primary hover:underline"
          >
            Ver todos
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
          {bestSellers.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="flex-shrink-0 w-40 text-left group"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h4 className="text-sm font-medium text-foreground truncate">
                {product.name}
              </h4>
              <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
              <p className="text-sm text-primary">
                Desde {formatPrice(product.variants[0].price)}
              </p>
            </button>
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
      <footer className="py-8 px-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          © 2024 AromaasDecants. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  )
}
