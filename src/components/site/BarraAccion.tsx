"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconoWhatsApp } from "./IconoWhatsApp";
import { enlaceWhatsApp } from "@/lib/whatsapp";

export function BarraAccion({ mensaje }: { mensaje?: string }) {
  const ruta = usePathname();
  const barra = useRef<HTMLElement>(null);
  const [estado, setEstado] = useState<"shown" | "hidden">("hidden");

  useEffect(() => {
    const visibles = new Set<Element>();
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) visibles.add(e.target);
        else visibles.delete(e.target);
      }
      setEstado(visibles.size ? "hidden" : "shown");
    });
    const objetivos = document.querySelectorAll("main [data-accion-principal], footer [data-accion-principal]");
    if (!objetivos.length) requestAnimationFrame(() => setEstado("shown"));
    objetivos.forEach((o) => io.observe(o));
    return () => io.disconnect();
  }, [ruta]);

  useEffect(() => {
    if (barra.current) barra.current.inert = estado === "hidden";
  }, [estado]);

  return (
    <nav className="actionbar" aria-label="Acción rápida" data-bar={estado} ref={barra}>
      <a className="btn btn--primary" href={enlaceWhatsApp(mensaje)} target="_blank" rel="noopener">
        <IconoWhatsApp />
        <span>Escribir por WhatsApp</span>
      </a>
    </nav>
  );
}
