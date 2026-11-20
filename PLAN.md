# PLAN — Sitio web EVOLVE Inmobiliaria & Constructora

Línea 1 (tipo, `design-taste-frontend` §1): **service** · page type `service` · site-kind `other` · kind `service`.
Una inmobiliaria y constructora: se contrata a personas. Mandan las fotografías reales de los inmuebles, tipografía y color plano. Sin shaders, escenas, grounds CSS ni loops.

Línea 2 (deal, ejecutado con los scripts de la skill, historial en `.taste-skill/`):
- **Paleta:** las tres repartidas para "agency" (stone-blueprint, sky-sand, swap-pastels) chocan con el logo y con la paleta pedida → regla de la skill: `start.mjs brand` con los colores propios del cliente. Verde pino sobre crema: es el color del logo y de la vegetación que rodea casi todo el catálogo (sabana de Bogotá, Cota, Cajicá).
- **Tipografía:** la 1.ª repartida (Manrope, solo sans) no cumple "serif para titulares" del brief → 2.ª: **Newsreader** (display, eje óptico) + **Hanken Grotesk** (texto). Servidas con `next/font/google`.
- **Héroe:** `photo` (fotografía a sangre, texto en caja sólida del color del fondo sobre el lado calmo; en móvil la foto arriba y el texto debajo).
- **Momentos:** 1. `photo-chapters` (Inicio: recorrido por una casa en 4 fotos) · 2. `picture-develops` (ficha y Nosotros: la foto grande "revela" una vez al entrar).
- **Partes:** nav `nav-centre` · footer `footer-columns` · cierre `close-type` · ritmo `dark-band` · botones `solid` · marca: el logo del cliente reemplaza la marca repartida (`dots`).

---

## 1. Hechos (fact sheet)

- **Qué es:** inmobiliaria y constructora con sede en Funza, Cundinamarca. Vende y arrienda casas, apartamentos, bodegas, locales, lotes y edificios; además consultoría técnica, asesoría de proyectos, interventoría y construcción.
- **Para quién:** familias que buscan casa campestre en la sabana; inversionistas que buscan renta (edificios y casas multifamiliares); empresas que necesitan bodega u oficina.
- **Zona:** Funza, Cota, Cajicá, Bogotá y municipios aledaños; además Girardot, Santa Marta y Medellín.
- **Acción principal:** **Escribir por WhatsApp** (311 524 4288). Secundaria: formulario (FormSubmit).
- **Lema:** "Soluciones integrales para invertir, construir y crecer." · "Creamos espacios que transforman hoy y construyen el futuro."
- **Pilares:** Experiencia, Enfoque en el cliente, Calidad, Compromiso.
- **Sin datos (no se inventan):** año de fundación, cifras, testimonios, equipo, obras propias.
- **Límite que se dice una vez:** varios inmuebles no tienen precio publicado → "Precio a consultar".

## 2. Tarjeta de voz (`copy-voice.md`)

```
Voz: asesor directo, de cifras (técnico-seco aplicado a finca raíz)
Pares: exacto, no frío; seguro, no vendedor
Persona: "usted" nunca; "tú" para el comprador (como el sitio anterior), "nosotros" para Evolve
Frases: 8 a 16 palabras; la cifra antes que el adjetivo (908 m² de lote antes que "amplio")
Humor: ninguno
Palabras de la casa: inmueble, ficha, lote, área construida, canon, negociable
Nunca: emojis, hashtags, "oportunidad única", "no te lo pierdas", virtudes sobre nosotros, voseo
```

## 3. Arquitectura

**Stack** (versiones verificadas hoy con `npm view`): Next.js 16.4.6 (App Router) · React 19.3.1 · TypeScript estricto (la versión que pida Next como peer; si TS 7.0.2 no es compatible, la última 5.x/6.x soportada) · Tailwind CSS 4.3.5 · shadcn 4.23.0 · next-cloudinary 7.1.1 · cloudinary 2.11.0 (solo script) · zod 4.6.7 · motion 14.14.0 (solo si un momento lo necesita; preferencia CSS) · lucide-react 1.75.0.

**Salida:** `output: 'export'` (exigido por `design-taste-frontend` para que el checker y el gate corran sobre `out/`; también permite hosting estático barato). Todas las rutas se generan en build con `generateStaticParams`. Imágenes vía loader de Cloudinary (no necesita servidor).

