import Link from "next/link";
import { Tarjeta } from "@/components/propiedad/Tarjeta";
import type { Propiedad } from "@/data/propiedades";

export function Destacadas({ lista, total }: { lista: Propiedad[]; total: number }) {
  return (
    <section className="section destacadas libre" id="destacadas" aria-labelledby="destacadas-h">
      <div className="wrap">
        <div className="section-head section-head--row">
          <div>
            <h2 id="destacadas-h">Inmuebles seleccionados</h2>
          </div>
          <Link href="/propiedades" className="btn btn--secondary">
            Ver los {total} inmuebles
          </Link>
        </div>
        <ul className="destacadas__lista">
          {lista.map((p, i) => (
            <li key={p.slug} className={i === 0 ? "destacadas__principal" : undefined}>
              <Tarjeta p={p} destacada={i === 0} sizes={i === 0 ? "(min-width: 1024px) 860px, 100vw" : "(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
