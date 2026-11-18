import type { Categoria, Operacion, Precio, Propiedad } from "@/data/propiedades";

const cop = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export function formatoCop(valor: number) {
  return cop.format(valor).replace(/\s/g, " ").replace("COP", "").trim();
}

export function textoPrecio(precio: Precio | null) {
  if (!precio) return { principal: "Precio a consultar", nota: null };
  const valor = formatoCop(precio.valor);
  if (precio.modalidad === "desde-mensual") {
    return { principal: `Desde ${valor}`, nota: `al mes${precio.masIva ? " + IVA" : ""}` };
  }
  return { principal: valor, nota: precio.negociable ? "negociable" : null };
}

export const nombreCategoria: Record<Categoria, { uno: string; varios: string }> = {
  casa: { uno: "Casa", varios: "Casas" },
  apartamento: { uno: "Apartamento", varios: "Apartamentos" },
  bodega: { uno: "Bodega", varios: "Bodegas" },
  local: { uno: "Local", varios: "Locales" },
  lote: { uno: "Lote", varios: "Lotes" },
  edificio: { uno: "Edificio", varios: "Edificios" },
};

export const nombreOperacion: Record<Operacion, string> = { venta: "Venta", arriendo: "Arriendo" };

export function ubicacionCorta(p: Pick<Propiedad, "ciudad" | "sector">) {
  if (!p.ciudad) return "Ubicación a consultar";
  return p.sector ? `${p.sector}, ${p.ciudad}` : p.ciudad;
}

export function ubicacionLarga(p: Pick<Propiedad, "ciudad" | "sector" | "departamento">) {
  if (!p.ciudad) return "Ubicación a consultar";
  return [p.sector, p.ciudad, p.departamento !== p.ciudad ? p.departamento : null].filter(Boolean).join(", ");
}

export function plural(n: number, uno: string, varios: string) {
  return `${n} ${n === 1 ? uno : varios}`;
}
