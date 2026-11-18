type Entrada = { src: string; width: number; quality?: number };

const nube = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const anchosLocales = [640, 1080, 1600];

export default function cargadorImagen({ src, width, quality }: Entrada) {
  if (src.startsWith("/fotos-local/")) {
    const ancho = anchosLocales.find((a) => a >= width) ?? anchosLocales.at(-1);
    return src.replace(/\.webp$/, `-${ancho}.webp`);
  }
  if (src.startsWith("/") || !nube) return src;
  const ajustes = ["f_auto", `q_${quality ?? "auto"}`, "c_limit", `w_${width}`].join(",");
  return `https://res.cloudinary.com/${nube}/image/upload/${ajustes}/${src}`;
}
