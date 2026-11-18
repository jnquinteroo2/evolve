type Props = { variante?: "color" | "crema" };

export function Logo({ variante = "color" }: Props) {
  const base = variante === "color" ? "/marca/evolve-logo" : "/marca/evolve-logo-crema";
  return (
    <picture>
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img src={`${base}.png`} alt="" width={480} height={222} decoding="async" />
    </picture>
  );
}
