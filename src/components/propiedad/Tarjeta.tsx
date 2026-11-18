import Link from "next/link";
import { ViewTransition } from "react";
import { Foto } from "@/components/Foto";
import type { Propiedad } from "@/data/propiedades";
import { nombreCategoria, nombreOperacion, textoPrecio, ubicacionCorta } from "@/lib/formato";

type Props = { p: Propiedad; nivel?: "h2" | "h3"; sizes?: string };

export function Tarjeta({ p, nivel = "h3", sizes = "(min-width: 1024px) 560px, (min-width: 640px) 60vw, 100vw" }: Props) {
  const Titulo = nivel;
  const precio = textoPrecio(p.precio);
  const vendida = p.estado === "vendida";
  return (
    <Link href={`/propiedades/${p.slug}`} className="card tarjeta" transitionTypes={["nav-forward"]}>
      <div className="tarjeta__foto m-zoom">
        <ViewTransition name={`foto-${p.slug}`} share="morph" default="none">
          <Foto foto={p.fotos[0]} alt={p.altFotos[0]} sizes={sizes} className="frame__img" />
        </ViewTransition>
        {vendida ? <span className="tarjeta__sello">Vendida</span> : null}
      </div>
      <div className="tarjeta__cuerpo">
        <p className="tarjeta__tipo">
          {nombreOperacion[p.operacion]} · {nombreCategoria[p.categoria].uno}
        </p>
        <Titulo className="tarjeta__titulo">{p.titulo}</Titulo>
        <p className="tarjeta__lugar">{ubicacionCorta(p)}</p>
        <dl className="tarjeta__datos">
          {p.datosClave.slice(0, 3).map((d) => (
            <div key={d.etiqueta}>
              <dt>{d.etiqueta}</dt>
              <dd>{d.valor}</dd>
            </div>
          ))}
        </dl>
        {vendida ? null : (
          <p className="tarjeta__precio tabular">
            {precio.principal}
            {precio.nota ? <span> {precio.nota}</span> : null}
          </p>
        )}
      </div>
    </Link>
  );
}
