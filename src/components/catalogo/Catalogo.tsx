"use client";

import { useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import type { Categoria, Operacion, Propiedad } from "@/data/propiedades";
import { Tarjeta } from "@/components/propiedad/Tarjeta";
import { BotonWhatsApp } from "@/components/site/BotonWhatsApp";
import { aParams, filtrar, hayFiltros, leerFiltros, sinFiltros, type Filtros } from "@/lib/filtros";
import { infoPerfil, perfiles } from "@/lib/perfiles";
import { nombreCategoria, nombreOperacion, plural } from "@/lib/formato";

type Props = { propiedades: Propiedad[]; operaciones: Operacion[]; tipos: Categoria[]; ciudades: string[] };

export function Catalogo(props: Props) {
  const params = useSearchParams();
  return <CatalogoVista {...props} inicial={leerFiltros(new URLSearchParams(params.toString()))} />;
}

export function CatalogoVista({ propiedades, operaciones, tipos, ciudades, inicial }: Props & { inicial: Filtros }) {
  const [f, setF] = useState<Filtros>(inicial);
  const diferido = useDeferredValue(f);
  const resultado = useMemo(() => filtrar(propiedades, diferido), [propiedades, diferido]);
  const disponibles = resultado.filter((p) => p.estado === "disponible").length;

  function actualizar(cambio: Partial<Filtros>) {
    const nuevo = { ...f, ...cambio };
    setF(nuevo);
    const qs = aParams(nuevo).toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }

  const resumen = hayFiltros(diferido)
    ? `${plural(disponibles, "inmueble disponible", "inmuebles disponibles")} con estos filtros`
    : `${plural(disponibles, "inmueble disponible", "inmuebles disponibles")}`;

  return (
    <>
      <search className="catalogo__filtros" aria-label="Buscar y filtrar inmuebles">
        <form className="catalogo__form" onSubmit={(e) => e.preventDefault()} role="search">
          <div className="catalogo__buscar field">
            <label htmlFor="catalogo-q">Buscar</label>
            <input
              id="catalogo-q"
              type="search"
              name="q"
              value={f.q}
              onChange={(e) => actualizar({ q: e.target.value })}
              placeholder="Ciudad, tipo o característica: Cota, bodega, piscina…"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
            />
          </div>
          <fieldset className="catalogo__grupo catalogo__grupo--perfil">
            <legend>Busco</legend>
            <div className="catalogo__chips">
              <button type="button" className="chip" aria-pressed={f.perfil === null} onClick={() => actualizar({ perfil: null })}>
                Todo
              </button>
              {perfiles.map((p) => (
                <button key={p} type="button" className="chip" aria-pressed={f.perfil === p} onClick={() => actualizar({ perfil: f.perfil === p ? null : p })}>
                  {infoPerfil[p].titulo}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="catalogo__grupo">
            <legend>Operación</legend>
            <div className="catalogo__chips">
              <button type="button" className="chip" aria-pressed={f.operacion === null} onClick={() => actualizar({ operacion: null })}>
                Todas
              </button>
              {operaciones.map((o) => (
                <button key={o} type="button" className="chip" aria-pressed={f.operacion === o} onClick={() => actualizar({ operacion: f.operacion === o ? null : o })}>
                  {nombreOperacion[o]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="catalogo__grupo">
            <legend>Tipo</legend>
            <div className="catalogo__chips">
              <button type="button" className="chip" aria-pressed={f.tipo === null} onClick={() => actualizar({ tipo: null })}>
                Todos
              </button>
              {tipos.map((t) => (
                <button key={t} type="button" className="chip" aria-pressed={f.tipo === t} onClick={() => actualizar({ tipo: f.tipo === t ? null : t })}>
                  {nombreCategoria[t].varios}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="catalogo__ciudad field">
            <label htmlFor="catalogo-ciudad">Ciudad</label>
            <select id="catalogo-ciudad" name="ciudad" value={f.ciudad ?? ""} onChange={(e) => actualizar({ ciudad: e.target.value || null })}>
              <option value="">Todas las ciudades</option>
              {ciudades.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="catalogo__estado">
          <p role="status" aria-live="polite" className="catalogo__conteo">
            {resumen}
          </p>
          {hayFiltros(f) ? (
            <button type="button" className="link" onClick={() => actualizar(sinFiltros)}>
              Quitar filtros
            </button>
          ) : null}
        </div>
      </search>

      {resultado.length ? (
        <ul className="catalogo__rejilla" aria-label="Inmuebles">
          {resultado.map((p, i) => (
            <li key={p.slug}>
              <Tarjeta p={p} nivel="h2" prioridad={i === 0} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="catalogo__vacio">
          <h2>Ningún inmueble coincide{f.q.trim() ? ` con «${f.q.trim()}»` : ""}</h2>
          <p>
            Prueba quitando un filtro o buscando por ciudad. Si buscas algo puntual, escríbenos: también conseguimos inmuebles que todavía no están publicados.
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn--secondary" onClick={() => actualizar(sinFiltros)}>
              Ver todos los inmuebles
            </button>
            <BotonWhatsApp mensaje={`Hola, busco un inmueble${f.q.trim() ? ` (${f.q.trim()})` : ""}. ¿Me ayudan?`} />
          </div>
        </div>
      )}
    </>
  );
}
