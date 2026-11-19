import Link from "next/link";
import { Logo } from "./Logo";
import { navegacion, sitio } from "@/lib/sitio";
import { enlaceWhatsApp } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="pie" aria-labelledby="pie-h">
      <div className="wrap pie__wrap">
        <div className="pie__marca">
          <Link href="/" className="pie__logo" aria-label="Evolve Inmobiliaria & Constructora, inicio">
            <Logo alto={96} tono="crema" />
          </Link>
          <h2 id="pie-h" className="pie__lema">
            {sitio.lema}
          </h2>
        </div>
        <nav className="pie__col" aria-label="Sitio">
          <h3>Sitio</h3>
          <ul>
            {navegacion.map((n) => (
              <li key={n.href}>
                <Link href={n.href} prefetch={false}>
                  {n.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pie__col">
          <h3>Contacto</h3>
          <ul>
            <li>
              <a href={enlaceWhatsApp()} target="_blank" rel="noopener">
                WhatsApp {sitio.whatsapp.visible}
              </a>
            </li>
            <li>
              <a href={`mailto:${sitio.correo}`}>{sitio.correo}</a>
            </li>
            <li>
              {sitio.ciudad}, {sitio.departamento}
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap pie__legal">
        <span>© {new Date().getFullYear()} Evolve Inmobiliaria & Constructora</span>
        <span>Venta · Arriendo · Avalúos · Construcción</span>
      </div>
    </footer>
  );
}
