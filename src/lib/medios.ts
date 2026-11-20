import type { Foto, Video } from "@/data/propiedades";

const nube = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const usaCloudinary = Boolean(nube);

export function srcFoto(f: Foto) {
  return usaCloudinary ? f.publicId : f.local;
}

export function urlFotoAbsoluta(f: Foto, ancho = 1200, alto = 630) {
  if (!usaCloudinary) return f.local.replace(/\.webp$/, "-1600.webp");
  const r = f.recorte;
  const previo = r ? `c_crop,x_${r.x},y_${r.y},w_${r.width},h_${r.height}/` : "";
  return `https://res.cloudinary.com/${nube}/image/upload/${previo}f_jpg,q_auto,c_fill,g_auto,w_${ancho},h_${alto}/${f.publicId}`;
}

export function srcVideo(v: Video) {
  if (!usaCloudinary) return { mp4: v.local, poster: null as string | null };
  return {
    mp4: `https://res.cloudinary.com/${nube}/video/upload/f_mp4,vc_h264,q_auto/${v.publicId}.mp4`,
    poster: `https://res.cloudinary.com/${nube}/video/upload/so_1.5,f_auto,q_auto,w_720/${v.publicId}.jpg`,
  };
}
