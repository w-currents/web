# wcurrents · Sitio web

Sitio institucional de **wcurrents**, empresa chilena de ingeniería de corrientes débiles y sistemas críticos (protección contra incendios, automatización, telecomunicaciones, seguridad electrónica e instrumentación). Su principal sector cliente es la minería, pero wcurrents es una empresa de ingeniería, no una minera.

Dominio: <https://w-currents.cl>

Este documento tiene dos partes: las secciones 1 a 4 explican el proyecto en términos generales y pueden leerse sin conocimientos técnicos; de la 5 en adelante es referencia para quien mantenga el código.

---

## 1. Qué es y para qué sirve

El sitio tiene un solo objetivo: que una persona de una minera, de una empresa de energía o de una constructora entienda en pocos segundos **qué hace wcurrents, que es confiable y cómo pedir una cotización**.

Se compone de:

- **Página principal** (`/`), con las secciones: Inicio, Empresa, Servicios, Método, Proyectos, Certificaciones y Contacto/Cotizador.
- **Una página por servicio** (`/servicios/<nombre>`), 6 en total. Existen para que cada disciplina pueda encontrarse en Google por separado.
- **Formulario de cotización** de 3 pasos, que envía la solicitud por correo a la persona encargada.
- **Botón de WhatsApp** flotante.

Es un sitio **estático**: las páginas se generan una vez al publicar y se sirven ya armadas. Esto lo hace rápido, barato de mantener y bueno para SEO. La única parte que corre en un servidor es el envío del formulario (`/api/contact`).

---

## 2. Apego a la marca

La marca está definida en el brandbook de wcurrents. El sitio la respeta así:

| Elemento | Definición de marca | Dónde vive en el código |
|---|---|---|
| Azul base (fondos) | `#1B3B4F` navy · `#0F2431` deep · `#0E091C` Ink Black | `src/styles/global.css` (`--color-navy`, `--color-deep`, `--color-ink`) |
| Cerulean | `#006986`, color de marca para rellenos y estados activos | `--color-cer` |
| Pacific Blue / hielo | `#70ABBE` y `#9fd0e0`, acentos de texto y bordes | `--color-pac`, `--color-ice` |
| Plata y hueso | `#BAC6C9` y `#E8DFD2`, neutros | `--color-silver`, `--color-bone` |
| Terracota | `#8F2A1C`, **solo para llamadas a la acción (CTA) y alertas** | `--color-terra` |
| Tipografía de texto | Inter Tight | `public/fonts/InterTight.woff2` |
| Tipografía técnica | Roboto Mono, para etiquetas y datos | `public/fonts/RobotoMono.woff2` |
| Isotipo y wordmark | Logos oficiales | `public/img/isotipo.png`, `public/img/wordmark.png` |
| Patrón de líneas | Patrón de la marca sobre paneles oscuros | `public/img/pattern.png` |

Notas:

- La tipografía de titulares de la marca (**Britti Sans**) solo está disponible en licencia de prueba, así que el sitio usa **Inter Tight** como sustituta. Si se adquiere la licencia, se cambia en `global.css`.
- Dirección visual elegida, llamada "híbrido técnico": base clara/técnica, paneles oscuros con el patrón de líneas, etiquetas en Roboto Mono y terracota solo en acciones.
- Tono de redacción: español de Chile, trato formal de **usted**, lenguaje de ingeniería sin exageraciones.

---

## 3. Experiencia del visitante

- **Animación del hero:** un "lazo de control" muestra el principio del negocio: ocurre un evento en planta (humo, pérdida de alimentación, acceso no autorizado), el centro de control wcurrents lo procesa y el sistema responde. Respeta la preferencia de "reducir movimiento" del dispositivo.
- **Responsive:** el sitio se adapta a celular, tablet y escritorio. El lazo del hero tiene una versión móvil propia.
- **Cotizador:** el visitante elige disciplinas, indica sector y plazo, y deja sus datos. Los campos validan lo que se escribe (teléfono chileno, correo, nombre).
- **Accesibilidad:** componentes de Radix UI (acordeones, menús, diálogos) con soporte de teclado y lectores de pantalla, enlaces con foco visible y movimiento reducido.

---

## 4. SEO (prioridad máxima)

El sitio está pensado para aparecer en Google cuando una empresa busque estos servicios en Chile.