```
src/
  app/
    layout.tsx                 fuentes, header, footer, botón flotante WhatsApp, JSON-LD RealEstateAgent
    page.tsx                   Inicio
    propiedades/page.tsx       Catálogo (filtros en la URL: ?q=&operacion=&tipo=&ciudad=)
    propiedades/[slug]/page.tsx  Ficha (generateStaticParams, generateMetadata, JSON-LD RealEstateListing)
    servicios/page.tsx
    nosotros/page.tsx
    contacto/page.tsx
    not-found.tsx
    sitemap.ts · robots.ts · opengraph-image (portada por ficha vía Cloudinary)
  components/
    site/        Header, MobileMenu, Footer, WhatsAppFab, Logo
    propiedad/   PropertyCard, PropertyGallery, Lightbox, KeyFacts, PriceTag, PropertyVideo, RelatedList, WhatsAppBar
    catalogo/    SearchBox, Filters, ResultsGrid, EmptyState
    home/        Hero, FeaturedRail, PhotoChapters, ServicesSplit, Pillars, CloseCta
    ui/          primitivas shadcn (Button, Sheet si aplica, Label, Input, Textarea, Select)
    forms/       ContactForm
  data/
    propiedades.ts             datos tipados + esquema Zod, validados en build
    medios.json                generado por scripts/subir-cloudinary.mjs
  lib/ whatsapp.ts, filtros.ts, formato.ts (COP), seo.ts
scripts/subir-cloudinary.mjs
public/assets/               kit de la skill (motion.css/js y momentos) copiado como archivos planos
```

**Nota de choque entre brief y skill:** `design-taste-frontend` está pensada para una sola página con anclas (prohíbe `/contacto`). El brief pide rutas propias; gana el brief en estructura. Cada ruta se arma y se verifica como página propia con el checker. Igual con la regla 9 de la skill (sin teléfonos reales, contactos en `.example`): aplica a datos inventados; aquí son datos reales del cliente, se declaran como waiver en `.taste-skill/waivers.json`.

## 4. Modelo de datos

```ts
const Propiedad = z.object({
  slug: z.string(),                       // URL en español, sin números de orden
  titulo: z.string(),                     // "Casa campestre en Cota"
  operacion: z.enum(['venta', 'arriendo']),
  categoria: z.enum(['casa', 'apartamento', 'bodega', 'local', 'lote', 'edificio']),
  estado: z.enum(['disponible', 'vendida', 'arrendada']),
  ubicacion: z.object({ ciudad: z.string(), sector: z.string().optional(), departamento: z.string() }),
  precio: z.object({ valor: z.number(), moneda: z.literal('COP'), negociable: z.boolean(), modalidad: z.enum(['total', 'desde', 'mensual']), iva: z.boolean().optional() }).nullable(),
  datosClave: z.array(z.object({ etiqueta: z.string(), valor: z.string() })),   // área lote, área construida, habitaciones, baños, parqueaderos, niveles
  detalles: z.array(z.string()),
  descripcion: z.string(),                // reescrita en la voz del sitio
  destacada: z.boolean(),
  medios: z.object({ portada: z.string(), fotos: z.array(z.string()), video: z.string().optional() }), // publicIds; ancho/alto/orden vienen de medios.json
  enlaceExterno: z.string().url().optional(), // locales de Medellín (Citrus), si se mantienen
});
```

El WhatsApp de cada ficha: `https://wa.me/573115244288?text=` + "Hola, me interesa el inmueble «{titulo}» ({url})".

## 5. Sistema visual

**Paleta** (tokens impresos por `start.mjs brand`, mapeados a `@theme` de Tailwind v4):

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `--p-bg` | `#f6f6f1` crema | fondo | — |
| `--p-surface` | `#dce7d8` salvia | banda de superficie, chips | — |
| `--p-ink` | `#1b2822` | texto | 14,6:1 sobre crema |
| `--p-muted` | `#56655d` | texto secundario | 5,6:1 sobre crema (AA) |
| `--p-accent` / `--p-action` | `#183e32` pino | botones, enlaces | 11,0:1 sobre crema |
| `--p-inv-bg` | `#1b2822` | `dark-band` y footer | — |
| acento techo | `#d9792b` naranja del logo | solo un detalle: la línea fina del botón WhatsApp activo y el indicador del filtro activo; nunca texto | decorativo |

