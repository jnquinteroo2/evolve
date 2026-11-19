import { z } from "zod";
import mediosJson from "./medios.json";

export const operaciones = ["venta", "arriendo"] as const;
export const categorias = ["casa", "apartamento", "bodega", "local", "lote", "edificio"] as const;

const FotoSchema = z.object({
  publicId: z.string(),
  local: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  orden: z.number().int().positive(),
  blur: z.string(),
});

const VideoSchema = z.object({
  publicId: z.string(),
  local: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const MediosSchema = z.record(z.string(), z.object({ fotos: z.array(FotoSchema).min(1), video: VideoSchema.optional() }));

const PrecioSchema = z.object({
  valor: z.number().int().positive(),
  modalidad: z.enum(["total", "desde-mensual"]),
  negociable: z.boolean(),
  masIva: z.boolean(),
});

const PropiedadBaseSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  titulo: z.string(),
  resumen: z.string().max(160),
  operacion: z.enum(operaciones),
  categoria: z.enum(categorias),
  estado: z.enum(["disponible", "vendida"]),
  ciudad: z.string().nullable(),
  sector: z.string().nullable(),
  departamento: z.string().nullable(),
  precio: PrecioSchema.nullable(),
  datosClave: z.array(z.object({ etiqueta: z.string(), valor: z.string() })).min(1),
  descripcion: z.array(z.string()).min(1),
  detalles: z.array(z.string()),
  destacada: z.boolean(),
  portada: z.number().int().min(0).default(0),
  altFotos: z.array(z.string()),
});

export type Foto = z.infer<typeof FotoSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type Precio = z.infer<typeof PrecioSchema>;
export type Operacion = (typeof operaciones)[number];
export type Categoria = (typeof categorias)[number];
export type Propiedad = z.infer<typeof PropiedadBaseSchema> & { fotos: Foto[]; video?: Video; codigo: string };

