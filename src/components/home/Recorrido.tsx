import Link from "next/link";
import { Foto } from "@/components/Foto";
import type { Propiedad } from "@/data/propiedades";

const capitulos = [
  { foto: 1, titulo: "Sala a doble altura", texto: "Chimenea y ventanales de piso a techo que dan al jardín." },
  { foto: 2, titulo: "Madera de incienso", texto: "Pisos y escalera en madera, con muros de ladrillo a la vista." },
  { foto: 3, titulo: "Jacuzzi bajo claraboya", texto: "La casa suma gimnasio privado, BBQ y terrazas." },
  { foto: 6, titulo: "Un conjunto de 10 casas", texto: "Jardín con árboles frutales y parqueadero cubierto para cuatro carros." },
];

export function Recorrido({ p }: { p: Propiedad }) {
  return (
    <section className="section" id="recorrido" data-moment="photo-chapters" aria-labelledby="recorrido-h">
      <div className="wrap mo-ph">
        <div className="mo-ph__head">
          <h2 id="recorrido-h">Recorrido por la casa de la vereda El Abra</h2>
          <p>
            350 m² construidos y 908 m² de lote en Cota.{" "}
            <Link href={`/propiedades/${p.slug}`} className="link">
              Ver la ficha completa
            </Link>
          </p>
        </div>
        <ol className="mo-ph__list">
          {capitulos.map((c) => (
            <li className="mo-ph__ch" key={c.titulo}>
              <figure className="mo-ph__pic">
                <Foto foto={p.fotos[c.foto]} alt={p.altFotos[c.foto]} sizes="(min-width: 1024px) 1280px, 100vw" fill={false} />
              </figure>
              <h3>{c.titulo}</h3>
              <p>{c.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
