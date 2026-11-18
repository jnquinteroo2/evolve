import Link from "next/link";
import { Logo } from "./Logo";
import { BotonWhatsApp } from "./BotonWhatsApp";
import { navegacion, sitio } from "@/lib/sitio";
import { enlaceWhatsApp } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="footer closing" id="contacto-final" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--type">
          <div className="section-head">
            <h2 id="close-h">¿Buscas inmueble o quieres vender el tuyo?</h2>
            <p>Escríbenos con la zona, el tipo de inmueble y tu presupuesto. Te respondemos por WhatsApp.</p>
          </div>
          <BotonWhatsApp principal iconoFinal className="btn--xl btn--wide" />
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4">
              <Link className="nav__logo" href="/" aria-label="Evolve, inicio">
                <Logo />
              </Link>
              <p className="footer__lede">{sitio.lema}</p>
            </div>
            <div className="span-2 start-7 footer__col">
              <h3>Sitio</h3>
              <ul>
                {navegacion.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>{n.texto}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="span-4 start-9 footer__col">
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
          <div className="footer__legal">
            <span>© {new Date().getFullYear()} Evolve Inmobiliaria & Constructora</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
