"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Expand, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Foto } from "@/components/Foto";
import type { Foto as TFoto } from "@/data/propiedades";

type Props = { slug: string; titulo: string; fotos: TFoto[]; alts: string[] };

export function Galeria({ titulo, fotos, alts }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const pista = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);
  const [anuncio, setAnuncio] = useState("");
  const total = fotos.length;

  const irA = useCallback((i: number, suave = true) => {
    const el = pista.current;
    if (!el) return;
    const destino = ((i % total) + total) % total;
    const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: destino * el.clientWidth, behavior: suave && !reducido ? "smooth" : "instant" });
    setActual(destino);
  }, [total]);

  function abrir(i: number) {
    dialogo.current?.showModal();
    requestAnimationFrame(() => irA(i, false));
  }

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    let marco = 0;
    const alDesplazar = () => {
      cancelAnimationFrame(marco);
      marco = requestAnimationFrame(() => setActual(Math.round(el.scrollLeft / Math.max(1, el.clientWidth))));
    };
    const alAsentar = () => {
      const i = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
      setAnuncio(`Foto ${i + 1} de ${total}`);
    };
    el.addEventListener("scroll", alDesplazar, { passive: true });
    el.addEventListener("scrollend", alAsentar);
    return () => {
      el.removeEventListener("scroll", alDesplazar);
      el.removeEventListener("scrollend", alAsentar);
    };
  }, [total]);

  function teclas(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      irA(actual + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      irA(actual - 1);
    }
  }

  const visibles = fotos.slice(0, 5);
  return (
    <>
      <div className={`galeria galeria--${Math.min(visibles.length, 5)}`}>
        {visibles.map((f, i) => (
          <button
            key={f.url}
            type="button"
            className={`galeria__celda ${i === 0 ? "galeria__celda--principal" : ""}`}
            onClick={() => abrir(i)}
            aria-label={`Ampliar foto ${i + 1} de ${total}: ${alts[i]}`}
          >
            {i === 0 ? (
              <Foto foto={f} alt={alts[i]} sizes="(min-width: 1024px) 760px, 100vw" prioridad className="frame__img" />
            ) : (
              <Foto foto={f} alt={alts[i]} sizes="(min-width: 1024px) 380px, 50vw" className="frame__img" />
            )}
          </button>
        ))}
        {total > 1 ? (
          <button type="button" className="btn btn--secondary galeria__todas" onClick={() => abrir(0)}>
            <Expand className="size-4" aria-hidden="true" />
            Ver las {total} fotos
          </button>
        ) : null}
      </div>

      <dialog ref={dialogo} className="lightbox" aria-label={`Fotos de ${titulo}`} onKeyDown={teclas} {...({ closedby: "any" } as object)}>
        <div className="lightbox__barra">
          <p className="lightbox__contador tabular" aria-hidden="true">
            {actual + 1} / {total}
          </p>
          <form method="dialog">
            <button type="submit" className="lightbox__boton" aria-label="Cerrar galería" autoFocus>
              <X aria-hidden="true" />
            </button>
          </form>
        </div>
        <div className="lightbox__pista" ref={pista} tabIndex={0} role="group" aria-roledescription="carrusel" aria-label="Fotos">
          {fotos.map((f, i) => (
            <figure key={f.url} className="lightbox__foto" role="group" aria-roledescription="foto" aria-label={`${i + 1} de ${total}`}>
              <Foto foto={f} alt={alts[i]} sizes="100vw" fill={false} className="lightbox__img" />
            </figure>
          ))}
        </div>
        {total > 1 ? (
          <>
            <button type="button" className="lightbox__boton lightbox__ant" onClick={() => irA(actual - 1)} aria-label="Foto anterior">
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" className="lightbox__boton lightbox__sig" onClick={() => irA(actual + 1)} aria-label="Foto siguiente">
              <ChevronRight aria-hidden="true" />
            </button>
          </>
        ) : null}
        <p className="visually-hidden" role="status" aria-live="polite">
          {anuncio}
        </p>
      </dialog>
    </>
  );
}