const datos: z.input<typeof PropiedadBaseSchema>[] = [
  {
    slug: "casa-campestre-cota-el-abra",
    titulo: "Casa campestre en la vereda El Abra",
    resumen: "908 m² de lote privado y 350 m² construidos en un conjunto de 10 casas en Cota.",
    operacion: "venta",
    categoria: "casa",
    estado: "disponible",
    ciudad: "Cota",
    sector: "Vereda El Abra",
    departamento: "Cundinamarca",
    precio: null,
    datosClave: [
      { etiqueta: "Lote", valor: "908 m²" },
      { etiqueta: "Construcción", valor: "350 m²" },
      { etiqueta: "Habitaciones", valor: "3 + estudio" },
      { etiqueta: "Baños", valor: "4" },
      { etiqueta: "Parqueaderos", valor: "4 cubiertos" },
    ],
    descripcion: [
      "La casa está en un conjunto de solo 10 residencias en la vereda El Abra, en Cota. Tiene 908 m² de lote privado y 350 m² construidos.",
      "La planta abre la sala y el comedor hacia las terrazas y el jardín. La sala, a doble altura, tiene chimenea y ventanales de piso a techo. El estudio puede funcionar como cuarta habitación.",
    ],
    detalles: [
      "Jardín con árboles frutales y zonas verdes amplias",
      "Gimnasio privado y jacuzzi",
      "Pisos en madera de incienso",
      "Sala con chimenea",
      "Zona BBQ y terrazas",
      "Cuarto y baño de servicio",
      "Tanques de reserva de 8.000 L de agua potable y 8.000 L de agua lluvia",
    ],
    destacada: false,
    altFotos: [
      "Fachada de vidrio de la casa de Cota vista desde el jardín",
      "Sala a doble altura con chimenea y ventanales hacia el jardín",
      "Escalera de madera junto a un muro de ladrillo",
      "Zona del jacuzzi con claraboya y ventanal",
      "Habitación con piso de madera y puerta al jardín",
      "Fachada posterior con la torre de vidrio y el jardín",
      "Vista aérea de la casa y los árboles del conjunto",
      "Vista aérea del conjunto de 10 casas entre potreros",
      "Baño principal con doble lavamanos y muebles de madera",
    ],
  },
  {
    slug: "casa-lote-funza",
    titulo: "Casa lote sobre vía comercial en Funza",
    resumen: "591 m² con uso comercial y urbano, rodeada de supermercados, colegios y conjuntos residenciales.",
    operacion: "venta",
    categoria: "lote",
    estado: "disponible",
    ciudad: "Funza",
    sector: null,
    departamento: "Cundinamarca",
    precio: null,
    datosClave: [
      { etiqueta: "Área", valor: "591 m²" },
      { etiqueta: "Uso", valor: "Comercial y urbano" },
      { etiqueta: "Frente", valor: "Sobre vía comercial" },
    ],
    descripcion: [
      "Casa lote de 591 m² sobre una vía comercial de Funza, con uso comercial y urbano. Sirve para levantar un proyecto comercial o de vivienda.",
      "Alrededor hay supermercados, colegios, universidades y conjuntos residenciales, con salida rápida a las vías principales.",
    ],
    detalles: [
      "Uso de suelo comercial y urbano",
      "Cerca de supermercados, colegios y universidades",
      "Acceso directo a vías principales",
    ],
    destacada: false,
    altFotos: [
      "Calle comercial de Funza frente al lote",
      "Patio interior del lote con césped y muros de ladrillo",
      "Andén y vía comercial junto al lote",
      "Jardín del lote con arbustos y la casa existente",
      "Patio posterior del lote con césped y garaje",
    ],
  },
  {
    slug: "casa-tres-niveles-girardot",
    titulo: "Casa de tres niveles con tres apartamentos en Girardot",
    resumen: "Tres apartamentos independientes con contador de energía propio en el barrio Ciudad Montes.",
    operacion: "venta",
    categoria: "casa",
    estado: "disponible",
    ciudad: "Girardot",
    sector: "Barrio Ciudad Montes",
    departamento: "Cundinamarca",
    precio: { valor: 190000000, modalidad: "total", negociable: true, masIva: false },
    datosClave: [
      { etiqueta: "Lote", valor: "6 × 12 m" },
      { etiqueta: "Niveles", valor: "3" },
      { etiqueta: "Apartamentos", valor: "3 independientes" },
      { etiqueta: "Contadores de luz", valor: "3" },
      { etiqueta: "Antigüedad", valor: "30 años" },
    ],
    descripcion: [
      "Casa de tres niveles en el barrio Ciudad Montes, en un lote de 6 m de frente por 12 m de fondo. Cada piso es un apartamento independiente, así que sirve para vivir en uno y arrendar los otros dos, o para arrendar los tres.",
      "Cada nivel tiene su contador de energía. El agua y el gas son compartidos.",
    ],
    detalles: [
      "Primer piso: garaje y apartamento de una habitación con sala, baño, cocina y patio de ropas; se puede dividir",
      "Segundo piso: apartamento de dos habitaciones con sala, comedor, cocina, baño y zona de lavandería",
      "Tercer piso: apartamento de una habitación con baño, cocina, sala, comedor y terraza con muro de protección",
      "Agua y gas compartidos; energía independiente por piso",
    ],
    destacada: true,
    altFotos: [
      "Fachada verde de la casa de tres niveles en Girardot",
      "Puertas y ventanas con reja del primer piso",
      "Entrada a uno de los apartamentos con piso amarillo",
      "Cocina del primer piso con mesón de baldosa",
      "Habitación con ventana interior",
      "Pasillo hacia el patio",
      "Baño con ducha y sanitario",
      "Escalera hacia los pisos superiores",
    ],
  },
  {
    slug: "bodegas-arriendo-desde-600-m2",
    titulo: "Bodegas y oficinas en arriendo desde 600 m²",
    resumen: "Espacios industriales y logísticos con acceso para carga, desde 600 m².",
    operacion: "arriendo",
    categoria: "bodega",
    estado: "disponible",
    ciudad: null,
    sector: null,
    departamento: null,
    precio: { valor: 12000000, modalidad: "desde-mensual", negociable: false, masIva: true },
    datosClave: [
      { etiqueta: "Área", valor: "Desde 600 m²" },
      { etiqueta: "Uso", valor: "Industrial y logístico" },
      { etiqueta: "Acceso", valor: "Para carga y distribución" },
    ],
    descripcion: [
      "Bodegas y plantas de oficina desde 600 m² para almacenamiento, operación logística o sede de empresa. El edificio tiene fachada de ladrillo y vidrio, plantas libres con piso laminado y una nave con estantería y pasarelas.",
      "El acceso está pensado para carga y distribución. Escríbenos para conocer la ubicación y agendar la visita.",
    ],
    detalles: [
      "Plantas libres con columnas y ventanería continua",
      "Nave con estantería, pasarelas y zona de despacho",
      "Acceso para vehículos de carga",
    ],
    destacada: true,
    altFotos: [
      "Fachada de ladrillo y vidrio del edificio de bodegas",
      "Planta libre con piso laminado y columnas",
      "Planta con ventanal continuo hacia la calle",
      "Planta libre con columnas blancas",
      "Planta de oficinas con ventanas hacia la nave",
      "Nave de bodega con pasarelas amarillas",
      "Zona de estantería metálica",
      "Salón amplio con piso laminado",
      "Recepción con puertas de madera",
      "Salón cerrado con piso laminado",
    ],
  },
  {
    slug: "casa-campestre-cajica",
    titulo: "Casa campestre a cinco minutos del centro de Cajicá",
    resumen: "265 m² construidos en un lote de 1.000 m², tres alcobas con baño privado y espacio para 10 carros.",
    operacion: "venta",
    categoria: "casa",
    estado: "disponible",
    ciudad: "Cajicá",
    sector: null,
    departamento: "Cundinamarca",
    precio: null,
    datosClave: [
      { etiqueta: "Lote", valor: "1.000 m²" },
      { etiqueta: "Construcción", valor: "265 m²" },
      { etiqueta: "Alcobas", valor: "3 con baño privado" },
      { etiqueta: "Parqueo", valor: "10 carros" },
    ],
    descripcion: [
      "Casa campestre a cinco minutos del centro de Cajicá, en una zona tranquila. Tiene 265 m² construidos en un lote de 1.000 m².",
      "Por dentro: tres alcobas, cada una con su baño, estudio y cuarto de servicio. Por fuera: jardín con árboles frutales, BBQ con baño y bodegas.",
    ],
    detalles: [
      "Estudio y cuarto de servicio",
      "Árboles frutales y jardín con senderos",
      "Zona BBQ cubierta con baño",
      "Bodegas",
      "Parqueo para 10 carros",
    ],
    destacada: true,
    altFotos: [
      "Fachada de la casa campestre de Cajicá con un ciprés",
      "Sala y comedor con piso de madera",
      "Sendero de piedra en el jardín",
      "Jardín con bancas de madera",
      "Zona BBQ con horno de leña",
      "Terraza cubierta junto a la casa",
      "Cocina integral con ventana al jardín",
      "Alcoba principal con piso de madera",
    ],
  },
  {
    slug: "casa-funza-conjunto",
    titulo: "Casa de tres niveles en conjunto en Funza",
    resumen: "Cuatro alcobas y tres baños en un conjunto con zonas verdes y BBQ.",
    operacion: "venta",
    categoria: "casa",
    estado: "vendida",
    ciudad: "Funza",
    sector: null,
    departamento: "Cundinamarca",
    precio: null,
    datosClave: [
      { etiqueta: "Niveles", valor: "3" },
      { etiqueta: "Alcobas", valor: "4" },
      { etiqueta: "Baños", valor: "3" },
      { etiqueta: "Parqueadero", valor: "Propio" },
    ],
    descripcion: [
      "Casa de tres niveles con cuatro alcobas, tres baños, cocina integral, sala comedor y zona de lavado, en un conjunto con zonas verdes, BBQ, senderos y parqueadero de visitantes.",
    ],
    detalles: ["Cocina integral", "Zonas verdes, BBQ y senderos", "Parqueadero de visitantes"],
    destacada: false,
    altFotos: [
      "Fachada de ladrillo de la casa en el conjunto de Funza",
      "Vía interna adoquinada del conjunto",
      "Calle del conjunto con parqueaderos",
      "Zona verde con sendero",
      "Parqueadero de visitantes",
    ],
  },
  {
    slug: "edificio-multifamiliar-usaquen",
    titulo: "Edificio de seis apartaestudios en San Cristóbal Norte",
    resumen: "304 m² construidos, seis apartaestudios arrendados y siete baños, cerca de la carrera Séptima.",
    operacion: "venta",
    categoria: "edificio",
    estado: "disponible",
    ciudad: "Bogotá",
    sector: "Usaquén, San Cristóbal Norte",
    departamento: "Bogotá D. C.",
    precio: { valor: 946278000, modalidad: "total", negociable: false, masIva: false },
    datosClave: [
      { etiqueta: "Construcción", valor: "304 m²" },
      { etiqueta: "Apartaestudios", valor: "6 arrendados" },
      { etiqueta: "Baños", valor: "7" },
      { etiqueta: "Valor por m²", valor: "Menos de $3,2 millones" },
    ],
    descripcion: [
      "Edificio multifamiliar en San Cristóbal Norte, Usaquén, cerca de la carrera Séptima. Tiene 304 m² construidos repartidos en seis apartaestudios que hoy están arrendados, con siete baños en total.",
      "El precio equivale a menos de $3,2 millones por metro cuadrado construido. Es una compra para quien busca renta desde el primer mes.",
    ],
    detalles: [
      "Seis apartaestudios generando renta",
      "Patio interior con escalera independiente",
      "Terraza en el último piso",
      "Cerca de la carrera Séptima y zonas de valorización",
    ],
    destacada: true,
    altFotos: [
      "Fachada del edificio en San Cristóbal Norte",
      "Patio interior con escalera de baranda verde",
      "Apartaestudio con muro de ladrillo y puertas de madera",
      "Pasillo con escalera y piso de baldosa",
      "Habitación con ventana y muro verde",
      "Acceso a un apartaestudio con piso de baldosa",
      "Habitación con ventanal",
      "Apartaestudio con piso de baldosa roja",
      "Terraza del último piso",
    ],
  },
  {
    slug: "apartamento-kuali-santa-marta",
    titulo: "Apartamento esquinero frente al mar en Santa Marta",
    resumen: "99 m², dos habitaciones y balcón en el piso 16 del edificio Kuali, sector Irotama.",
    operacion: "venta",
    categoria: "apartamento",
    estado: "disponible",
    ciudad: "Santa Marta",
    sector: "Sector Irotama, edificio Kuali",
    departamento: "Magdalena",
    precio: null,
    datosClave: [
      { etiqueta: "Área", valor: "99 m²" },
      { etiqueta: "Habitaciones", valor: "2" },
      { etiqueta: "Baños", valor: "2" },
      { etiqueta: "Piso", valor: "16, esquinero" },
      { etiqueta: "Parqueadero", valor: "Privado + depósito" },
    ],
    descripcion: [
      "Apartamento esquinero en el piso 16 del edificio Kuali, en el sector Irotama de Santa Marta. Tiene 99 m², dos habitaciones, dos baños, cocina abierta y un balcón amplio con vista al mar.",
      "El edificio tiene piscinas, gimnasio, spa y sauna, parque infantil y vigilancia las 24 horas. Queda cerca del Hotel Irotama, de Zuana y del centro comercial Zazué.",
    ],
    detalles: [
      "Balcón amplio con vista al mar",
      "Cocina abierta integral",
      "Parqueadero privado y depósito",
      "Piscinas, gimnasio, spa y sauna",
      "Parque infantil y vigilancia 24 horas",
    ],
    destacada: true,
    portada: 2,
    altFotos: [
      "Vista al mar Caribe desde el balcón del piso 16",
      "Sala con sofás blancos y cocina abierta al fondo",
      "Balcón con hamaca y vista al mar",
      "Cocina abierta con isla y campana",
      "Cocina y sala con aire acondicionado",
      "Habitación principal con ventanal",
      "Habitación auxiliar con camarotes",
      "Clóset y baño de la habitación",
    ],
  },
  {
    slug: "bodega-esquinera-fontibon",
    titulo: "Bodega esquinera con oficinas en Fontibón",
    resumen: "Bodega en esquina con zona de almacenamiento, oficinas listas y acceso vehicular en Fontibón, Bogotá.",
    operacion: "venta",
    categoria: "bodega",
    estado: "disponible",
    ciudad: "Bogotá",
    sector: "Fontibón",
    departamento: "Bogotá D. C.",
    precio: null,
    datosClave: [
      { etiqueta: "Ubicación", valor: "Esquinera" },
      { etiqueta: "Oficinas", valor: "Listas para operar" },
      { etiqueta: "Acceso", valor: "Vehicular" },
    ],
    descripcion: [
      "Bodega esquinera en Fontibón, uno de los sectores logísticos y comerciales de Bogotá. Tiene zonas amplias de almacenamiento, oficinas listas para operar y acceso vehicular.",
      "Al estar en esquina, la fachada se ve desde dos calles.",
    ],
    detalles: [
      "Naves con columnas y piso en concreto",
      "Oficinas con divisiones en vidrio y madera",
      "Bóveda de seguridad",
      "Escalera a mezanine",
    ],
    destacada: false,
    altFotos: [
      "Nave larga con columnas blancas y piso de concreto",
      "Nave con estructura metálica y escalera a mezanine",
      "Zona de almacenamiento con escalera amarilla",
      "Oficinas con divisiones de vidrio y persianas",
      "Oficina abierta con divisiones bajas",
      "Oficina con paneles de madera",
      "Oficinas con puertas de madera",
      "Zona de bodega con cuartos y escalera",
      "Pasillo de acceso con parqueo demarcado",
      "Puerta de bóveda de seguridad",
    ],
  },
  {
    slug: "casa-multifamiliar-suba",
    titulo: "Casa multifamiliar de cuatro pisos en Suba",
    resumen: "Cuatro niveles con apartamentos independientes y garaje arrendados, en Suba Bilbao, Bogotá.",
    operacion: "venta",
    categoria: "casa",
    estado: "disponible",
    ciudad: "Bogotá",
    sector: "Suba Bilbao",
    departamento: "Bogotá D. C.",
    precio: { valor: 450000000, modalidad: "total", negociable: true, masIva: false },
    datosClave: [
      { etiqueta: "Lote", valor: "5 × 12 m" },
      { etiqueta: "Niveles", valor: "4" },
      { etiqueta: "Luz", valor: "Contador por piso" },
      { etiqueta: "Antigüedad", valor: "10 años" },
    ],
    descripcion: [
      "Casa de cuatro niveles en Suba Bilbao, segundo sector, sobre un lote de 5 m de frente por 12 m de fondo. Cada piso es un espacio independiente con su propia renta informada.",
      "El detalle de la renta que el propietario informa para cada espacio está en la lista de abajo. Cada piso tiene su contador de luz; el agua y el gas son compartidos.",
    ],
    detalles: [
      "Primer piso: garaje (renta de $200.000) y apartamento de dos alcobas, baño, cocina y sala (renta de $650.000)",
      "Segundo piso: apartamento de dos habitaciones, sala comedor, cocina y baño (renta de $800.000)",
      "Tercer piso: apartamento de dos alcobas, baño, cocina, sala y comedor (renta de $800.000)",
      "Cuarto piso: apartamento pequeño de dos alcobas, baño y cocina (renta de $650.000), con el patio y la zona de lavado comunes",
      "Contador de luz independiente por piso; agua y gas compartidos",
    ],
    destacada: false,
    altFotos: ["Fachada de la casa multifamiliar de cuatro pisos en Suba"],
  },
  {
    slug: "bodega-parque-industrial-aepi-cota",
    titulo: "Bodega No. 2 en el Parque Industrial AEPI, Cota",
    resumen: "2.646 m² construidos, triple altura de 10 m, dos muelles y oficinas en tres niveles.",
    operacion: "venta",
    categoria: "bodega",
    estado: "disponible",
    ciudad: "Cota",
    sector: "Parque Industrial AEPI",
    departamento: "Cundinamarca",
    precio: null,
    datosClave: [
      { etiqueta: "Construcción", valor: "2.646,71 m²" },
      { etiqueta: "Área privada", valor: "2.140,22 m²" },
      { etiqueta: "Bodega libre", valor: "1.440 m²" },
      { etiqueta: "Altura", valor: "10 m" },
      { etiqueta: "Muelles", valor: "2" },
      { etiqueta: "Parqueaderos", valor: "19" },
    ],
    descripcion: [
      "Bodega No. 2 del Parque Industrial AEPI, en Cota. Tiene 2.646,71 m² construidos y 2.140,22 m² de área privada, con 1.440 m² de bodega libre a triple altura (10 m).",
      "Las oficinas ocupan tres niveles: 262,6 m² en el primer piso, 380,1 m² en el segundo y 475,2 m² en el tercero. El suelo resiste 5 t/m² y la capacidad eléctrica es de 130 kVA.",
    ],
    detalles: [
      "Dos muelles de cargue y descargue",
      "19 parqueaderos para automóviles",
      "Resistencia de suelo de 5 t/m²",
      "Capacidad eléctrica de 130 kVA",
      "Detección y extinción de incendios con rociadores",
      "Agente limpio en el cuarto de racks",
      "Circuito cerrado de televisión y alarma de intrusión",
    ],
    destacada: true,
    altFotos: [
      "Fachada de la bodega con tres pisos de oficinas",
      "Recepción con mueble curvo y muro de ladrillo",
      "Pasillo de oficinas con divisiones de vidrio",
      "Sala de juntas con ventanales",
      "Oficina privada con divisiones de vidrio",
      "Puestos de trabajo junto al pasillo",
      "Pasillo de oficinas con puertas de vidrio",
      "Sala de reuniones con mesa larga",
      "Cafetería con mesas y sillas",
      "Vista de la bodega desde las oficinas",
      "Bodega con estantería de doble altura",
      "Bodega con estibas y estantería",
      "Bodega vista desde el mezanine",
      "Edificio de la bodega visto desde la vía interna del parque",
    ],
  },
];

