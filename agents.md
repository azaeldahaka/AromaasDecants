# AromaasDecants - Project Context & Rules

## 1. Resumen del Proyecto (Project Overview)
- **Nombre:** AromaasDecants
- **Nicho:** E-commerce de perfumería de lujo (Decants y Perfumes Sellados).
- **Objetivo:** Ofrecer una experiencia de usuario rápida, elegante y orientada a la conversión móvil, con un flujo de checkout que finaliza en WhatsApp.

## 2. Stack Tecnológico (Tech Stack)
- **Framework:** Next.js (App Router).
- **Lenguaje:** TypeScript / React.
- **Estilos:** Tailwind CSS.
- **Despliegue:** Vercel.

## 3. Arquitectura de Datos (Data Flow)
- No se utiliza base de datos externa por el momento.
- Toda la información del catálogo se maneja de forma local y estática mediante archivos JSON (`src/data/productos.json` y `src/data/sellados.json`).
- Las imágenes dinámicas (3ml, 5ml, 10ml) se alojan estrictamente en la carpeta `/public/Fotos Perfumes/` y se referencian de forma absoluta en los JSON.

## 4. Guía de Estilo y UI/UX (Design System)
- **Tema:** Luxury Dark Mode (Fondos oscuros, negros profundos).
- **Acentos:** Tonos dorados (Hex `#D4AF37` o similares) para botones activos, bordes y llamados a la acción (CTAs).
- **Mobile-First:** Todos los componentes deben ser completamente responsivos. Especial cuidado en no solapar elementos en el Header (Logo + Texto + Iconos).
- **Limpieza:** Evitar paddings excesivos (mantener `pt-20` como estándar global superior).

## 5. Reglas Inquebrantables de Trabajo (Workflow & Git Flow)
- **Rama Principal:** `main` es sagrada y está conectada a producción en Vercel.
- **Prohibición:** TIENES ESTRICTAMENTE PROHIBIDO hacer commits, push o trabajar directamente en la rama `main`.
- **Desarrollo:** Toda nueva funcionalidad (feature), corrección (fix) o refactorización (chore) debe hacerse en una rama nueva (`feature/nombre-de-tarea`) partiendo de `main`.
- **Integración:** Solo se realizará el merge a `main` cuando la tarea esté completa y el usuario (Tech Lead) dé la orden explícita.
