import type { NextConfig } from "next";

if (process.env.VERCEL && !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  throw new Error("Falta NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME en las variables de entorno de Vercel");
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/cargador-imagen.ts",
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
