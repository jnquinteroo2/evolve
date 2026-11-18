import { FormularioContacto } from "@/components/forms/FormularioContacto";
import { BotonWhatsApp } from "@/components/site/BotonWhatsApp";
import { sitio } from "@/lib/sitio";
import { metadatosPagina } from "@/lib/seo";

export const metadata = metadatosPagina({
  titulo: "Contacto",
  descripcion: `Escríbenos por WhatsApp al ${sitio.whatsapp.visible} o déjanos tus datos. Evolve Inmobiliaria & Constructora, Funza, Cundinamarca.`,
  ruta: "/contacto",
});

export default function PaginaContacto() {
  return (
    <section className="section libre pagina-simple" aria-labelledby="contacto-h1">
      <div className="wrap">
        <div className="contacto">
        <div className="contacto__datos">
          <div className="section-head">
            <h1 id="contacto-h1">Contacto</h1>
            <p>La forma más rápida es WhatsApp. Si prefieres, déjanos tus datos y te llamamos.</p>
          </div>
          <BotonWhatsApp principal />
          <dl className="contacto__lista">
            <div>
              <dt>WhatsApp</dt>
              <dd>{sitio.whatsapp.visible}</dd>
            </div>
            <div>
              <dt>Correo</dt>
              <dd>
                <a className="link" href={`mailto:${sitio.correo}`}>
                  {sitio.correo}
                </a>
              </dd>
            </div>
            <div>
              <dt>Ubicación</dt>
              <dd>
                {sitio.ciudad}, {sitio.departamento}
              </dd>
            </div>
          </dl>
        </div>
          <FormularioContacto />
        </div>
      </div>
    </section>
  );
}
