import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BarraAccion } from "@/components/site/BarraAccion";
import { KitRuntime } from "@/components/kit/KitRuntime";
import { sitio } from "@/lib/sitio";
import { jsonLdAgencia } from "@/lib/seo";

const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", weight: "400", style: "normal", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

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
  themeColor: "#183e32",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const scriptEntrada =
  "var l=document.createElement('link');l.rel='stylesheet';l.href='/kit/motion/motion.css';document.head.appendChild(l);document.documentElement.classList.add('m-enter','mo-js');setTimeout(function(){document.documentElement.classList.add('m-enter-done')},700);setTimeout(function(){document.documentElement.classList.add('mo-safe')},2500)";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" data-type="service" data-radius="soft" data-buttons="solid" data-motion="" className={`${newsreader.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptEntrada }} />
        <link rel="modulepreload" href="/kit/moments/moments.js" />
        <link rel="modulepreload" href="/kit/moments/lib.js" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAgencia()) }} />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <BarraAccion />
        <KitRuntime />
      </body>
    </html>
  );
}
