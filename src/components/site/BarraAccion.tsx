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
    const objetivos = [...document.querySelectorAll<HTMLElement>("main [data-accion-principal], footer [data-accion-principal]")];
    let marco = 0;
    const revisar = () => {
      cancelAnimationFrame(marco);
      marco = requestAnimationFrame(() => {
        const alto = window.innerHeight;
        const enPantalla = objetivos.some((o) => {
          const r = o.getBoundingClientRect();
          return r.bottom > 0 && r.top < alto && r.width > 0;
        });
        setEstado({ visible: !enPantalla, mensaje, oculta });
      });
    };
    revisar();
    window.addEventListener("scroll", revisar, { passive: true });
    window.addEventListener("resize", revisar, { passive: true });
    return () => {
      cancelAnimationFrame(marco);
      window.removeEventListener("scroll", revisar);
      window.removeEventListener("resize", revisar);
    };
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
