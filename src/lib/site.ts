import type { Metadata } from "next";

const fallbackUrl = "https://biblion-web-roan.vercel.app";

export const siteConfig = {
  name: "BIBLION",
  appName: "BIBLION App",
  url: (process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl).replace(/\/$/u, ""),
  description:
    "BIBLION App reúne lectura, búsqueda, conexiones bíblicas, Bibi y Modo estudio en una experiencia portátil para Android.",
  socialImage: "/logos/biblion/logo-biblion-blue.jpeg",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = new URL(path, `${siteConfig.url}/`).toString();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "es_CO",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [
        {
          url: siteConfig.socialImage,
          width: 1254,
          height: 1254,
          alt: "Logo de BIBLION",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.socialImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
