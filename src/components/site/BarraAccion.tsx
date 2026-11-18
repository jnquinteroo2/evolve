"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconoWhatsApp } from "./IconoWhatsApp";
import { enlaceWhatsApp } from "@/lib/whatsapp";

type Estado = { visible: boolean; mensaje?: string; oculta: boolean };

export function BarraAccion() {
  const ruta = usePathname();
  const barra = useRef<HTMLElement>(null);
  const [estado, setEstado] = useState<Estado>({ visible: false, oculta: false });

  useEffect(() => {
    const marca = document.querySelector<HTMLElement>("[data-barra]");
    const mensaje = marca?.dataset.barraMensaje;
    const oculta = marca?.dataset.barra === "oculta";
    const visibles = new Set<Element>();
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) visibles.add(e.target);
        else visibles.delete(e.target);
      }
      setEstado({ visible: visibles.size === 0, mensaje, oculta });
    });
    const objetivos = document.querySelectorAll("main [data-accion-principal], footer [data-accion-principal]");
    objetivos.forEach((o) => io.observe(o));
    if (!objetivos.length) requestAnimationFrame(() => setEstado({ visible: true, mensaje, oculta }));
    return () => io.disconnect();
  }, [ruta]);

  const mostrar = estado.visible && !estado.oculta;
  useEffect(() => {
    if (barra.current) barra.current.inert = !mostrar;
  }, [mostrar]);

  return (
    <nav className="actionbar" aria-label="Acción rápida" data-bar={mostrar ? "shown" : "hidden"} ref={barra}>
      <a className="btn btn--primary" href={enlaceWhatsApp(estado.mensaje)} target="_blank" rel="noopener">
        <IconoWhatsApp />
        <span>Escribir por WhatsApp</span>
      </a>
    </nav>
  );
}
