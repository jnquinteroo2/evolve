import Link from "next/link";
import { Foto } from "@/components/Foto";
import type { Foto as TFoto } from "@/data/propiedades";
import { plural } from "@/lib/formato";
import { infoPerfil, type Perfil } from "@/lib/perfiles";

type Item = { perfil: Perfil; total: number; foto: TFoto; alt: string };

export function Perfiles({ items }: { items: Item[] }) {
  return (
    <section className="section perfiles libre" aria-labelledby="perfiles-h">
      <div className="wrap">
        <div className="section-head section-head--row">
          <div>
            <h2 id="perfiles-h">¿Buscas dónde vivir, una renta o un espacio para tu empresa?</h2>
          </div>
        </div>
        <ul className="perfiles__lista">
          {items.map(({ perfil, total, foto, alt }) => (
            <li key={perfil}>
              <Link href={`/propiedades?perfil=${perfil}`} className="perfil">
                <Foto foto={foto} alt={alt} sizes="(min-width: 1024px) 420px, 100vw" className="perfil__img" />
                <div className="perfil__texto">
                  <h3>{infoPerfil[perfil].titulo}</h3>
                  <p>{infoPerfil[perfil].texto}</p>
                  <span className="perfil__ir">
                    {plural(total, "inmueble", "inmuebles")}
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
