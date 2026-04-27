"use client"

import { ArrowLeft, Droplets, Shield, Beaker, Package, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function DecantInfoView() {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-black overflow-x-hidden">
      {/* Back button */}
      <div className="px-6 py-4 border-b border-[#D4AF37]/20 max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Volver al inicio</span>
        </Link>
      </div>

      {/* Hero */}
      <div className="relative h-64 bg-zinc-900 border-b border-[#D4AF37]/30">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto z-20">
          <h1 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-2 tracking-wide">
            ¿Qué es un Decant?
          </h1>
          <p className="text-zinc-300">Descubre la manera inteligente de coleccionar fragancias.</p>
        </div>
      </div>

      {/* Content */}
      <article className="p-6 space-y-12 max-w-4xl mx-auto mt-8">
        <section>
          <p className="text-zinc-300 leading-relaxed text-lg">
            Un <strong className="text-white">decant</strong> es una muestra de perfume 
            original extraída directamente de la botella del fabricante y transferida a un 
            atomizador más pequeño (3ml, 5ml o 10ml). Es la forma más exclusiva y sensata de probar 
            fragancias de lujo de diseñador y nicho sin comprometerte con el precio de un frasco completo.
          </p>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-2xl font-serif text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[#D4AF37]"></span>
            Beneficios
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-4 p-6 bg-zinc-950 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2 text-lg">Prueba Antes de Invertir</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Conoce cómo se desarrolla la fragancia en tu piel durante el día.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-6 bg-zinc-950 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2 text-lg">Gran Variedad</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Arma una colección diversa y rotativa de fragancias premium.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-6 bg-zinc-950 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2 text-lg">100% Original</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Extracciones clínicas de botellas totalmente originales y verificadas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-2xl font-serif text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[#D4AF37]"></span>
            El Proceso de Extracción
          </h2>
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-zinc-900 border border-[#D4AF37]/20 flex items-center justify-center">
            <Beaker className="w-16 h-16 text-zinc-700" />
          </div>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              En <strong className="text-[#D4AF37]">AromaasDecants</strong> mantenemos un protocolo de extracción de grado clínico:
            </p>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-zinc-400">
              <li>Utilizamos jeringas extractoras estériles para no contaminar la fragancia.</li>
              <li>Atomizadores de vidrio seleccionados para conservar el líquido inerte.</li>
              <li>Sellado con teflón en la rosca para prevenir evaporaciones.</li>
              <li>Etiquetado impecable y packaging seguro.</li>
            </ol>
          </div>
        </section>

        {/* Pedidos Especiales */}
        <section>
          <h2 className="text-2xl font-serif text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-[#D4AF37]"></span>
            Pedidos Especiales / Perfumes Sellados
          </h2>
          <div className="bg-zinc-950 p-6 sm:p-8 rounded-xl border border-[#D4AF37]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Package className="w-32 h-32" />
            </div>
            
            <p className="text-zinc-300 leading-relaxed mb-6 font-medium relative z-10 w-3/4 sm:w-full">
              ¿No encuentras la fragancia que buscas en formato completo o botella sellada? 
              <br />Realizamos <strong className="text-[#D4AF37]">pedidos por encargo</strong> con una red de proveedores directos.
            </p>

            <div className="space-y-4 relative z-10">
              <h4 className="text-white font-semibold">¿Cómo funciona?</h4>
              <ul className="list-disc list-inside text-sm text-zinc-400 space-y-2">
                <li>Cotizamos cualquier perfume de Diseñador, Árabe o Nicho.</li>
                <li>Trabajamos fragancias selladas 100% de fábrica.</li>
                <li>Los tiempos de entrega varían según la disponibilidad e importación.</li>
              </ul>
            </div>

            <div className="mt-8 relative z-10">
              <Link
                href="/special-requests"
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-black font-bold py-3 px-6 rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              >
                Solicitar Cotización Directa
              </Link>
            </div>
          </div>
        </section>

        {/* Contacto Social */}
        <section className="bg-zinc-950 p-6 sm:p-8 rounded-xl border border-[#D4AF37]/20 text-center mb-8">
          <h3 className="text-white font-serif text-xl mb-4">Únete a nuestra comunidad</h3>
          <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">Síguenos en Instagram para enterarte de los últimos ingresos, ofertas exclusivas y novedades sobre la perfumería de nicho.</p>
          <a
            href="https://www.instagram.com/aromaasdecants/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#D4AF37] text-[#D4AF37] font-semibold py-3 px-8 rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all"
          >
            <Instagram className="w-5 h-5" />
            Síguenos en Instagram
          </a>
        </section>

        {/* CTA */}
        <section className="pt-4 pb-12 text-center">
          <Link
            href="/catalog"
            className="w-full sm:w-auto inline-flex items-center justify-center py-4 px-12 bg-white text-black font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
          >
            Explorar Catálogo de Fragancias
          </Link>
        </section>
      </article>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#D4AF37]/20 text-center bg-zinc-950 mt-12">
        <p className="text-sm text-zinc-500 font-serif">
          © 2024 AromaasDecants. La revolución de la alta perfumería.
        </p>
      </footer>
    </div>
  )
}
