import type { MetadataRoute } from "next";
import { propiedades } from "@/data/propiedades";
import { sitio } from "@/lib/sitio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = ["", "/propiedades", "/servicios", "/nosotros", "/contacto"].map((r) => ({
    url: `${sitio.url}${r}`,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.8,
  }));
  const fichas = propiedades.map((p) => ({
    url: `${sitio.url}/propiedades/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: p.estado === "disponible" ? 0.7 : 0.3,
  }));
  return [...fijas, ...fichas];
}
