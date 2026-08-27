import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BIBLION",
    short_name: "BIBLION",
    description: "Ve más allá de la lectura con BIBLION App.",
    start_url: "/",
    display: "standalone",
    background_color: "#061a31",
    theme_color: "#082b4f",
    lang: "es-CO",
    icons: [
      {
        src: "/logos/biblion/logo-biblion-light-app.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logos/biblion/logo-biblion-dark-app.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