Todos los pares se validarán con `design-system`/checker (`text-contrast`). Sin modo oscuro: el brief no lo pide y la marca es crema; el logo se valida igual sobre fondo claro (header) y oscuro (footer pino).

**Tipografía:** Plus Jakarta Sans como única fuente: 500 en titulares (tracking 0), 400/500/600 en texto, 16 px mínimo en cuerpo y 16 px en inputs (sin zoom en iOS). Cifras tabulares en precios y datos clave.

**Radio:** `soft`. **Botones:** `solid`, un solo par (primario pino, secundario contorno). **Iconos:** lucide en trazo fino solo para datos clave (m², camas, baños, parqueo) y el logo real de WhatsApp.

**Logo:** los PNG traen gradientes y halo de ruido (el isotipo sobre todo). Plan: redibujar en SVG a mano: isotipo de tres hojas con trazos Bézier y dos o tres tintas planas de la paleta del logo; wordmark "EVOLVE / INMOBILIARIA / CONSTRUCTORA" compuesto como texto vectorizado; el techo con el toque naranja. Dos versiones: color (fondo claro) y crema monocroma (fondo pino). Se compara lado a lado con el PNG antes de usarlo.

**Movimiento** (CSS nativo primero, `prefers-reduced-motion` respetado; nada aparece con el scroll salvo los momentos repartidos):
- Entrada del héroe una vez (`data-enter`): la caja de texto sube 12 px y la foto se asienta de 1,04 a 1.
- Capa hover de la skill: tarjeta enlazada sube 2 px, foto escala 1,03 dentro del marco, botones ceden al presionar, subrayados que se dibujan.
- View Transitions entre catálogo y ficha: la portada de la tarjeta se transforma en la foto principal de la ficha (con fallback sin transición).
- Momento 1 `photo-chapters` (Inicio), momento 2 `picture-develops` (Nosotros y la foto principal de la ficha).

## 6. Páginas por pantallas (1440×900; móvil entre paréntesis)

**Inicio** (`/`)
1. `hero` — héroe `photo`: Casa campestre en Cota a sangre. H1: "Casas, bodegas y lotes en la sabana de Bogotá" (nombra categoría y lugar). Dato duro: "15 inmuebles publicados en Funza, Cota, Cajicá, Bogotá y 4 ciudades más". Botones: "Ver propiedades" / "Escribir por WhatsApp". Buscador compacto debajo del lead (campo + operación). 1 pantalla.
2. `destacadas` — 6 tarjetas (3×2; móvil 1 columna con scroll-snap horizontal). Foto 4:3, operación, ciudad, título, precio o "Precio a consultar", 3 datos clave. 1–2 pantallas.
3. `recorrido` — **momento photo-chapters**: cuatro fotos de la casa de Cota (fachada, sala con chimenea a doble altura, escalera, vista aérea) con número y dos líneas de dato cada una; termina en "Ver la ficha". 3–4 pantallas.
4. `servicios` — **dark-band**: inmobiliarios (6) y construcción (4) como dos listas, cada una junto a una foto real del catálogo (bodega AEPI con estantería / obra = foto de bodega Fontibón en adecuación). 1–2 pantallas.
5. `pilares` — los cuatro pilares como filas de texto con una foto (interior de Cajicá). 1 pantalla.
6. `cierre` (`close-type`) — "¿Buscas inmueble o quieres vender el tuyo?" + botón grande "Escribir por WhatsApp". Footer `footer-columns`.

**Catálogo** (`/propiedades`): cabecera corta con conteo, búsqueda que filtra mientras escribes (sin recarga, `?q=` en la URL), filtros chip para operación, tipo y ciudad (en móvil dentro de un panel), rejilla de tarjetas, estado vacío útil ("Ningún inmueble coincide con «x». Quita un filtro o escríbenos: buscamos por ti") con botón de limpiar y CTA a WhatsApp. Los inmuebles vendidos al final (si se mantienen).

**Ficha** (`/propiedades/[slug]`): foto principal grande (momento picture-develops) + mosaico de 4; "Ver las N fotos" abre el lightbox; título, ubicación, precio; datos clave en rejilla escaneable; descripción; detalles; video si existe; ubicación por texto (barrio y ciudad, sin dirección exacta, sin mapa: no hay coordenadas confirmadas); barra fija inferior en móvil y tarjeta pegajosa en escritorio con "Escribir por WhatsApp" (mensaje prellenado con el nombre); 3 relacionadas (misma categoría o ciudad).

