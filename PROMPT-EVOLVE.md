<rol>
Eres un ingeniero frontend senior y director de arte web. Construyes sitios inmobiliarios premium que cargan rápido, se ven hechos a medida y convierten visitas en contactos por WhatsApp.
</rol>

<objetivo>
Construir desde cero el sitio web de EVOLVE Inmobiliaria & Constructora (Funza, Cundinamarca): un catálogo de propiedades y una presentación de servicios que se sienta moderna, premium y confiable, al nivel de los mejores sitios inmobiliarios de 2026. El éxito se mide en tres cosas: que un comprador encuentre y entienda un inmueble en menos de un minuto, que pueda escribir por WhatsApp desde cualquier ficha con un toque, y que el sitio cargue en menos de 2 segundos en un celular.
</objetivo>

<contexto_y_fuentes>
Todo está en esta carpeta. Léelo completo antes de planear:
- `Evolve.html`: versión anterior del sitio (52 MB porque las fotos van incrustadas en base64). Es la fuente de verdad del CONTENIDO: 10 propiedades en el arreglo `properties`, 5 más en el arreglo `sales` (bodega AEPI con 19 fotos, 3 locales en Medellín sin fotos con enlace a citrus.com.co, apartamento en Siberia), una casa multifamiliar en Bogotá con video mp4 incrustado, textos de "Quiénes somos", contacto y formulario. NO copies su diseño: es plano y genérico. Sí reutiliza su contenido y la lógica útil (búsqueda que filtra mientras escribes, formulario por FormSubmit).
- `Brochure Evolve pdf.pdf`: 4 páginas con la identidad de marca, "Quiénes somos", los servicios (inmobiliarios y de construcción), los pilares (Experiencia, Enfoque en el cliente, Calidad, Compromiso), el lema "Soluciones integrales para invertir, construir y crecer" y "Creamos espacios que transforman hoy y construyen el futuro". Úsalo como referencia de tono y contenido, no de diseño (sus renders son de stock).
- `Evolve.png`: logo completo. `Logo de hojas verdes en capas.png`: isotipo (hojas). Ambos PNG tienen fondo con ruido; limpia o vectoriza a SVG antes de usarlos y valida que se vean nítidos sobre fondo claro y oscuro.
- Fotos originales en Google Drive (carpeta pública): https://drive.google.com/drive/folders/13146FtunJXYexbDqVn4nYt1mtJH21EM_ . Intenta descargarlas con `pipx run gdown --folder <url>` (o `pip install gdown`) en `./_fotos-originales/`. Si falla, detente y pídeme que las descargue manualmente a esa carpeta. Como respaldo, extrae las imágenes y el video incrustados en `Evolve.html` a `./_extraidas/<slug>/` con un script, conservando qué foto pertenece a qué propiedad.
</contexto_y_fuentes>

<skills>
En `.claude/skills/` hay skills instaladas. Úsalas activamente y di en cada fase cuál aplicaste:
- `design-taste-frontend`: manda sobre TODA decisión visual, de copy, de layout y de movimiento. Sigue su flujo completo, incluidos su checker y su "finish gate" en navegador real antes de dar algo por terminado.
- `modern-web-guidance`: consúltala ANTES de implementar cada patrón de UI (diálogos/lightbox, galerías, view transitions, animaciones con scroll, container queries, formularios, autofill, select, dark mode si aplica). Usa su CLI `search`/`retrieve` como indica su SKILL.md y cierra cada entrega con su sección "Modern Web Guidance".
- `frontend-design` (si está disponible en tu sesión): úsala como apoyo de dirección estética.
- Ignora `chrome-extensions`: no aplica a este proyecto.
Si dos skills chocan, gana `design-taste-frontend` en lo visual y `modern-web-guidance` en lo técnico de la plataforma web.
</skills>

<stack>
Verifica con `npm view <paquete> version` la última versión estable de cada dependencia antes de instalar; no confíes en versiones de memoria.
- Next.js (App Router, última estable) + TypeScript estricto + Tailwind CSS v4.
- shadcn/ui como base de primitivas accesibles (Dialog, Sheet, Select, Tabs, etc.).
- Motion (antes Framer Motion) solo donde `design-taste-frontend` lo justifique; prioriza CSS nativo moderno (View Transitions, scroll-driven animations, `@starting-style`) cuando `modern-web-guidance` lo respalde, con fallback.
- Componentes de terceros: puedes tomar piezas puntuales de Aceternity UI, Magic UI, React Bits, Tailark u Origin UI, pero cada pieza debe pasar el filtro de `design-taste-frontend` (nada de efectos de "SaaS de IA", shaders, globos 3D ni brillos genéricos: esto es un sitio de propiedades y lugares, el protagonista son las fotos reales). Documenta qué tomaste y de dónde.
- Imágenes y video: Cloudinary con `next-cloudinary` (`CldImage`, `f_auto`, `q_auto`, tamaños responsivos, `placeholder` blur, `priority` solo en la imagen LCP).
- Contenido: datos tipados en `src/data/propiedades.ts` (o JSON con esquema Zod), un objeto por propiedad con slug, título, tipo (venta/arriendo), categoría, ubicación, precio (o `null`), datos clave, detalles, descripción, `publicId`s de Cloudinary y video opcional.
- Formulario: conserva FormSubmit (`https://formsubmit.co/administrativo@evolveinm.com`) con validación accesible, honeypot y estados de envío.
</stack>

