import { Hero } from "@/components/home/Hero";
import { Destacadas } from "@/components/home/Destacadas";
import { Recorrido } from "@/components/home/Recorrido";
import { Servicios } from "@/components/home/Servicios";
import { Pilares } from "@/components/home/Pilares";
import { ciudadesDisponibles, disponibles, porSlug } from "@/data/propiedades";
import { metadatosPagina } from "@/lib/seo";
import { urlFotoAbsoluta } from "@/lib/medios";

const cota = porSlug("casa-campestre-cota-el-abra")!;

export const metadata = metadatosPagina({
  titulo: "Evolve | Casas, bodegas y lotes en la sabana de Bogotá",
  descripcion: `Inmobiliaria y constructora en Funza. ${disponibles.length} inmuebles en venta y arriendo en Cota, Cajicá, Funza, Bogotá, Girardot y Santa Marta, con fotos reales y atención por WhatsApp.`,
  ruta: "/",
  absoluto: true,
  imagen: { url: urlFotoAbsoluta(cota.fotos[0]), alt: cota.altFotos[0] },
});

export default function Inicio() {
  const destacadas = ["apartamento-kuali-santa-marta", "edificio-multifamiliar-usaquen", "bodega-parque-industrial-aepi-cota"].map((s) => porSlug(s)!);
  const aepi = porSlug("bodega-parque-industrial-aepi-cota")!;
  const cajica = porSlug("casa-campestre-cajica")!;
  return (
    <>
      <Hero foto={cota.fotos[0]} alt={cota.altFotos[0]} total={disponibles.length} ciudades={ciudadesDisponibles.length} />
      <Destacadas lista={destacadas} total={disponibles.length} />
      <Recorrido p={cota} />
      <Servicios foto={aepi.fotos[10]} alt={aepi.altFotos[10]} />
      <Pilares foto={cajica.fotos[2]} alt={cajica.altFotos[2]} />
    </>
  );
}
