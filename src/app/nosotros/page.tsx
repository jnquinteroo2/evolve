import Link from "next/link";
import { Foto } from "@/components/Foto";
import { porSlug } from "@/data/propiedades";
import { pilares, zonas } from "@/lib/contenido";
import { metadatosPagina } from "@/lib/seo";
import { urlFotoAbsoluta } from "@/lib/medios";

const cajica = porSlug("casa-campestre-cajica")!;

export const metadata = metadatosPagina({
  titulo: "Quiénes somos",
  descripcion: "Evolve Inmobiliaria & Constructora ofrece soluciones integrales para personas, empresas e inversionistas que buscan encontrar, comercializar, desarrollar o transformar espacios.",
  ruta: "/nosotros",
  imagen: { url: urlFotoAbsoluta(cajica.fotos[0]), alt: cajica.altFotos[0] },
});

export default function PaginaNosotros() {
  return (
    <section className="section libre pagina-simple" aria-labelledby="nosotros-h1">
      <div className="wrap">
        <div className="nosotros">
        <div className="nosotros__texto">
          <div className="section-head">
            <h1 id="nosotros-h1">Quiénes somos</h1>
            <p>Soluciones integrales para invertir, construir y crecer.</p>
          </div>
          <p>
            En Evolve Inmobiliaria & Constructora trabajamos con personas, empresas e inversionistas que buscan encontrar, comercializar, desarrollar o transformar espacios.
          </p>
          <p>
            Unimos la experiencia inmobiliaria con consultoría, asesoría, interventoría y construcción, y acompañamos cada etapa del proceso de forma cercana y clara.
          </p>
          <p>
            Atendemos proyectos residenciales, comerciales e industriales en {zonas.join(", ").replace(/, ([^,]*)$/, " y $1")} y municipios aledaños.
          </p>
          <h2>Lo que nos guía</h2>
          <dl className="pilares__lista">
            {pilares.map((p) => (
              <div key={p.nombre}>
                <dt>{p.nombre}</dt>
                <dd>{p.detalle}</dd>
              </div>
            ))}
          </dl>
          <div className="btn-row">
            <Link href="/propiedades" className="btn btn--primary">
              Ver las propiedades
            </Link>
            <Link href="/contacto" className="btn btn--secondary">
              Escribirnos
            </Link>
          </div>
        </div>
        <figure className="nosotros__foto frame frame--photo" data-moment="picture-develops">
          <Foto foto={cajica.fotos[0]} alt={cajica.altFotos[0]} sizes="(min-width: 1024px) 560px, 100vw" className="frame__img" prioridad />
        </figure>
        </div>
      </div>
    </section>
  );
}
