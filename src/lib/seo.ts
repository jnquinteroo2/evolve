import type { Metadata } from "next";
import type { Propiedad } from "@/data/propiedades";
import { sitio } from "./sitio";
import { urlFotoAbsoluta } from "./medios";
import { ubicacionLarga } from "./formato";

function absoluta(url: string) {
  return url.startsWith("http") ? url : `${sitio.url}${url}`;
}

export function jsonLdAgencia() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${sitio.url}/#evolve`,
    name: sitio.nombre,
    url: sitio.url,
    logo: `${sitio.url}/marca/evolve-hoja-og.png`,
    image: `${sitio.url}/marca/evolve-hoja-og.png`,
    description: sitio.descripcion,
    telephone: `+${sitio.whatsapp.numero}`,
    email: sitio.correo,
    address: { "@type": "PostalAddress", addressLocality: sitio.ciudad, addressRegion: sitio.departamento, addressCountry: "CO" },
    areaServed: ["Funza", "Cota", "Cajicá", "Bogotá", "Girardot", "Santa Marta"].map((name) => ({ "@type": "City", name })),
  };
}

export function jsonLdPropiedad(p: Propiedad) {
  const url = `${sitio.url}/propiedades/${p.slug}`;
  const oferta =
    p.estado === "disponible" && p.precio
      ? {
          "@type": "Offer",
          price: p.precio.valor,
          priceCurrency: "COP",
          availability: "https://schema.org/InStock",
          businessFunction: p.operacion === "arriendo" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
          seller: { "@id": `${sitio.url}/#evolve` },
        }
      : p.estado === "disponible"
        ? { "@type": "Offer", availability: "https://schema.org/InStock", seller: { "@id": `${sitio.url}/#evolve` } }
        : { "@type": "Offer", availability: "https://schema.org/SoldOut", seller: { "@id": `${sitio.url}/#evolve` } };
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.titulo,
    description: p.resumen,
    url,
    image: p.fotos.slice(0, 6).map((f) => absoluta(urlFotoAbsoluta(f, 1600, 1200))),
    contentLocation: p.ciudad
      ? { "@type": "Place", name: ubicacionLarga(p), address: { "@type": "PostalAddress", addressLocality: p.ciudad, addressRegion: p.departamento ?? undefined, addressCountry: "CO" } }
      : undefined,
    offers: oferta,
  };
}

export function metadatosPagina({ titulo, descripcion, ruta, imagen, absoluto = false }: { titulo: string; descripcion: string; ruta: string; imagen?: { url: string; alt: string }; absoluto?: boolean }): Metadata {
  const img = imagen ? [{ url: absoluta(imagen.url), width: 1200, height: 630, alt: imagen.alt }] : undefined;
  return {
    title: absoluto ? { absolute: titulo } : titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: { title: titulo, description: descripcion, url: ruta, images: img, type: "website", locale: "es_CO", siteName: sitio.nombre },
    twitter: { card: "summary_large_image", title: titulo, description: descripcion, images: img?.map((i) => i.url) },
  };
}
