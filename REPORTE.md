# REPORTE — Sitio EVOLVE

Registro por fase de lo hecho, las skills y guías aplicadas, los resultados de las verificaciones y lo pendiente. Las capturas están en `shots/<fase>/`.

---

## Fase 1 — Base y sistema visual

**Qué se hizo**
- Limpieza pedida: se borraron los cuatro `design-taste-frontend*.zip`, `ziReqZRQ` y los `skills-lock.json.lock*`.
- Proyecto Next.js 16.4.6 (App Router, Turbopack) + React 19.3 + TypeScript estricto + Tailwind CSS 4.3, con `output: "export"` (sitio estático en `out/`). shadcn/ui 4.23 inicializado (variante base-ui; primitivas `button`, `input`, `label`, `textarea`). Versiones verificadas con `npm view` el 18 nov. 2026.
- Sistema visual de `design-taste-frontend` integrado sin editar el kit: `system.css`, `layout.css` y `motion.css` copiados a `src/kit/` e importados en capas CSS (`@layer kit, kit-layout, kit-motion`) por debajo de las utilidades de Tailwind, para que el marcado del starter funcione y Tailwind siga ganando donde se usa. `motion.js` y los momentos `photo-chapters` y `picture-develops` copiados a `public/kit/` y montados en cada navegación por `KitRuntime` (`mountAll`/`unmountAll` + `refresh`).
- Tokens de marca (salida de `start.mjs brand`): crema `#f6f6f1`, salvia `#dce7d8`, tinta `#1b2822`, gris `#56655d`, pino `#183e32`; teja `#c2601b` solo como acento. Tipografía: Newsreader 400 (titulares) + Hanken Grotesk (texto) con `next/font`.
- Logo: se vectorizó con vtracer (cuatro configuraciones). El SVG pierde los degradados de las hojas y del wordmark, así que, como indicaste, se usa el PNG limpio con fondo transparente (umbral de alfa + filtro de mediana para quitar el halo de ruido del isotipo), exportado a WebP/PNG 480 px. Versión crema monocroma derivada del canal alfa para fondo pino. Comparación: `_revision/logo-comparacion-png-vs-svg.png`. Íconos `icon.png` y `apple-icon.png` desde el isotipo.
- Estructura: `header.nav.nav--centre` fijo con menú móvil en `popover`, héroe `photo` (Casa campestre de Cota), `footer.closing` con cierre `close-type` y enlaces, barra de acción (`nav.actionbar`) con WhatsApp: barra inferior en el celular y botón redondo flotante desde 640 px; se oculta mientras hay otro botón de WhatsApp en pantalla.
- Medios: `scripts/seleccion-fotos.json` fija qué fotos entran, en qué orden y con qué recorte; `scripts/preparar-fotos.mjs` genera los maestros en `_medios/`, variantes locales 640/1080/1600 en `public/fotos-local/` y `src/data/medios.json` (publicId, ancho, alto, orden, blur).
- Datos: `src/data/propiedades.ts` con esquema Zod, validado en build (falla si faltan medios o textos alternativos).

**Skills y guías aplicadas**
- `design-taste-frontend`: deal con sus scripts (tipo `service`; paleta propia vía `start.mjs brand` porque las tres repartidas chocaban con el logo; pareja Newsreader/Hanken; héroe `photo`; momentos `photo-chapters` y `picture-develops`; nav-centre, footer-columns, close-type, dark-band, botones solid). Gate armado con `--kind service --primary "Escribir por WhatsApp"`.
- `modern-web-guidance`: `dialog`, `navigation-drawer`, `prevent-page-scroll-under-modal-dialog`, `platform-controls-dismiss-dialog`, `navbar`, `carousel`, `natural-interactions`, `forms`, `accessible-error-announcement`, `validate-input-after-interaction`, `optimize-image-priority`.
- Documentación local de Next 16 (`node_modules/next/dist/docs`): exportación estática, `ViewTransition`, `inlineCss`, `preload` en lugar de `priority`.

**Resultados**
- `npm run build`, `npm run lint`, `npm run typecheck`: en verde.
- Lighthouse móvil, Inicio (imágenes locales): Performance 92, Accessibility 100, Best Practices 100, SEO 100; LCP 3,3 s, CLS 0, TBT 10 ms. Primera medición fue 70: se corrigió con variantes responsivas locales y Newsreader sin eje óptico (132 KB → archivo estático). El LCP restante viene del CSS bloqueante; se ataca en la fase 5 con Cloudinary y `inlineCss`.
- Gate (ronda 1 de 3, corrida sobre el esqueleto de la fase 1): `GATE: FAIL 30`. Lo que reportó y cómo se resolvió en esta misma fase: header fijo y héroe desde y = 0 (el header era `sticky`), `footer.closing` en lugar de un footer suelto, botón flotante movido a `nav.actionbar` (lo único fijo que la skill permite), menú con `aria-expanded`, encabezados del footer en `h3`. Pendiente para cuando estén todas las secciones: alto exacto por pantalla en 390 y el resto de reglas de "una sección por pantalla". Para no gastar rondas, el gate se vuelve a correr solo con el sitio completo; entre medio se usan `consistency.mjs` y `check.mjs`.

