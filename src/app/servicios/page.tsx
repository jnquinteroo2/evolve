import { serviciosConstruccion, serviciosInmobiliarios } from "@/lib/contenido";
import { metadatosPagina } from "@/lib/seo";
import { BotonWhatsApp } from "@/components/site/BotonWhatsApp";

export const metadata = metadatosPagina({
  titulo: "Servicios inmobiliarios y de construcción",
  descripcion: "Venta, arriendo, captación, avalúos y acompañamiento documental. Consultoría técnica, asesoría de proyectos, interventoría y construcción desde Funza, Cundinamarca.",
  ruta: "/servicios",
});

function Lista({ titulo, id, items }: { titulo: string; id: string; items: readonly { nombre: string; detalle: string }[] }) {
  return (
    <div className="servicios-pagina__grupo">
      <h2 id={id}>{titulo}</h2>
      <dl className="servicios-pagina__lista">
        {items.map((s) => (
          <div key={s.nombre}>
            <dt>{s.nombre}</dt>
            <dd>{s.detalle}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function PaginaServicios() {
  return (
    <section className="section libre pagina-simple" aria-labelledby="servicios-h1">
      <div className="wrap">
        <div className="section-head">
          <h1 id="servicios-h1">Servicios inmobiliarios y de construcción</h1>
          <p>Una sola firma para comprar, vender, arrendar o construir. Atendemos proyectos residenciales, comerciales e industriales en Funza, Bogotá y los municipios cercanos.</p>
        </div>
        <div className="servicios-pagina">
          <Lista titulo="Servicios inmobiliarios" id="inmobiliarios" items={serviciosInmobiliarios} />
          <Lista titulo="Servicios de construcción" id="construccion" items={serviciosConstruccion} />
        </div>
        <div className="pagina-simple__accion">
          <p>Cuéntanos qué necesitas y te decimos cómo te podemos ayudar.</p>
          <BotonWhatsApp principal mensaje="Hola, quiero información sobre los servicios de Evolve." />
        </div>
      </div>
    </section>
  );
}