const medios = MediosSchema.parse(mediosJson);

export const propiedades: Propiedad[] = datos.map((d, i) => {
  const base = PropiedadBaseSchema.parse(d);
  const m = medios[base.slug];
  if (!m) throw new Error(`Sin medios para ${base.slug}`);
  if (base.portada >= m.fotos.length) throw new Error(`Portada fuera de rango en ${base.slug}`);
  if (base.altFotos.length !== m.fotos.length) throw new Error(`Alt incompletos en ${base.slug}: ${base.altFotos.length} vs ${m.fotos.length}`);
  return { ...base, fotos: m.fotos, video: m.video, codigo: `EV-${String(i + 1).padStart(3, "0")}` };
});

export const disponibles = propiedades.filter((p) => p.estado === "disponible");

export const catalogoOrdenado = [...disponibles, ...propiedades.filter((p) => p.estado !== "disponible")];

export function porSlug(slug: string) {
  return propiedades.find((p) => p.slug === slug);
}

export function relacionadas(p: Propiedad, n = 3) {
  return disponibles
    .filter((o) => o.slug !== p.slug)
    .map((o) => ({ o, puntos: (o.categoria === p.categoria ? 2 : 0) + (o.ciudad && o.ciudad === p.ciudad ? 1 : 0) + (o.operacion === p.operacion ? 1 : 0) }))
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, n)
    .map(({ o }) => o);
}

export const ciudadesDisponibles = [...new Set(disponibles.map((p) => p.ciudad).filter((c): c is string => c !== null))].sort((a, b) => a.localeCompare(b, "es"));
