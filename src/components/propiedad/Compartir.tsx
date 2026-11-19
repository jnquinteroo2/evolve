"use client";

import { useState } from "react";

export function Compartir({ titulo, url }: { titulo: string; url: string }) {
  const [estado, setEstado] = useState<"" | "copiado" | "error">("");

  async function compartir() {
    const datos = { title: titulo, text: `${titulo} · Evolve Inmobiliaria`, url };
    if (typeof navigator.share === "function" && (!navigator.canShare || navigator.canShare(datos))) {
      try {
        await navigator.share(datos);
        return;
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setEstado("copiado");
    } catch {
      setEstado("error");
    }
    window.setTimeout(() => setEstado(""), 2600);
  }

  return (
    <div className="compartir">
      <button type="button" className="compartir__boton" onClick={compartir}>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 10V2M5 5l3-3 3 3M3 9v4h10V9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Compartir inmueble
      </button>
      <span role="status" aria-live="polite" className="compartir__estado">
        {estado === "copiado" ? "Enlace copiado" : estado === "error" ? "No se pudo copiar el enlace" : ""}
      </span>
    </div>
  );
}
