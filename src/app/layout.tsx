import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-reading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biblion",
  description:
    "Biblion es una app cristiana para leer la Biblia, estudiar pasajes, preparar enseñanzas y recibir apoyo bíblico contextual con Bibi.",
  icons: {
    icon: "/logos/biblion/logo-biblion-normal.png",
    shortcut: "/logos/biblion/logo-biblion-normal.png",
    apple: "/logos/biblion/logo-biblion-normal.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
