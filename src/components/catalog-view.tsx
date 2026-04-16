"use client"

import Image from "next/image"
import { useStore, products, Product } from "@/lib/store-context"

const filters = [
  { id: "todos", label: "Todos" },
  { id: "citricos", label: "Cítricos" },
  { id: "amaderados", label: "Amaderados" },
  { id: "florales", label: "Florales" },
  { id: "orientales", label: "Orientales" },
  { id: "dulces", label: "Dulces" }
]

const categoryLabels: Record<string, string> = {
  todos: "Todos los Productos",
  hombre: "Para Él",
  mujer: "Para Ella",
  unisex: "Unisex",
  ofertas: "Ofertas Especiales",
  designer: "Perfumería de Diseñador",
  arabic: "Perfumería Árabe"
}

export function CatalogView() {
  const { 
    currentCategory, 
    currentFilter, 
    setCurrentFilter, 
    setSelectedProduct, 
    setCurrentView 
  } = useStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(price)
  }

  const filteredProducts = products.filter((product) => {
    // Filter by category
    let categoryMatch = true
    if (currentCategory !== "todos") {
      if (currentCategory === "designer" || currentCategory === "arabic") {
        categoryMatch = product.type === currentCategory
      } else if (currentCategory === "ofertas") {
        categoryMatch = true // Show all for offers, or filter by a discount flag
      } else {
        categoryMatch = product.category === currentCategory
      }
    }

    // Filter by notes
    let notesMatch = true
    if (currentFilter !== "todos") {
      const filterLabel = filters.find(f => f.id === currentFilter)?.label
      if (filterLabel) {
        notesMatch = product.notes.some(
          note => note.toLowerCase() === filterLabel.toLowerCase()
        )
      }
    }

    return categoryMatch && notesMatch
  })

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setCurrentView("product")
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Category Title */}
      <div className="px-4 py-6 border-b border-border">
        <h2 className="font-serif text-2xl text-foreground">
          {categoryLabels[currentCategory] || "Catálogo"}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filter Pills */}
      <div className="px-4 py-4 border-b border-border overflow-x-auto">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setCurrentFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-colors ${
                currentFilter === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-muted-foreground mb-2">No se encontraron productos</p>
            <button
              onClick={() => setCurrentFilter("todos")}
              className="text-sm text-primary hover:underline"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="group text-left"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {currentCategory === "ofertas" && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      -20%
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                <p className="text-sm text-primary font-medium">
                  Desde {formatPrice(product.variants[0].price)}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
