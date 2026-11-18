import { Foto } from "@/components/Foto";
import { BotonWhatsApp } from "@/components/site/BotonWhatsApp";
import type { Foto as TFoto } from "@/data/propiedades";

type Props = { foto: TFoto; alt: string; total: number; ciudades: number };

export function Hero({ foto, alt, total, ciudades }: Props) {
  return (
    <section className="hero hero--photo" data-enter data-calm="left" aria-labelledby="hero-h">
      <Foto foto={foto} alt={alt} sizes="100vw" prioridad fill={false} className="hero__bg" estilo={{ "--ly-pos": "64% 50%", "--ly-pos-phone": "50% 50%" }} />
      <div className="wrap">
        <div className="hero-text">
          <div className="hero__text">
            <h1 id="hero-h">Casas y bodegas en la sabana</h1>
            <p className="hero__lead">
              Venta y arriendo de casas, bodegas, lotes y edificios en la sabana de Bogotá, desde Funza. {total} inmuebles publicados en {ciudades} ciudades, con fotos reales.
            </p>
            <search className="hero__buscar grid gap-2">
              <label htmlFor="hero-q" className="text-sm font-medium">
                Buscar por ciudad, tipo o característica
              </label>
              <form action="/propiedades" method="get" className="flex gap-2">
                                <input
                  id="hero-q"
                  name="q"
                  type="search"
                  placeholder="Cota, bodega, 3 habitaciones…"
                  autoComplete="off"
                  enterKeyHint="search"
                  spellCheck={false}
                  className="h-[var(--btn-h)] min-w-0 flex-1 rounded-[var(--r-btn)] border border-line-strong bg-white px-4 text-base text-ink"
                />
                <button type="submit" className="btn btn--secondary">
                  Buscar
                </button>
              </form>
            </search>
            <div className="btn-row">
              <BotonWhatsApp principal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
