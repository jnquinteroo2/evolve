import Link from "next/link";
import { Tarjeta } from "@/components/propiedad/Tarjeta";
import type { Propiedad } from "@/data/propiedades";

export function Destacadas({ lista, total }: { lista: Propiedad[]; total: number }) {
  return (
    <section className="section g2m" id="destacadas" aria-labelledby="destacadas-h">
      <div className="wrap">
        <div className="section-head section-head--row">
          <div>
            <h2 id="destacadas-h">Un apartamento, un edificio y una bodega</h2>
            <p>Frente al mar en Santa Marta, con renta en Usaquén y con 2.646 m² en Cota.</p>
          </div>
          <Link href="/propiedades" className="btn btn--secondary">
            Ver las {total} propiedades
          </Link>
        </div>
        <ul className="destacadas__lista">
          {lista.map((p) => (
            <li key={p.slug}>
              <Tarjeta p={p} sizes="(min-width: 1024px) 620px, (min-width: 640px) 40vw, 100vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
