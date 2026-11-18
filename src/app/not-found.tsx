import Link from "next/link";

export default function NoEncontrada() {
  return (
    <section className="section libre pagina-simple" aria-labelledby="nf-h">
      <div className="wrap">
        <div className="section-head">
          <h1 id="nf-h">Esta página no existe</h1>
          <p>Puede que el inmueble ya no esté publicado o que el enlace tenga un error.</p>
        </div>
        <div className="btn-row">
          <Link href="/propiedades" className="btn btn--primary">
            Ver las propiedades
          </Link>
          <Link href="/" className="btn btn--secondary">
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