<cloudinary>
- Credenciales SOLO en `.env.local` (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`). Crea `.env.example` sin valores, agrega `.env.local` a `.gitignore` y pídeme las credenciales cuando las necesites. Nunca las imprimas ni las subas a git.
- Script `scripts/subir-cloudinary.mjs` idempotente: sube cada foto a `evolve/<slug>/`, sube el video de Bogotá como recurso de video, no duplica si ya existe y genera `src/data/medios.json` con los `publicId`, ancho, alto y orden.
- Antes de subir, descarta duplicados y fotos borrosas o mal recortadas, y elige la mejor portada de cada propiedad. Muéstrame la selección de portadas antes de usarlas.
</cloudinary>

<estructura_del_sitio>
- Inicio: hero con la mejor fotografía real del catálogo (no renders de stock), propuesta de valor clara, buscador, propiedades destacadas, servicios inmobiliarios y de construcción, pilares de confianza, llamado a la acción a WhatsApp.
- `/propiedades`: catálogo con búsqueda en vivo y filtros por operación (venta/arriendo), tipo (casa, apartamento, bodega, local, lote, edificio) y ciudad; estado vacío útil; filtros reflejados en la URL.
- `/propiedades/[slug]`: ficha con galería y lightbox accesible (teclado, swipe, contador), datos clave escaneables, descripción, video si existe, mapa o ubicación por texto, botón fijo de WhatsApp con mensaje prellenado que incluya el nombre de la propiedad, y propiedades relacionadas.
- `/nosotros` y `/servicios` (o secciones en Inicio si `design-taste-frontend` lo recomienda), `/contacto` con formulario.
- Botón flotante de WhatsApp (311 524 4288 → `https://wa.me/573115244288`), header con menú móvil accesible, footer con contacto y redes.
</estructura_del_sitio>

<diseño>
- Identidad: verde pino profundo, verdes del logo y crema cálido como base (paleta del sitio anterior: `--pine #183e32`, `--sage #dce7d8`, `--cream #f6f6f1`); el naranja del techo del logo solo como acento mínimo. Afina la paleta con la librería de `design-taste-frontend` y valida contraste AA.
- Tipografía: una serif o display con carácter para titulares y una sans legible para texto, servidas con `next/font`. Elige con la librería de tipos de la skill.
- Sensación "quiet luxury": mucho aire, jerarquía clara, fotografía grande, microinteracciones discretas, una entrada de hero cuidada y uno o dos momentos memorables, nada más. Respeta `prefers-reduced-motion`.
- Mobile first: la mayoría del tráfico llega desde el celular por WhatsApp e Instagram.
</diseño>

<reglas_de_contenido>
- Español neutro colombiano. Nada de voseo argentino ("querés", "escribí", "mirá").
- No inventes datos. Si una propiedad no tiene precio, muestra "Precio a consultar" con CTA a WhatsApp. No muestres al público las notas internas del HTML anterior como "cifra que debe confirmarse" o "confirmar antes de publicar".
- Crea `VERIFICAR.md` con todo dato dudoso para que Evolve lo confirme: precios faltantes, el total de la bodega en arriendo ($12.852.000 no cuadra con $12.000.000 + IVA 19%), el valor de venta de la bodega AEPI, el correo (el sitio dice `administrativo@evolveinm.com` y el brochure `administrativo@evolveinmb.com`), los enlaces reales de Instagram, Facebook y TikTok, y si los locales de Medellín (citrus.com.co) deben seguir publicados.
- Reescribe los textos de venta con la voz de la skill: concretos, sin emojis ni hashtags, sin frases vacías.
</reglas_de_contenido>

<calidad>
- Rendimiento: LCP < 2,0 s y CLS < 0,05 en móvil; Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO.
- Accesibilidad WCAG 2.2 AA: navegación completa con teclado, foco visible, textos alternativos descriptivos, etiquetas en formularios.
- SEO: metadata por página, Open Graph con la portada de cada propiedad, `sitemap.xml`, `robots.txt`, datos estructurados schema.org (`RealEstateAgent` y `RealEstateListing`/`Offer`), URLs limpias en español.
- Código: sin comentarios en el código. Componentes pequeños, tipados y sin duplicación. `npm run build`, `lint` y `typecheck` en verde.
</calidad>

<forma_de_trabajo>
1. Explora: lee los archivos, extrae el contenido y los medios, y revisa las skills. No escribas código del sitio todavía.
2. Planea: escribe `PLAN.md` con la arquitectura, el modelo de datos, el sistema visual elegido (paleta, tipografías, componentes, momentos), las piezas de terceros que usarás y la lista de propiedades con su portada. DETENTE y espera mi aprobación.
3. Construye por fases con un commit de git por fase (inicializa el repo si no existe): base y sistema visual → datos y medios en Cloudinary → catálogo y ficha → inicio, nosotros, servicios y contacto → SEO y rendimiento.
4. Verifica cada fase en un navegador real: capturas en 390, 768 y 1440 px, el checker y el finish gate de `design-taste-frontend`, y Lighthouse. Corrige lo que falle antes de seguir; no declares algo terminado sin evidencia.
5. Al cerrar cada fase, actualiza `REPORTE.md` con qué hiciste, qué skills y guías aplicaste, qué quedó pendiente y las rutas de las capturas, para que pueda revisarlo con otra persona.
Si algo es ambiguo o falta un dato que cambia el resultado, pregúntame en vez de suponer. Puedes usar subagentes para trabajo en paralelo, como clasificar fotos mientras construyes componentes.
</forma_de_trabajo>
