export const sitio = {
  nombre: "Evolve Inmobiliaria & Constructora",
  nombreCorto: "Evolve",
  url: "https://evolveinm.com",
  descripcion:
    "Inmobiliaria y constructora en Funza, Cundinamarca. Casas, bodegas, lotes y edificios en venta y arriendo en la sabana de Bogotá, más consultoría técnica, interventoría y construcción.",
  whatsapp: { numero: "573115244288", visible: "311 524 4288" },
  correo: "administrativo@evolveinm.com",
  ciudad: "Funza",
  departamento: "Cundinamarca",
  lema: "Soluciones integrales para invertir, construir y crecer.",
} as const;

export const navegacion = [
  { href: "/propiedades", texto: "Propiedades" },
  { href: "/servicios", texto: "Servicios" },
  { href: "/nosotros", texto: "Nosotros" },
  { href: "/contacto", texto: "Contacto" },
] as const;

export const formularioDestino = `https://formsubmit.co/ajax/${sitio.correo}`;
