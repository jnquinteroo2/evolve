import type { Foto, Video } from "@/data/propiedades";

const conAjustes = (url: string, ajustes: string) => url.replace("/upload/", `/upload/${ajustes}/`);

export function srcFoto(f: Foto) {
  const r = f.recorte;
  return r ? conAjustes(f.url, `c_crop,x_${r.x},y_${r.y},w_${r.width},h_${r.height}`) : f.url;
}

export function urlFotoAbsoluta(f: Foto, ancho = 1200, alto = 630) {
  return srcFoto(f).replace(/\/(v\d+\/)/, `/f_jpg,q_auto,c_fill,g_auto,w_${ancho},h_${alto}/$1`);
}

export function srcVideo(v: Video) {
  return {
    mp4: conAjustes(v.url, "f_mp4,vc_h264,q_auto"),
    poster: conAjustes(v.url, "so_1.5,f_auto,q_auto,w_720").replace(/\.mp4$/, ".jpg"),
  };
}