**Lightbox:** `<dialog>` nativo con `showModal()` (foco atrapado, Esc, botón atrás en Android vía `closedby`), carril con `scroll-snap` para swipe, flechas y teclado ←/→, contador "3 / 10", alt descriptivo por foto, bloqueo de scroll del fondo. Fallback de `closedby` donde no exista.

**Servicios** (`/servicios`), **Nosotros** (`/nosotros`) — páginas cortas: texto del brochure reescrito, pilares, zonas que atiende, cierre a WhatsApp. **Contacto** (`/contacto`): datos (WhatsApp, correo, Funza), formulario FormSubmit vía `fetch` con `Accept: application/json`, validación tras interacción (`:user-invalid` + `aria-invalid`), honeypot `_honey`, estados enviando / enviado / error, autocomplete correcto.

## 7. Piezas de terceros

Ninguna pieza de Aceternity, Magic UI ni React Bits: todas sus piezas candidatas (marquees, spotlight, beams, shimmer, globos) caen en el filtro "SaaS de IA" de la skill. De shadcn/ui solo primitivas: Button, Input, Textarea, Label, Select nativo estilizado, Sheet para el panel de filtros en móvil (o `<dialog>` si la guía `navigation-drawer` lo respalda, que es lo esperado). Del kit de la skill: `motion.css/js` (capa hover y entrada) y los dos momentos, copiados a `public/assets` sin editarlos. Todo queda documentado en `REPORTE.md`.

## 8. Medios y Cloudinary

1. `_fotos-originales/` (Drive) es la fuente principal; `_extraidas/` (del HTML anterior) cubre lo que falte, sobre todo AEPI, Siberia y el video de Bogotá.
2. Se descartan: duplicados (Casa Funza tenía una foto repetida), capturas de pantalla con flechas de carrusel, fotos con objetos personales en primer plano, fotos borrosas.
3. `scripts/subir-cloudinary.mjs`: idempotente (consulta `resources` por `public_id` antes de subir; `overwrite: false`), sube a `evolve/<slug>/NN`, sube el video como `resource_type: video`, escribe `src/data/medios.json` con `publicId`, `width`, `height`, `orden`. Credenciales solo en `.env.local`.
4. Portada del video de Bogotá: un fotograma limpio extraído con ffmpeg.

## 9. Propiedades y portadas

Hoja de portadas: `_revision/portadas-propuestas.jpg` (numeración igual a la tabla). Hojas completas por inmueble: `_revision/hoja-*.jpg` (la foto N es la N-ésima de izquierda a derecha y de arriba abajo).

Fuente: **D** = Drive (`_fotos-originales/<carpeta>`), **H** = extraída del HTML anterior (`_extraidas/<carpeta>`). Drive y el HTML traen las mismas fotos; Drive gana porque Edificio y Bodega Fontibón llegan en 2160 px.