- **Una página por servicio**, cada una con su propio título, descripción, `canonical`, imagen para redes (OG 1200×630) y un solo `h1`.
- **"Corrientes débiles"** está incorporado en títulos, descripciones y textos, junto con una pregunta frecuente específica en cada servicio.
- **Portada:** título y descripción con "ingeniería de corrientes débiles", cableado estructurado, CCTV e infraestructura crítica.
- **Enlaces internos:** las seis páginas de servicio se enlazan desde el pie de página y desde cada disciplina de la sección Servicios.
- **Datos estructurados (JSON-LD):** en la portada `Organization` (nombre alternativo "w-currents", contacto, ciudad, `knowsAbout`) y `WebSite`; en cada servicio `Service`, `BreadcrumbList` y `FAQPage`.
- **`sitemap-index.xml`** generado automáticamente y **`robots.txt`**.
- HTML estático, imágenes en WebP, fuentes propias precargadas y JavaScript solo donde hace falta.

Pendientes de SEO que dependen de wcurrents (no de código): alta en **Google Search Console**, ficha de **Google Business Profile** (verificación, fotos, reseñas), enlaces desde otros sitios y revisión técnica del contenido por un ingeniero. Posible ampliación: páginas propias de CCTV y cableado estructurado.

---

## 5. Tecnologías

| Capa | Tecnología | Para qué |
|---|---|---|
| Framework | **Astro 7** (salida estática) | Genera las páginas; solo hidrata lo interactivo |
| Interfaz | **React 19** (islas de Astro) | Componentes interactivos |
| Lenguaje | **TypeScript** | Tipado en todo el código |
| Estilos | **Tailwind CSS v4** | Estilos con los colores de marca como variables |
| Animación | **Motion** (antes Framer Motion) y **Lenis** | Animaciones y scroll suave |
| Componentes accesibles | **Radix UI**, **embla-carousel**, **lucide-react** | Acordeón, menú, diálogo, tooltip, carrusel, íconos |
| Estado compartido | **nanostores** | Comunicar islas entre sí (servicio activo, selección del cotizador) |
| Formularios | **react-hook-form** + **zod** | Formulario y validación, la misma en navegador y servidor |
| Correo | **Resend** | Envío de las solicitudes |
| Despliegue | **Vercel** (`@astrojs/vercel`) | Publicación; el adaptador está aislado y se puede cambiar |
| Analítica | **Vercel Web Analytics** | Páginas vistas (ver nota de la sección 8)* |
| Pruebas | **Vitest** | Pruebas del envío del formulario y de los campos |

---

## 6. Arquitectura

### Estructura del repositorio

```
src/
├─ pages/
│  ├─ index.astro            Página principal (compone todas las secciones)
│  ├─ servicios/[slug].astro Una página por servicio (SEO, FAQ, JSON-LD)
│  └─ api/contact.ts         Único endpoint de servidor (formulario)
├─ features/                 Una carpeta por sección del sitio
│  ├─ nav · hero · lazo · empresa · servicios · metodo
│  ├─ proyectos · certificaciones · cotizador · footer · whatsapp
│  └─ dev/Paleta.tsx         Selector de paletas, solo en desarrollo
├─ components/
│  ├─ ui/                    Piezas reutilizables (botón, revelado, textos animados…)
│  └─ seo/Seo.astro          Etiquetas SEO y JSON-LD
├─ layouts/Base.astro        HTML base, analítica y scroll suave
├─ content/site.ts           Textos de servicios, proyectos y contacto
├─ config/site.ts            Dominio, título y descripción por defecto
├─ lib/                      Utilidades: esquema del formulario, campos, analítica, estado
├─ server/                   Lógica de correo (sin Astro; es lo que se prueba)
└─ styles/global.css         Colores de marca, tipografías y sombras
public/                      Fuentes, imágenes WebP/PNG, imágenes OG, robots.txt
scripts/                     generate-og.py (imágenes OG), preview-mail.ts (vista del correo)
tests/                       Pruebas con Vitest
```

### Principios

1. **Estático primero.** Cada página se genera al construir. Solo `/api/contact` corre en servidor (`prerender = false`).
2. **Islas.** Cada sección de React se carga cuando hace falta (`client:visible`, `client:idle`), así el navegador descarga menos JavaScript al inicio.
3. **Contenido separado del diseño.** Los textos de servicios, proyectos y contacto están en `src/content/site.ts`; modificarlos no exige tocar componentes. Los datos de contacto (nombre, correo, teléfono, WhatsApp) están en `CONTACT` de ese mismo archivo.
4. **Una sola validación.** El esquema `zod` (`src/lib/contact-schema.ts`) se usa en el navegador y en el servidor; el servidor nunca confía en lo que llega.
5. **Lógica de servidor aislada.** `src/server/contact.ts` no depende de Astro ni de la red (el envío entra como `Mailer`), por lo que se prueba sin enviar correos reales.

