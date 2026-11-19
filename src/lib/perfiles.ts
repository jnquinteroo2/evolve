import type { Propiedad } from "@/data/propiedades";

export const perfiles = ["vivir", "invertir", "empresa"] as const;
export type Perfil = (typeof perfiles)[number];

export const infoPerfil: Record<Perfil, { titulo: string; corto: string; texto: string }> = {
  vivir: {
    titulo: "Para vivir",
    corto: "Vivir",
    texto: "Casas campestres en la sabana y apartamentos con vista al mar.",
  },
  invertir: {
    titulo: "Para invertir",
    corto: "Invertir",
    texto: "Edificios y casas con apartamentos independientes que ya generan renta.",
  },
  empresa: {
    titulo: "Para tu empresa",
    corto: "Mi empresa",
    texto: "Bodegas con oficinas, espacios logísticos y lotes sobre vía comercial.",
  },
};

const asignados: Record<string, Perfil[]> = {
  "casa-campestre-cota-el-abra": ["vivir"],
  "casa-campestre-cajica": ["vivir"],
  "apartamento-kuali-santa-marta": ["vivir"],
  "casa-funza-conjunto": ["vivir"],
  "casa-tres-niveles-girardot": ["vivir", "invertir"],
  "casa-multifamiliar-suba": ["invertir"],
  "edificio-multifamiliar-usaquen": ["invertir"],
  "casa-lote-funza": ["invertir", "empresa"],
  "bodegas-arriendo-desde-600-m2": ["empresa"],
  "bodega-esquinera-fontibon": ["empresa"],
  "bodega-parque-industrial-aepi-cota": ["empresa"],
};

export function perfilesDe(p: Pick<Propiedad, "slug" | "categoria">): Perfil[] {
  const fijo = asignados[p.slug];
  if (fijo) return fijo;
  if (p.categoria === "bodega" || p.categoria === "local") return ["empresa"];
  if (p.categoria === "edificio") return ["invertir"];
  return ["vivir"];
}
