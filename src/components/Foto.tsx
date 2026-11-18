import type { CSSProperties } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import type { Foto as TFoto } from "@/data/propiedades";
import { usaCloudinary } from "@/lib/medios";

type Props = {
  foto: TFoto;
  alt: string;
  sizes: string;
  className?: string;
  prioridad?: boolean;
  fill?: boolean;
  estilo?: Record<string, string>;
};

export function Foto({ foto, alt, sizes, className, prioridad = false, fill = true, estilo }: Props) {
  const comunes = {
    sizes,
    className,
    style: estilo as CSSProperties | undefined,
    placeholder: "blur" as const,
    blurDataURL: foto.blur,
    fetchPriority: prioridad ? ("high" as const) : undefined,
    loading: prioridad ? ("eager" as const) : ("lazy" as const),
    ...(fill ? { fill: true as const } : { width: foto.width, height: foto.height }),
  };
  if (usaCloudinary) {
    return <CldImage src={foto.publicId} alt={alt} format="auto" quality="auto" crop="limit" {...comunes} />;
  }
  return <Image src={foto.local} alt={alt} {...comunes} />;
}