**Capturas**
- `shots/fase1/inicio-1440.png`, `shots/fase1/inicio-768.png`, `shots/fase1/inicio-390.png`
- Lighthouse: `shots/fase1/lighthouse/inicio.json`

**Pendiente**
- Credenciales de Cloudinary (fase 2).
- Choques declarados entre el brief y la skill: rutas propias (la skill pide una sola página) y datos de contacto reales (la skill pide `.example`). Se documentan como waivers al cerrar.

---

## Revisión de diseño (19 nov. 2026, hecha desde el chat de Claude)

Ajustes al front sobre la base de la fase 4, con referencia a tendencias de sitios inmobiliarios premium en 2026 (layouts sobrios, tipografía editorial, búsqueda inmediata, conversión por intención) y a competidores de la sabana (Engel & Völkers Chía-Cajicá, portales como Fincaraíz).

- Fuentes servidas en local (`src/app/fuentes/`, `next/font/local`): el build ya no depende de fonts.googleapis.com. Se suma Newsreader itálica para acentos.
- Héroe: foto de la sala a doble altura de Cota a sangre con velo, titular de marca "Espacios para vivir, invertir y crecer", dos acciones (ver inmuebles, hablar con un asesor) y buscador por uso, tipo y ciudad que lleva al catálogo filtrado.
- Nueva sección de perfiles (Para vivir, Para invertir, Para tu empresa) con conteo real; nuevo filtro `perfil` en el catálogo y en la URL (`src/lib/perfiles.ts`).
- Destacadas: una tarjeta grande horizontal y tres tarjetas debajo.
- Tarjeta rediseñada: sello de operación, número de fotos, datos clave en tres columnas con etiqueta, precio y "Ver ficha" alineados abajo; campo `portada` en los datos (Santa Marta usa el balcón con vista al mar).
- Nueva sección para propietarios (vender o arrendar en tres pasos) con mensaje de WhatsApp propio.
- Servicios en dos tarjetas con descripción; pilares con lista de inmuebles por ciudad enlazada al catálogo.
- Catálogo: filtros ordenados en un panel (buscar y ciudad; busco y operación; tipo) y rejilla de tres columnas en escritorio.
- Ficha: botón "Agendar una visita", "Compartir inmueble" (Web Share API con copia del enlace como respaldo) y detalles en dos columnas.
- Logo más grande en header y footer.
- Datos: se quitó de la casa de Suba la renta total sumada ($3.100.000), que no estaba en la fuente; se reemplazó por "Luz: contador por piso" y se ajustó la descripción.
- Secciones nuevas usan alto según su contenido (`.libre`) en lugar de una pantalla fija.

## Segunda revisión (19 nov. 2026, desde el chat)

- Logo: solo la hoja. Se reconstruyó en alta resolución a partir del PNG original (superresolución EDSR x2, bordes limpios desde el canal alfa): maestro de 1968 × 2620 px y versiones de 96 a 1280 px en WebP y PNG (`public/marca/evolve-hoja-*`). Además, versiones vectoriales de la silueta (`evolve-hoja.svg` con degradado, `-crema.svg` y `-pino.svg`) para marcas de agua. Favicon y apple-icon regenerados.
- Paleta más fría y propia de la marca: fondo neblina `#f2f4ef`, tinta `#0f2a22`, pino `#12392d`, banda `#0f2e25`; el acento terracota se reemplazó por el degradado de la hoja (verde a lima).
- Código de inmueble (EV-001…) en tarjetas, ficha y mensajes de WhatsApp.
- Simulador de crédito en la ficha de los inmuebles en venta: valor, cuota inicial, plazo y tasa E.A. editable (13 % de referencia), con cuota mensual aproximada y consulta por WhatsApp.
- Footer en banda oscura con la hoja como marca de agua.
- Se quitó `experimental.inlineCss`: duplicaba el CSS dentro del HTML (540 KB → 109 KB en el inicio).
- Lighthouse móvil con compresión (como en un hosting real): Inicio 92, Ficha 97, Servicios 100, Catálogo 82; Accesibilidad, Buenas prácticas y SEO 100 en todas.

## Tercera revisión: animaciones y estados de carga

- Se retiró el runtime de movimiento del kit (motion.js, moments y la escena fijada del recorrido). Era lo que causaba los saltos, pausas y cortes: el texto aparecía tarde y el scroll se "pegaba".
- Hero: una sola secuencia de entrada con keyframes CSS (foto, título, texto, botones y buscador escalonados) con curva de salida exponencial.
- Fotos: skeleton con brillo mientras cargan y fundido al terminar; hover solo escala la imagen interna, nunca mueve la tarjeta.
- Recorrido: cuadrícula tipo bento en vez de escena fijada al scroll.
- Revelado al hacer scroll con animation-timeline: view() y clip-path (solo si el navegador lo soporta y sin reduced-motion).
- Lightbox y menú móvil con @starting-style + transition-behavior: allow-discrete.
- Catálogo: el fallback de Suspense ahora pinta el mismo panel de filtros, sin salto de layout.
- Se eliminaron eyebrows y numeraciones decorativas siguiendo las reglas de Impeccable; se cruzó con UI UX Pro Max para tokens de movimiento y foco.
