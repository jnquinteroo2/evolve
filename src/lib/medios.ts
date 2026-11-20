import type { Foto, Video } from "@/data/propiedades";

const nube = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const conAjustes = (url: string, ajustes: string) => url.replace("/upload/", `/upload/${ajustes}/`);

export const usaCloudinary = Boolean(nube);

export function srcFoto(f: Foto) {
  return usaCloudinary ? f.url : f.local;
}

export function urlFotoAbsoluta(f: Foto, ancho = 1200, alto = 630) {
  if (!usaCloudinary) return f.local.replace(/\.webp$/, "-1600.webp");
  const r = f.recorte;
  const previo = r ? `c_crop,x_${r.x},y_${r.y},w_${r.width},h_${r.height}/` : "";
  return conAjustes(f.url, `${previo}f_jpg,q_auto,c_fill,g_auto,w_${ancho},h_${alto}`);
}

export function srcVideo(v: Video) {
  if (!usaCloudinary) return { mp4: v.local, poster: null as string | null };
  return {
    mp4: conAjustes(v.url, "f_mp4,vc_h264,q_auto"),
    poster: conAjustes(v.url, "so_1.5,f_auto,q_auto,w_720").replace(/\.mp4$/, ".jpg"),
  };
}
