"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Momentos = { mountAll: (root?: ParentNode) => void; unmountAll: (root?: ParentNode) => void };
type Movimiento = { refresh: () => void };

const cargar = <T,>(ruta: string) => import(/* webpackIgnore: true */ /* turbopackIgnore: true */ ruta) as Promise<T>;

export function KitRuntime() {
  const ruta = usePathname();
  useEffect(() => {
    let vivo = true;
    let momentos: Momentos | null = null;
    Promise.all([cargar<Momentos>("/kit/moments/moments.js"), cargar<Movimiento>("/kit/motion/motion.js")]).then(([m, mov]) => {
      if (!vivo) return;
      momentos = m;
      m.mountAll(document);
      mov.refresh();
    });
    return () => {
      vivo = false;
      momentos?.unmountAll(document);
    };
  }, [ruta]);
  return null;
}
