import Link from "next/link";
import { Tarjeta } from "@/components/propiedad/Tarjeta";
import type { Propiedad } from "@/data/propiedades";

export function Destacadas({ lista, total }: { lista: Propiedad[]; total: number }) {
  return (
    <section className="section g2m" id="destacadas" aria-labelledby="destacadas-h">
      <div className="wrap">
        <div className="section-head section-head--row">
          <div>
            <h2 id="destacadas-h">Tres inmuebles para ver primero</h2>
            <p>Un apartamento frente al mar, un edificio que ya genera renta y una bodega de 2.646 m² en Cota.</p>
          </div>
          <Link href="/propiedades" className="btn btn--secondary">
            Ver las {total} propiedades
          </Link>
        </div>
        <ul className="destacadas__lista">
          {lista.map((p) => (
            <li key={p.slug}>
              <Tarjeta p={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
