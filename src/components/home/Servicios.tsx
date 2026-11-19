import Link from "next/link";
import { serviciosConstruccion, serviciosInmobiliarios } from "@/lib/contenido";

const grupos = [
  { id: "inmobiliarios", titulo: "Servicios inmobiliarios", items: serviciosInmobiliarios },
  { id: "construccion", titulo: "Servicios de construcción", items: serviciosConstruccion },
];

export function Servicios() {
  return (
    <section className="section servicios libre" id="servicios" aria-labelledby="servicios-h">
      <div className="wrap">
        <div className="section-head section-head--row">
          <div>
            <h2 id="servicios-h">Del avalúo a la obra, con un mismo equipo</h2>
          </div>
          <Link href="/servicios" className="btn btn--secondary">
            Ver los servicios
          </Link>
        </div>
        <div className="servicios__grid">
          {grupos.map((g) => (
            <article key={g.id} className="servicios__grupo" aria-labelledby={`sg-${g.id}`}>
              <h3 id={`sg-${g.id}`}>{g.titulo}</h3>
              <dl>
                {g.items.map((s) => (
                  <div key={s.nombre}>
                    <dt>{s.nombre}</dt>
                    <dd>{s.detalle}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
