type Props = { alto?: number; className?: string; tono?: "color" | "crema" };

export function Logo({ alto = 64, className, tono = "color" }: Props) {
  const ancho = Math.round((alto * 5992) / 2816);
  const base = tono === "crema" ? "/marca/evolve-logo-crema" : "/marca/evolve-logo";
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${base}-240.webp 240w, ${base}-480.webp 480w, ${base}-960.webp 960w, ${base}-1920.webp 1920w`} sizes={`${ancho}px`} />
      <img src={`${base}-480.png`} srcSet={`${base}-480.png 480w, ${base}-960.png 960w`} sizes={`${ancho}px`} alt="Evolve" width={ancho} height={alto} decoding="async" />
    </picture>
  );
}
