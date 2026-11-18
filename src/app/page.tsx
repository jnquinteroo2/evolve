import { Hero } from "@/components/home/Hero";
import { ciudadesDisponibles, disponibles, porSlug } from "@/data/propiedades";

export default function Inicio() {
  const cota = porSlug("casa-campestre-cota-el-abra")!;
  return <Hero foto={cota.fotos[0]} alt={cota.altFotos[0]} total={disponibles.length} ciudades={ciudadesDisponibles.length} />;
}
