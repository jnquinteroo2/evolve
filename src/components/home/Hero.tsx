import Link from "next/link";
import { Foto } from "@/components/Foto";
import type { Categoria, Foto as TFoto } from "@/data/propiedades";
import { listaNatural, nombreCategoria } from "@/lib/formato";
import { infoPerfil, perfiles } from "@/lib/perfiles";

type Props = { foto: TFoto; alt: string; total: number; ciudades: string[]; tipos: Categoria[] };

const sabana = ["Bogotá", "Cajicá", "Chía", "Cota", "Funza", "Madrid", "Mosquera", "Tenjo"];

export function Hero({ foto, alt, total, ciudades, tipos }: Props) {
  const otras = ciudades.filter((c) => !sabana.includes(c));
  const zona = otras.length ? `la sabana de Bogotá, ${listaNatural(otras)}` : "la sabana de Bogotá";
  return (
    <section className="hero hero--photo hero--evolve" data-box="none" data-tone="dark" data-calm="left" aria-labelledby="hero-h">
      <Foto foto={foto} alt={alt} sizes="100vw" prioridad fill={false} className="hero__bg" estilo={{ "--ly-pos": "50% 55%", "--ly-pos-phone": "40% 50%" }} />
      <div className="hero__velo" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-text">
          <div className="hero__text">
            <h1 id="hero-h">
              Espacios para vivir, <em>invertir</em> y crecer
            </h1>
            <p className="hero__lead">
              Casas campestres, apartamentos, edificios de renta y bodegas en {zona}. Cada ficha con fotos reales y atención directa por WhatsApp.
            </p>
            <div className="btn-row">
              <Link href="/propiedades" className="btn btn--primary hero__ver">
                Ver los {total} inmuebles
              </Link>
              <a href="#propietarios" className="btn btn--secondary">
                Quiero vender mi inmueble
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap hero__buscador-wrap">
        <search className="buscador" aria-label="Buscar inmuebles">
          <form action="/propiedades" method="get" className="buscador__form">
            <div className="buscador__campo">
              <label htmlFor="b-perfil">Busco</label>
              <select id="b-perfil" name="perfil" defaultValue="">
                <option value="">Cualquier uso</option>
                {perfiles.map((p) => (
                  <option key={p} value={p}>
                    {infoPerfil[p].titulo}
                  </option>
                ))}
              </select>
            </div>
            <div className="buscador__campo">
              <label htmlFor="b-tipo">Tipo de inmueble</label>
              <select id="b-tipo" name="tipo" defaultValue="">
                <option value="">Todos los tipos</option>
                {tipos.map((t) => (
                  <option key={t} value={t}>
                    {nombreCategoria[t].varios}
                  </option>
                ))}
              </select>
            </div>
            <div className="buscador__campo">
              <label htmlFor="b-ciudad">Ciudad</label>
              <select id="b-ciudad" name="ciudad" defaultValue="">
                <option value="">Todas las ciudades</option>
                {ciudades.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn--primary buscador__enviar">
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12.2 12.2L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Buscar
            </button>
          </form>
        </search>
      </div>
    </section>
  );
}
