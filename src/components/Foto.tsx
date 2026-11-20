"use client";

import type { CSSProperties, SyntheticEvent } from "react";
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

function marcar(img: HTMLImageElement | null) {
  if (img && img.complete && img.naturalWidth > 0) img.dataset.cargada = "";
}

function alCargar(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.dataset.cargada = "";
}

export function Foto({ foto, alt, sizes, className, prioridad = false, fill = true, estilo }: Props) {
  const clases = [prioridad ? null : "foto", className].filter(Boolean).join(" ");
  const comunes = {
    sizes,
    className: clases,
    style: estilo as CSSProperties | undefined,
    fetchPriority: prioridad ? ("high" as const) : undefined,
    loading: prioridad ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
    ref: prioridad ? undefined : marcar,
    onLoad: prioridad ? undefined : alCargar,
    ...(fill ? { fill: true as const } : { width: foto.width, height: foto.height }),
  };
  if (usaCloudinary) {
    const r = foto.recorte;
    const recorte = r ? [{ type: "crop" as const, x: r.x, y: r.y, width: r.width, height: r.height, source: true }, { type: "limit" as const }] : ("limit" as const);
    return <CldImage src={foto.publicId} alt={alt} format="auto" quality="auto" crop={recorte} {...comunes} />;
  }
  return <Image src={foto.local} alt={alt} {...comunes} />;
}
