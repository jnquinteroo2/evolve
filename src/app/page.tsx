import { Hero } from "@/components/home/Hero";
import { Perfiles } from "@/components/home/Perfiles";
import { Destacadas } from "@/components/home/Destacadas";
import { Recorrido } from "@/components/home/Recorrido";
import { Vender } from "@/components/home/Vender";
import { Servicios } from "@/components/home/Servicios";
import { Pilares } from "@/components/home/Pilares";
import { categorias, ciudadesDisponibles, disponibles, porSlug } from "@/data/propiedades";
import { metadatosPagina } from "@/lib/seo";
import { urlFotoAbsoluta } from "@/lib/medios";
import { perfiles, perfilesDe, type Perfil } from "@/lib/perfiles";

const cota = porSlug("casa-campestre-cota-el-abra")!;

export const metadata = metadatosPagina({
  titulo: "Evolve | Casas, apartamentos, edificios y bodegas en la sabana de Bogotá",
  descripcion: `Inmobiliaria y constructora en Funza. ${disponibles.length} inmuebles en venta y arriendo en ${ciudadesDisponibles.join(", ")}, con fotos reales y atención por WhatsApp.`,
  ruta: "/",
  absoluto: true,
  imagen: { url: urlFotoAbsoluta(cota.fotos[1]), alt: cota.altFotos[1] },
});

const fotoPerfil: Record<Perfil, { slug: string; i: number }> = {
  vivir: { slug: "casa-campestre-cajica", i: 0 },
  invertir: { slug: "edificio-multifamiliar-usaquen", i: 0 },
  empresa: { slug: "bodegas-arriendo-desde-600-m2", i: 5 },
};

const ordenDestacadas = [
  "casa-campestre-cajica",
  "apartamento-kuali-santa-marta",
  "edificio-multifamiliar-usaquen",
  "bodega-parque-industrial-aepi-cota",
  "casa-tres-niveles-girardot",
  "bodegas-arriendo-desde-600-m2",
  "bodega-esquinera-fontibon",
];

export default function Inicio() {
  const destacadas = ordenDestacadas.map((s) => porSlug(s)).filter((p) => p && p.estado === "disponible").slice(0, 4) as NonNullable<ReturnType<typeof porSlug>>[];
  const tipos = categorias.filter((c) => disponibles.some((p) => p.categoria === c));
  const items = perfiles.map((perfil) => {
    const ref = porSlug(fotoPerfil[perfil].slug)!;
    return { perfil, total: disponibles.filter((p) => perfilesDe(p).includes(perfil)).length, foto: ref.fotos[fotoPerfil[perfil].i], alt: ref.altFotos[fotoPerfil[perfil].i] };
  });
  const zonas = ciudadesDisponibles
    .map((ciudad) => ({ ciudad, total: disponibles.filter((p) => p.ciudad === ciudad).length }))
    .sort((a, b) => b.total - a.total || a.ciudad.localeCompare(b.ciudad, "es"));
  return (
    <>
      <Hero foto={cota.fotos[1]} alt={cota.altFotos[1]} total={disponibles.length} ciudades={ciudadesDisponibles} tipos={tipos} />
      <Perfiles items={items} />
      <Destacadas lista={destacadas} total={disponibles.length} />
      <Recorrido p={cota} />
      <Vender foto={cota.fotos[5]} alt={cota.altFotos[5]} />
      <Servicios />
      <Pilares zonas={zonas} />
    </>
  );
}
