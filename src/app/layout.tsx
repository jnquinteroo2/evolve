import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BarraAccion } from "@/components/site/BarraAccion";
import { sitio } from "@/lib/sitio";
import { jsonLdAgencia } from "@/lib/seo";

const jakarta = localFont({
  src: [
    { path: "./fuentes/plus-jakarta-sans-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "./fuentes/plus-jakarta-sans-latin-wght-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: { default: "Evolve | Casas, bodegas y lotes en la sabana de Bogotá", template: "%s | Evolve Inmobiliaria & Constructora" },
  description: sitio.descripcion,
  applicationName: sitio.nombre,
  openGraph: { type: "website", locale: "es_CO", siteName: sitio.nombre },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  other: { "site-kind": "other", "page-type": "service" },
};

export const viewport: Viewport = {
  themeColor: "#0f2e25",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const scriptJs = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" data-type="service" data-radius="soft" data-buttons="solid" className={`${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptJs }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAgencia()) }} />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <BarraAccion />
      </body>
    </html>
  );
}
