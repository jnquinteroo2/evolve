import Link from "next/link";
import { Foto } from "@/components/Foto";
import type { Propiedad } from "@/data/propiedades";
import { nombreCategoria, nombreOperacion, textoPrecio, ubicacionCorta } from "@/lib/formato";

type Props = { p: Propiedad; nivel?: "h2" | "h3"; sizes?: string; destacada?: boolean; prioridad?: boolean };

export function Tarjeta({ p, nivel = "h3", sizes = "(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw", destacada = false, prioridad = false }: Props) {
  const Titulo = nivel;
  const precio = textoPrecio(p.precio);
  const vendida = p.estado === "vendida";
  return (
    <Link href={`/propiedades/${p.slug}`} className={`tarjeta${destacada ? " tarjeta--grande" : ""}${vendida ? " tarjeta--vendida" : ""}`}>
      <div className="tarjeta__foto">
        <Foto foto={p.fotos[p.portada]} alt={p.altFotos[p.portada]} sizes={sizes} className="frame__img" prioridad={prioridad} />
        <span className="tarjeta__sello">{vendida ? "Vendida" : nombreOperacion[p.operacion]}</span>
        <span className="tarjeta__fotos tabular" aria-hidden="true">
          {p.fotos.length} fotos
        </span>
      </div>
      <div className="tarjeta__cuerpo">
        <p className="tarjeta__tipo">
          <span>{nombreCategoria[p.categoria].uno}</span>
          <span className="tarjeta__codigo tabular">{p.codigo}</span>
        </p>
        <Titulo className="tarjeta__titulo">{p.titulo}</Titulo>
        <p className="tarjeta__lugar">{ubicacionCorta(p)}</p>
        <dl className="tarjeta__datos tabular">
          {p.datosClave.slice(0, 3).map((d) => (
            <div key={d.etiqueta}>
              <dt>{d.etiqueta}</dt>
              <dd>{d.valor}</dd>
            </div>
          ))}
        </dl>
        <div className="tarjeta__pie">
          {vendida ? (
            <p className="tarjeta__precio">Inmueble vendido</p>
          ) : (
            <p className="tarjeta__precio tabular">
              {precio.principal}
              {precio.nota ? <span> {precio.nota}</span> : null}
            </p>
          )}
          <span className="tarjeta__ir" aria-hidden="true">
            Ver ficha
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
