import Link from "next/link";
import { Foto } from "@/components/Foto";
import type { Foto as TFoto } from "@/data/propiedades";
import { pilares } from "@/lib/contenido";

export function Pilares({ foto, alt }: { foto: TFoto; alt: string }) {
  return (
    <section className="section g2m" id="nosotros" aria-labelledby="pilares-h">
      <div className="wrap">
        <div className="pilares__rejilla">
          <div className="pilares__texto">
            <div className="section-head">
              <h2 id="pilares-h">Desde Funza, para la sabana y sus municipios</h2>
              <p>Atendemos proyectos residenciales, comerciales e industriales en Funza, Bogotá y los municipios cercanos.</p>
            </div>
            <dl className="pilares__lista">
              {pilares.map((p) => (
                <div key={p.nombre}>
                  <dt>{p.nombre}</dt>
                  <dd>{p.detalle}</dd>
                </div>
              ))}
            </dl>
            <Link href="/nosotros" className="link pilares__enlace">
              Conocer a Evolve
            </Link>
          </div>
          <div className="pilares__foto frame frame--photo">
            <Foto foto={foto} alt={alt} sizes="(min-width: 1024px) 560px, 100vw" className="frame__img" />
          </div>
        </div>
      </div>
    </section>
  );
}
