import Link from "next/link";
import { pilares } from "@/lib/contenido";
import { plural } from "@/lib/formato";

type Zona = { ciudad: string; total: number };

export function Pilares({ zonas }: { zonas: Zona[] }) {
  return (
    <section className="section pilares libre" id="nosotros" aria-labelledby="pilares-h">
      <div className="wrap">
        <div className="pilares__grid">
          <div className="pilares__texto">
            <h2 id="pilares-h">Desde Funza, para la sabana y sus municipios</h2>
            <p className="pilares__lead">Atendemos proyectos residenciales, comerciales e industriales en Funza, Bogotá y los municipios cercanos.</p>
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
          <nav className="zonas" aria-labelledby="zonas-h">
            <h3 id="zonas-h">Inmuebles por ciudad</h3>
            <ul>
              {zonas.map((z) => (
                <li key={z.ciudad}>
                  <Link href={`/propiedades?ciudad=${encodeURIComponent(z.ciudad)}`}>
                    <span className="zonas__ciudad">{z.ciudad}</span>
                    <span className="zonas__total tabular">{plural(z.total, "inmueble", "inmuebles")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