| # | slug | Inmueble | Operación · tipo | Precio público | Fuente · fotos útiles | Portada propuesta | Descartes |
|---|---|---|---|---|---|---|---|
| 1 | `casa-campestre-cota-el-abra` | Casa campestre, vereda El Abra, Cota | venta · casa | Precio a consultar | D `COTA` · 10 | Fachada de vidrio sobre el jardín (01). **También héroe del Inicio** | — |
| 2 | `casa-lote-funza` | Casa lote sobre vía comercial, Funza | venta · lote | Precio a consultar | D `Lote` · 6 | Frente del lote con reja y cielo (01 de `hoja-03`) en lugar de la 07 que aparece en la hoja de portadas | la 07 muestra un cartel "SE VENDE" con teléfonos ajenos (sale de portada y de galería); 03 y 06 traen flecha de carrusel (se recortan) |
| 3 | `casa-tres-niveles-girardot` | Casa de tres niveles, Ciudad Montes, Girardot | venta · casa | $190.000.000 negociables | H `07-casa-girardot` · 8 | Fachada verde con portones (01) | 04/05 casi idénticas: queda una |
| 4 | `bodegas-arriendo-600-m2` | Bodegas y espacios industriales desde 600 m² | arriendo · bodega | Desde $12.000.000 + IVA al mes | D `Bodega 1` · 10 | Fachada de ladrillo y vidrio (01) | — |
| 5 | `casa-campestre-cajica` | Casa campestre a 5 min del centro, Cajicá | venta · casa | Precio a consultar | D `Cajica` · 8 | Fachada con ciprés (01, recortada a la izquierda por la flecha de carrusel) | 08 (comedor) trae una miniatura pegada en la esquina |
| 6 | `casa-funza-conjunto` | Casa de 3 niveles en conjunto, Funza | venta · casa · **vendida** | — | D `Casa funza co` · 6 | Fachada de ladrillo (01) | 06 duplicada de 02 |
| 7 | `edificio-multifamiliar-usaquen` | Edificio de 6 apartaestudios, San Cristóbal Norte | venta · edificio | $946.278.000 | D `Edificio` · 9 | Fachada (01) | — |
| 8 | `apartamento-kuali-santa-marta` | Apartamento esquinero piso 16, Edificio Kuali, Irotama | venta · apartamento | Precio a consultar | D `Casa santa marta` · 8 | Vista al mar desde el balcón (01) | 03/04 balcón casi iguales: queda una |
| 9 | `bodega-esquinera-fontibon` | Bodega esquinera con oficinas, Fontibón | venta · bodega | Precio a consultar | D `BODEGA` · 9 | Nave con columnas (01) | 02 (puerta de bóveda) débil como portada, queda en galería |
| 10 | `casa-multifamiliar-suba` | Casa multifamiliar de 4 pisos, Suba Bilbao, Bogotá | venta · casa | $450.000.000 negociables | H video 97 s, 480×854 | Fotograma del video (escalera). **Débil**: pedir fotos | sin fotos; galería = video + 2–3 fotogramas limpios |
| 11 | `bodega-parque-industrial-aepi-cota` | Bodega No. 2, Parque Industrial AEPI, Cota | venta · bodega | Precio a consultar | H `10-bodega-aepi` · 16 | Fachada panorámica (01, 1024 px) | 3 vistas de vía casi iguales; fotos de 2012 con fecha impresa (se recorta donde se pueda) |
| 12 | `apartamento-siberia-cota` | Apartamento de 2 habitaciones, sector Siberia, Cota | venta · apartamento | Precio a consultar | D `Hogar Cota` · 9 | Fachada esquinera (hoja 12) | **todas con marca de agua de Metrocuadrado** (ver pregunta) |
| 13–15 | `local-esquinero-mall-poblado`, `local-milla-de-oro`, `local-santafe-oviedo` | 3 locales en El Poblado, Medellín | venta · local | $5.700.000.000 · $3.770.000.000 · $3.300.000.000 | sin fotos | sin portada (ver pregunta) | — |
| ? | — | Drive "Casa": casa de 3 pisos, fachada crema y turquesa | ? | ? | D `Casa` · 9 | hoja 13 | **no está en el HTML anterior: sin datos** |
| ? | — | Drive "Casa comercial": esquinera azul de 3 pisos | ? | ? | D `Casa comercial` · 8 | hoja 14 (personas en la acera: se cambiaría) | **no está en el HTML anterior: sin datos** |

Calidad: ninguna foto llega a 1920 px de ancho (la mejor del héroe, Cota 01, tiene 1600). Cloudinary no debe ampliarla: el héroe se sirve a 1600 máx. con `c_limit` y se acepta ese tope en pantallas grandes (o se pide un original más grande de la casa de Cota).

## 10. Calidad y verificación por fase

Por fase: `npm run build && npm run lint && npm run typecheck`; capturas 390/768/1440 con `shoot.mjs` en `shots/<fase>/`; `copy-lint`, `consistency`, `check.mjs`, `perf.mjs` y `gate.mjs` sobre `out/`; Lighthouse móvil con chrome-devtools. Objetivos: LCP < 2,0 s, CLS < 0,05, Lighthouse ≥ 95 en las cuatro categorías, WCAG 2.2 AA.

Fases y commits: (1) base y sistema visual → (2) datos y medios en Cloudinary → (3) catálogo y ficha → (4) inicio, nosotros, servicios y contacto → (5) SEO y rendimiento. `REPORTE.md` se actualiza al cierre de cada una.
