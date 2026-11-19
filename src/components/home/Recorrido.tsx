import Link from "next/link";
import { Foto } from "@/components/Foto";
import type { Propiedad } from "@/data/propiedades";

const escenas = [
  { foto: 0, titulo: "Abierta al jardín", texto: "La sala y el comedor se abren hacia las terrazas y el jardín.", clase: "recorrido__item--a" },
  { foto: 2, titulo: "Madera de incienso", texto: "Pisos y escalera en madera, con muros de ladrillo a la vista.", clase: "recorrido__item--b" },
  { foto: 3, titulo: "Jacuzzi bajo claraboya", texto: "La casa suma gimnasio privado, BBQ y terrazas.", clase: "recorrido__item--c" },
  { foto: 6, titulo: "Un conjunto de 10 casas", texto: "Jardín con árboles frutales y parqueadero cubierto para cuatro carros.", clase: "recorrido__item--d" },
];

export function Recorrido({ p }: { p: Propiedad }) {
  return (
    <section className="section recorrido libre" id="recorrido" aria-labelledby="recorrido-h">
      <div className="wrap">
        <div className="section-head section-head--row">
          <div>
            <h2 id="recorrido-h">Recorrido por la casa de la vereda El Abra</h2>
            <p>350 m² construidos y 908 m² de lote en un conjunto de 10 casas en Cota.</p>
          </div>
          <Link href={`/propiedades/${p.slug}`} className="btn btn--secondary">
            Ver la ficha completa
          </Link>
        </div>
        <ul className="recorrido__grid">
          {escenas.map((e) => (
            <li key={e.titulo} className={`recorrido__item ${e.clase}`}>
              <Foto foto={p.fotos[e.foto]} alt={p.altFotos[e.foto]} sizes="(min-width: 1024px) 760px, 100vw" className="recorrido__img" />
              <div className="recorrido__texto">
                <h3>{e.titulo}</h3>
                <p>{e.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
