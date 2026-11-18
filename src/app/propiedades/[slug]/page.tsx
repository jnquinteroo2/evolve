import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { Galeria } from "@/components/propiedad/Galeria";
import { Tarjeta } from "@/components/propiedad/Tarjeta";
import { VideoPropiedad } from "@/components/propiedad/VideoPropiedad";
import { BotonWhatsApp } from "@/components/site/BotonWhatsApp";
import { porSlug, propiedades, relacionadas } from "@/data/propiedades";
import { nombreCategoria, nombreOperacion, textoPrecio, ubicacionLarga } from "@/lib/formato";
import { jsonLdPropiedad, metadatosPagina } from "@/lib/seo";
import { urlFotoAbsoluta } from "@/lib/medios";
import { mensajePropiedad } from "@/lib/whatsapp";

export const dynamicParams = false;

export function generateStaticParams() {
  return propiedades.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/propiedades/[slug]">) {
  const { slug } = await params;
  const p = porSlug(slug);
  if (!p) return {};
  const precio = p.estado === "vendida" ? "Vendida" : textoPrecio(p.precio).principal;
  return metadatosPagina({
    titulo: `${p.titulo}`,
    descripcion: `${p.resumen} ${nombreOperacion[p.operacion]} · ${precio}.`,
    ruta: `/propiedades/${p.slug}`,
    imagen: { url: urlFotoAbsoluta(p.fotos[0]), alt: p.altFotos[0] },
  });
}

export default async function Ficha({ params }: PageProps<"/propiedades/[slug]">) {
  const { slug } = await params;
  const p = porSlug(slug);
  if (!p) notFound();
  const vendida = p.estado === "vendida";
  const precio = textoPrecio(p.precio);
  const otras = relacionadas(p);
  const mensaje = mensajePropiedad(p.titulo, p.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPropiedad(p)) }} />
      <section className="section ficha libre" aria-labelledby="ficha-h" data-barra={vendida ? "oculta" : "ficha"} data-barra-mensaje={vendida ? undefined : mensaje}>
        <div className="wrap">
          <Link href="/propiedades" className="ficha__volver" transitionTypes={["nav-back"]}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Todas las propiedades
          </Link>
          <header className="ficha__cabecera">
            <p className="ficha__tipo">
              {nombreOperacion[p.operacion]} · {nombreCategoria[p.categoria].uno}
              {vendida ? <span className="ficha__sello">Vendida</span> : null}
            </p>
            <h1 id="ficha-h">{p.titulo}</h1>
            <p className="ficha__lugar">
              <MapPin className="size-4" aria-hidden="true" />
              {ubicacionLarga(p)}
            </p>
          </header>
          <Galeria slug={p.slug} titulo={p.titulo} fotos={p.fotos} alts={p.altFotos} />

          <div className="ficha__cuerpo">
            <div className="ficha__principal">
              <h2 className="visually-hidden">Datos clave</h2>
              <dl className="ficha__datos">
                {p.datosClave.map((d) => (
                  <div key={d.etiqueta}>
                    <dt>{d.etiqueta}</dt>
                    <dd className="tabular">{d.valor}</dd>
                  </div>
                ))}
              </dl>

              <div className="ficha__texto">
                <h2>Sobre el inmueble</h2>
                {p.descripcion.map((t) => (
                  <p key={t.slice(0, 24)}>{t}</p>
                ))}
              </div>

              {p.detalles.length ? (
                <div className="ficha__texto">
                  <h2>Detalles</h2>
                  <ul className="ficha__lista">
                    {p.detalles.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {p.video ? (
                <div className="ficha__texto">
                  <h2>Recorrido en video</h2>
                  <VideoPropiedad video={p.video} titulo={p.titulo} poster={urlFotoAbsoluta(p.fotos[0], 720, 1280)} />
                </div>
              ) : null}

              <div className="ficha__texto">
                <h2>Ubicación</h2>
                <p>
                  {ubicacionLarga(p)}.{" "}
                  {p.ciudad ? "La dirección exacta se comparte al agendar la visita." : "La ubicación exacta se comparte por WhatsApp al consultar."}
                </p>
              </div>
            </div>

            <aside className="ficha__lateral" aria-label="Precio y contacto">
              <div className="ficha__caja">
                {vendida ? (
                  <>
                    <p className="ficha__precio">Inmueble vendido</p>
                    <p className="ficha__nota">Este inmueble ya no está disponible. Mira otros parecidos más abajo.</p>
                    <Link href="/propiedades" className="btn btn--secondary">
                      Ver inmuebles disponibles
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="ficha__precio tabular">
                      {precio.principal}
                      {precio.nota ? <span> {precio.nota}</span> : null}
                    </p>
                    <p className="ficha__nota">
                      {p.precio ? "Escríbenos para agendar la visita o pedir más fotos." : "Pregúntanos el precio y las condiciones por WhatsApp."}
                    </p>
                    <BotonWhatsApp mensaje={mensaje} principal className="w-full" />
                    <Link href={`/contacto?inmueble=${encodeURIComponent(p.titulo)}`} className="link ficha__alterna">
                      Prefiero dejar mis datos
                    </Link>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {otras.length ? (
        <section className="section relacionadas libre" aria-labelledby="relacionadas-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="relacionadas-h">Otros inmuebles que pueden interesarte</h2>
            </div>
            <ul className="catalogo__rejilla">
              {otras.map((o) => (
                <li key={o.slug}>
                  <Tarjeta p={o} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