### Flujo del formulario

```
Visitante → Cotizador (3 pasos, validación en navegador)
         → POST /api/contact
              ├─ límite por IP (5 intentos / 10 min, en memoria)
              ├─ validación zod
              ├─ honeypot: si el campo oculto viene lleno, responde "ok" sin enviar
              └─ Resend → correo a CONTACT_TO (reply-to = correo del visitante)
```

---

## 7. Puesta en marcha

Requisitos: Node 22 o superior y npm.

```bash
npm install
cp .env.example .env     # completar RESEND_API_KEY
npm run dev              # servidor local con recarga en caliente
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Verifica tipos (`astro check`) y construye el sitio |
| `npm run preview` | Sirve localmente el resultado del build |
| `npm test` | Ejecuta las pruebas (Vitest) |

### Variables de entorno

| Variable | Descripción |
|---|---|
| `RESEND_API_KEY` | Clave de Resend. **Secreta**: va en `.env` local y en las variables del hosting; jamás en el repositorio |
| `CONTACT_TO` | Casilla que recibe las solicitudes (hoy `cdiaz@w-currents.cl`) |
| `CONTACT_FROM` | Remitente. Mientras el dominio no esté verificado en Resend se usa el remitente de prueba, que **solo entrega a la cuenta dueña de Resend** |

Si faltan las tres variables de correo, el formulario responde "Servicio de correo no configurado" en lugar de fallar en silencio.

---

## 8. Analítica*

Las páginas vistas se miden con Vercel Web Analytics, que solo se carga en producción.

\* **Pendiente:** definir cómo medir qué componentes del sitio se usan más. Se decidirá más adelante.

---

## 9. Seguridad y privacidad

- Secretos solo en variables de entorno; `.env` está en `.gitignore` y el repositorio es público.
- Validación del lado del servidor, honeypot y límite por IP. El límite vive en memoria, por lo que en un entorno serverless es de "mejor esfuerzo". Si el formulario recibe spam, el siguiente paso recomendado es **Cloudflare Turnstile**.
- Sin cookies propias ni formularios que guarden datos: las solicitudes solo se envían por correo, no se almacenan.

---

## 10. Pendientes conocidos

- Verificar el dominio en Resend (registros SPF/DKIM) y hacer una prueba real de envío.
- Cargar las variables de entorno en el hosting.
- Alta en Google Search Console y Google Business Profile.
- Validación técnica de los textos por un ingeniero (incluidos los párrafos de corrientes débiles) y de las normas citadas (NCh Elec 4/2003, NCh 2369).
- Logos reales de certificaciones con enlaces a sus fuentes.
- Analítica de interacciones* (ver sección 8).
- Decisión de hosting definitiva, a cargo de wcurrents (el código no depende de un proveedor).
- Obtener licencia de Britti Sans o confirmar Inter Tight como tipografía definitiva.

---

## 11. Notas para quien desarrolle

- Las paletas alternativas (`data-palette="b"` a `"f"`) de `global.css` y el componente `features/dev/Paleta.tsx` vienen de la etapa de bocetos. Solo se muestran en desarrollo (`import.meta.env.DEV`) y no afectan la versión publicada.
- El tema real se define en el bloque `@theme` al inicio de `global.css`; cualquier cambio de color debe hacerse ahí para que se propague.
- **Modo claro/oscuro:** el sitio es marino (oscuro) por defecto y pasa a papel y tinta si el dispositivo pide modo claro (`prefers-color-scheme`, sin botón manual). Es un bloque en `global.css` que redefine los tokens. Hero, Método, Proyectos, Cotizador, pie y barra de navegación (clase `tema-oscuro`) conservan los tokens oscuros. Al agregar colores fijos (`text-white`, hex) en secciones claras, usar tokens, no valores fijos. Para probar sin cambiar el sistema: DevTools → Rendering → *Emulate prefers-color-scheme*. Brave puede forzar el modo en `brave://settings/appearance`.
- Imágenes OG: `scripts/generate-og.py` las regenera.
- Vista previa del correo de cotización: `scripts/preview-mail.ts`.
