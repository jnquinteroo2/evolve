type Entrada = { src: string; width: number; quality?: number };

export default function cargadorImagen({ src, width, quality }: Entrada) {
  if (!src.startsWith("https://res.cloudinary.com/")) return src;
  const ajustes = `c_limit,w_${width}/f_auto/q_${quality ?? "auto"}`;
  return src.replace(/\/(v\d+\/)/, `/${ajustes}/$1`);
}
