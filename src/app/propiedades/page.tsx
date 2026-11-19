import { Suspense } from "react";
import { Catalogo, CatalogoVista } from "@/components/catalogo/Catalogo";
import { sinFiltros } from "@/lib/filtros";
import { catalogoOrdenado, ciudadesDisponibles, disponibles, propiedades, categorias, operaciones } from "@/data/propiedades";
import { metadatosPagina } from "@/lib/seo";
import { urlFotoAbsoluta } from "@/lib/medios";

const portada = propiedades[0];

export const metadata = metadatosPagina({
  titulo: "Propiedades en venta y arriendo",
  descripcion: `${disponibles.length} inmuebles en venta y arriendo en Funza, Cota, Cajicá, Bogotá, Girardot y Santa Marta: casas, bodegas, lotes, edificios y apartamentos con fotos reales.`,
  ruta: "/propiedades",
  imagen: { url: urlFotoAbsoluta(portada.fotos[0]), alt: portada.altFotos[0] },
});

export default function PaginaPropiedades() {
  const tipos = categorias.filter((c) => disponibles.some((p) => p.categoria === c));
  const ops = operaciones.filter((o) => disponibles.some((p) => p.operacion === o));
  return (
    <section className="section catalogo libre" aria-labelledby="catalogo-h">
      <div className="wrap">
        <div className="section-head">
          <h1 id="catalogo-h">Propiedades en venta y arriendo</h1>
          <p>
            {disponibles.length} inmuebles con fotos reales. Los resultados cambian mientras escribes; si no ves lo que buscas, escríbenos por WhatsApp.
          </p>
        </div>
        <Suspense fallback={<CatalogoVista propiedades={catalogoOrdenado} operaciones={ops} tipos={tipos} ciudades={ciudadesDisponibles} inicial={sinFiltros} />}>
          <Catalogo propiedades={catalogoOrdenado} operaciones={ops} tipos={tipos} ciudades={ciudadesDisponibles} />
        </Suspense>
      </div>
    </section>
  );
}
