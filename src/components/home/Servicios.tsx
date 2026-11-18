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
            <h2 id="servicios-h">Venta, arriendo, avalúos y obras en la sabana</h2>
          </div>
          <Link href="/servicios" className="btn btn--secondary">
            Ver los servicios
          </Link>
        </div>
        <div className="grid grid--top servicios__rejilla">
          <div className="span-6 servicios__listas">
          <div>
            <h3 className="servicios__titulo">Inmuebles: venta, arriendo y avalúos</h3>
            <ul className="lista-servicios">
              {serviciosInmobiliarios.map((s) => (
                <li key={s.nombre}>{s.nombre}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="servicios__titulo">Construcción e interventoría de obras</h3>
            <ul className="lista-servicios">
              {serviciosConstruccion.map((s) => (
                <li key={s.nombre}>{s.nombre}</li>
              ))}
            </ul>
          </div>
          </div>
          <div className="span-5 start-8 servicios__foto frame frame--photo">
            <Foto foto={foto} alt={alt} sizes="(min-width: 1024px) 540px, 100vw" className="frame__img" />
          </div>
        </div>
      </div>
    </section>
  );
}
