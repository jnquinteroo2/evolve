import Link from "next/link";
import { Foto } from "@/components/Foto";
import type { Foto as TFoto } from "@/data/propiedades";
import { serviciosConstruccion, serviciosInmobiliarios } from "@/lib/contenido";

export function Servicios({ foto, alt }: { foto: TFoto; alt: string }) {
  return (
    <section className="section ground-inverse g2m" id="servicios" aria-labelledby="servicios-h">
      <div className="wrap">
        <div className="section-head section-head--row">
          <div>
            <h2 id="servicios-h">Inmobiliaria y constructora en una sola firma</h2>
            <p>Vendemos, arrendamos y gestionamos inmuebles, y acompañamos obras desde la consultoría hasta la construcción.</p>
          </div>
          <Link href="/servicios" className="btn btn--secondary">
            Ver los servicios
          </Link>
        </div>
        <div className="servicios__rejilla">
          <div className="servicios__foto frame frame--photo">
            <Foto foto={foto} alt={alt} sizes="(min-width: 1024px) 520px, 100vw" className="frame__img" />
          </div>
          <div>
            <h3 className="servicios__titulo">Servicios inmobiliarios</h3>
            <ul className="lista-servicios">
              {serviciosInmobiliarios.map((s) => (
                <li key={s.nombre}>{s.nombre}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="servicios__titulo">Servicios de construcción</h3>
            <ul className="lista-servicios">
              {serviciosConstruccion.map((s) => (
                <li key={s.nombre}>{s.nombre}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
