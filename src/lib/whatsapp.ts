import { sitio } from "./sitio";

export function enlaceWhatsApp(mensaje = "Hola, quiero información sobre los inmuebles de Evolve.") {
  return `https://wa.me/${sitio.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
}

export function mensajePropiedad(titulo: string, slug: string, codigo?: string) {
  return `Hola, me interesa el inmueble «${titulo}»${codigo ? `, código ${codigo}` : ""} (${sitio.url}/propiedades/${slug}). ¿Me pueden dar más información?`;
}
