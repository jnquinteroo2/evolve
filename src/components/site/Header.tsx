"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { navegacion } from "@/lib/sitio";
import { BotonWhatsApp } from "./BotonWhatsApp";

export function Header() {
  const ruta = usePathname();
  const hoja = useRef<HTMLDivElement>(null);
  const [abierto, setAbierto] = useState(false);
  const activo = (href: string) => ruta === href || ruta.startsWith(`${href}/`);

  useEffect(() => {
    const el = hoja.current;
    if (!el) return;
    const alCambiar = (e: Event) => setAbierto((e as ToggleEvent).newState === "open");
    el.addEventListener("toggle", alCambiar);
    return () => el.removeEventListener("toggle", alCambiar);
  }, []);

  useEffect(() => {
    const el = hoja.current;
    if (el?.matches(":popover-open")) el.hidePopover();
  }, [ruta]);

  return (
    <header className="nav nav--centre" style={{ viewTransitionName: "site-header" }}>
      <div className="wrap nav__bar">
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Link className="nav__logo" href="/" aria-label="Evolve Inmobiliaria Constructora, inicio">
          <Logo />
        </Link>
        <nav className="nav__links" aria-label="Principal">
          {navegacion.map((n) => (
            <div className="nav__item" key={n.href}>
              <Link className="nav__link" href={n.href} aria-current={activo(n.href) ? "page" : undefined}>
                {n.texto}
              </Link>
            </div>
          ))}
        </nav>
        <div className="nav__actions">
          <BotonWhatsApp texto="WhatsApp" />
        </div>
        <button
          className="nav__toggle"
          type="button"
          popoverTarget="menu-principal"
          aria-controls="menu-principal"
          aria-expanded={abierto}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            {abierto ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      <div id="menu-principal" ref={hoja} popover="auto" className="nav__sheet" aria-label="Menú">
        <ul>
          <li>
            <Link href="/" aria-current={ruta === "/" ? "page" : undefined}>
              Inicio
            </Link>
          </li>
          {navegacion.map((n) => (
            <li key={n.href}>
              <Link href={n.href} aria-current={activo(n.href) ? "page" : undefined}>
                {n.texto}
              </Link>
            </li>
          ))}
        </ul>
        <BotonWhatsApp />
      </div>
    </header>
  );
}
