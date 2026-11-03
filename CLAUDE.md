# wcurrents web — notas para Claude

Contexto y arquitectura: ver `README.md`. Este archivo guarda decisiones y pendientes que no van en el README.

## Analítica (pendiente de decisión)

- Conectado: Vercel Web Analytics (`<Analytics />` en `src/layouts/Base.astro`, solo en producción). Plan Hobby: solo páginas vistas, 50.000 eventos/mes, 1 mes de historial, sin eventos personalizados ni UTM.
- Preparado pero inactivo: `src/lib/analytics.ts` expone `track(evento, props)`, llamado desde WhatsApp y el cotizador (`whatsapp_click`, `cotizador_paso {paso}`, `cotizador_enviado`, `cotizador_error`). Llama a `window.plausible` / `window.clarity` si existen; `Base.astro` los carga solo en producción con `PUBLIC_PLAUSIBLE_DOMAIN` / `PUBLIC_CLARITY_ID`.
- Objetivo del cliente: saber qué componentes se interactúan más. **No se quieren mapas de calor** (Clarity sobra y puede eliminarse).
- Opciones evaluadas: Umami (autoalojado o Cloud con plan gratis; verificar límite), GoatCounter, Plausible (de pago, ~US$9/mes), o un endpoint propio `/api/track` con base gratuita (Vercel no tiene disco persistente: un JSON no sirve). Decisión postergada; no insistir.
- Regla fija: nunca enviar datos personales como propiedades de un evento.

## Decisiones de diseño

- Paleta del sitio: **marino** (la única vigente). Ink cálido y las demás paletas `data-palette` son bocetos solo de desarrollo; el cliente (César) las vio y decidió quedarse con el marino.
- Claro/oscuro: lo decide el dispositivo (`prefers-color-scheme`), sin botón. Oscuro por defecto; las secciones listadas en `global.css` (hero, método, proyectos, cotizador, pie, barra) quedan siempre oscuras. Ver README §11.
- Texto de WhatsApp: "Consulte a un ejecutivo por WhatsApp" (no "ingeniero").

## SEO (pendiente fuera del código)

- Objetivo del cliente: aparecer por "wcurrents / w-currents" y por búsquedas genéricas (empresa de corrientes débiles, cableado estructurado, CCTV, ingeniería para infraestructura). La marca es fácil; las genéricas toman meses.
- Falta, y depende de wcurrents: Google Search Console, Google Business Profile (negocio de área de servicio si no hay oficina; verificación), reseñas y enlaces externos. Si entregan perfiles sociales o dirección, agregarlos a `sameAs`/`address` en el JSON-LD de `index.astro`; no inventarlos.
- Posible siguiente paso: páginas propias `/servicios/cctv` y `/servicios/cableado-estructurado`, con contenido revisado por un ingeniero.

## Reglas del proyecto

- Español de Chile, trato de "usted" en el sitio. wcurrents es una empresa de ingeniería (corrientes débiles); la minería es solo el sector cliente.
- Terracota (`--color-terra`) solo para CTA y alertas.
- No enviar correos reales en pruebas; la clave de Resend vive solo en `.env` / variables del hosting.
