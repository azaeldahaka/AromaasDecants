"use client"

import { Award, Droplets, Users } from "lucide-react"

const guarantees = [
  {
    icon: Award,
    title: "100% Originales Importados",
    description: "Todas nuestras fragancias son auténticas, importadas directamente de distribuidores autorizados."
  },
  {
    icon: Droplets,
    title: "Extracción Estéril",
    description: "Utilizamos jeringas descartables y materiales nuevos para cada extracción."
  },
  {
    icon: Users,
    title: "Asesoramiento Personalizado",
    description: "Te ayudamos a encontrar la fragancia perfecta según tu estilo y preferencias."
  }
]

export function AboutView() {
  return (
    <div className="min-h-screen bg-background pt-16 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <header className="py-12 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
            Nuestra Historia
          </h1>
          <div className="w-16 h-px bg-primary mx-auto" />
        </header>

        {/* Story Section */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Todo comenzó como una idea entre primos apasionados por las fragancias. 
              Nuestra misión es democratizar el acceso a la alta perfumería, permitiendo 
              que más personas puedan probar y variar sus perfumes a un costo accesible 
              y razonable.
            </p>
          </div>
        </section>

        {/* Guarantees Section */}
        <section>
          <h2 className="font-serif text-xl md:text-2xl text-foreground text-center mb-8">
            Nuestras Garantías
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guarantees.map((guarantee, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <guarantee.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2 text-sm">
                  {guarantee.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {guarantee.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer decoration */}
        <div className="mt-16 text-center">
          <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center mx-auto">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
