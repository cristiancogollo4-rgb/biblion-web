import type { Metadata } from "next";
import { Lora, Outfit } from "next/font/google";
import { MotionLayer } from "@/components/motion-layer";
import "./a-redesign.css";
import "./globals.css";
import "./stitch-site.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-scripture",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BIBLION",
    template: "%s | BIBLION",
  },
  description:
    "BIBLION es una aplicación de lectura y estudio bíblico para Android. Lee, descubre conexiones, conversa con Bibi y prepara enseñanzas.",
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
    <html
      lang="es"
      className={`${outfit.variable} ${lora.variable}`}
      data-theme="blue"
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('biblion-web-theme');if(t==='light'||t==='blue'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}})();",
          }}
        />
        <MotionLayer />
        {children}
      </body>
    </html>
  );
}
