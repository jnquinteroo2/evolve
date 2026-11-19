import type { Categoria, Operacion, Propiedad } from "@/data/propiedades";
import { categorias, operaciones } from "@/data/propiedades";
import { nombreCategoria, nombreOperacion } from "./formato";
import { perfiles, perfilesDe, type Perfil } from "./perfiles";

export type Filtros = { q: string; perfil: Perfil | null; operacion: Operacion | null; tipo: Categoria | null; ciudad: string | null };

export const sinFiltros: Filtros = { q: "", perfil: null, operacion: null, tipo: null, ciudad: null };

export function normalizar(t: string) {
  return t.toLocaleLowerCase("es").normalize("NFD").replace(/\p{Diacritic}/gu, "").trim();
}

function texto(p: Propiedad) {
  return normalizar(
    [
      p.titulo,
      p.resumen,
      p.ciudad ?? "",
      p.sector ?? "",
      nombreCategoria[p.categoria].uno,
      nombreCategoria[p.categoria].varios,
      nombreOperacion[p.operacion],
      ...p.datosClave.map((d) => `${d.valor} ${d.etiqueta}`),
      ...p.detalles,
      ...p.descripcion,
    ].join(" "),
  );
}

export function leerFiltros(params: URLSearchParams): Filtros {
  const operacion = params.get("operacion");
  const tipo = params.get("tipo");
  const perfil = params.get("perfil");
  return {
    q: params.get("q") ?? "",
    perfil: (perfiles as readonly string[]).includes(perfil ?? "") ? (perfil as Perfil) : null,
    operacion: (operaciones as readonly string[]).includes(operacion ?? "") ? (operacion as Operacion) : null,
    tipo: (categorias as readonly string[]).includes(tipo ?? "") ? (tipo as Categoria) : null,
    ciudad: params.get("ciudad"),
  };
}

export function aParams(f: Filtros) {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set("q", f.q.trim());
  if (f.perfil) p.set("perfil", f.perfil);
  if (f.operacion) p.set("operacion", f.operacion);
  if (f.tipo) p.set("tipo", f.tipo);
  if (f.ciudad) p.set("ciudad", f.ciudad);
  return p;
}

export function filtrar(lista: Propiedad[], f: Filtros) {
  const palabras = normalizar(f.q).split(/\s+/).filter(Boolean);
  return lista.filter((p) => {
    if (f.perfil && !perfilesDe(p).includes(f.perfil)) return false;
    if (f.operacion && p.operacion !== f.operacion) return false;
    if (f.tipo && p.categoria !== f.tipo) return false;
    if (f.ciudad && p.ciudad !== f.ciudad) return false;
    if (!palabras.length) return true;
    const t = texto(p);
    return palabras.every((w) => t.includes(w));
  });
}

export function hayFiltros(f: Filtros) {
  return Boolean(f.q.trim() || f.perfil || f.operacion || f.tipo || f.ciudad);
}
