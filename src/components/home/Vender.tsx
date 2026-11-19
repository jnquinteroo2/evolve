import Link from "next/link";
import { Foto } from "@/components/Foto";
import { BotonWhatsApp } from "@/components/site/BotonWhatsApp";
import type { Foto as TFoto } from "@/data/propiedades";

const pasos = [
  { titulo: "Avalúo y estrategia", texto: "Revisamos el inmueble, sus documentos y su valor comercial para definir precio y condiciones." },
  { titulo: "Captación y publicación", texto: "Preparamos la ficha con fotos y datos claros, y la movemos con compradores y arrendatarios." },
  { titulo: "Acompañamiento hasta la firma", texto: "Te acompañamos en la negociación y en el trámite documental hasta cerrar el negocio." },
];

export function Vender({ foto, alt }: { foto: TFoto; alt: string }) {
  return (
    <section className="section ground-inverse vender libre" id="propietarios" aria-labelledby="vender-h">
      <div className="wrap">
        <div className="vender__grid">
          <div className="vender__texto">
            <h2 id="vender-h">¿Quieres vender o arrendar tu inmueble?</h2>
            <p className="vender__lead">Casas, apartamentos, lotes, bodegas o locales en Funza, la sabana y Bogotá. Así trabajamos contigo:</p>
            <ol className="vender__pasos">
              {pasos.map((p, i) => (
                <li key={p.titulo}>
                  <span className="vender__num tabular">0{i + 1}</span>
                  <div>
                    <h3>{p.titulo}</h3>
                    <p>{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="btn-row">
              <BotonWhatsApp mensaje="Hola, quiero vender o arrendar mi inmueble con Evolve. ¿Me pueden asesorar?" texto="Quiero publicar mi inmueble" />
              <Link href="/servicios" className="btn btn--secondary">
                Ver todos los servicios
              </Link>
            </div>
          </div>
          <figure className="vender__foto">
            <Foto foto={foto} alt={alt} sizes="(min-width: 1024px) 560px, 100vw" className="frame__img" />
          </figure>
        </div>
      </div>
    </section>
  );
}
