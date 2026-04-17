export default function SpecialRequestsPage() {
  return (
    <div className="pt-32 pb-16 px-4 md:px-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-serif text-[#D4AF37] mb-6 tracking-wide">Pedidos Especiales</h1>
      <p className="text-zinc-300 mb-10 leading-relaxed text-lg">
        Completa el formulario para solicitar cotizaciones de perfumes de diseñador, árabes o nicho en su <strong className="text-white">presentación sellada original</strong>. 
        Te contactaremos con la disponibilidad y precio exacto a la brevedad.
      </p>

      <form action="https://formsubmit.co/aromaasdecants@gmail.com" method="POST" className="space-y-6 bg-zinc-950 p-6 sm:p-10 rounded-2xl border border-[#D4AF37]/20 shadow-xl">
        
        {/* Parametros ocultos de FormSubmit */}
        <input type="text" name="_honey" style={{ display: "none" }} />
        <input type="hidden" name="_subject" value="Nuevo Pedido Especial - AromaasDecants" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Tu Nombre</label>
            <input type="text" name="nombre" required className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Ej. Juan Pérez" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Tu Email</label>
            <input type="email" name="email" required className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="correo@ejemplo.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Marca del Perfume</label>
            <input type="text" name="marca" required className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Ej. Tom Ford" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Nombre Exacto</label>
            <input type="text" name="perfume" required className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Ej. Ombre Leather EDP" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Tamaño y Detalles Adicionales</label>
          <textarea name="detalles" rows={4} required className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Quisiera cotizar la versión sellada de 100ml. También me interesa saber si tienen..."></textarea>
        </div>

        <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold py-4 text-lg uppercase tracking-widest rounded-lg hover:bg-[#D4AF37]/90 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] mt-4">
          Enviar Solicitud
        </button>
      </form>
    </div>
  )
}
