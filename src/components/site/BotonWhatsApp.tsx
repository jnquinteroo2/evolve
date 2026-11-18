import { IconoWhatsApp } from "./IconoWhatsApp";
import { enlaceWhatsApp } from "@/lib/whatsapp";

type Props = {
  mensaje?: string;
  texto?: string;
  className?: string;
  variante?: "primario" | "secundario";
  principal?: boolean;
  iconoFinal?: boolean;
};

export function BotonWhatsApp({ mensaje, texto = "Escribir por WhatsApp", className = "", variante = "primario", principal = false, iconoFinal = false }: Props) {
  return (
    <a
      href={enlaceWhatsApp(mensaje)}
      target="_blank"
      rel="noopener"
      data-accion-principal={principal ? "" : undefined}
      className={`btn ${variante === "primario" ? "btn--primary" : "btn--secondary"} ${className}`.trim()}
    >
      {iconoFinal ? null : <IconoWhatsApp />}
      <span>{texto}</span>
      {iconoFinal ? <IconoWhatsApp /> : null}
    </a>
  );
}
