import type { Metadata } from "next";
import { Lora, Outfit } from "next/font/google";
import { MotionLayer } from "@/components/motion-layer";
import { siteConfig } from "@/lib/site";
import "./a-redesign.css";
import "./globals.css";
import "./stitch-site.css";
import "./home.css";

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
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.appName,
  title: {
    default: "BIBLION",
    template: "%s | BIBLION",
  },
  description: siteConfig.description,
  icons: {
    icon: "/logos/biblion/logo-biblion-light-app.png",
    shortcut: "/logos/biblion/logo-biblion-light-app.png",
    apple: "/logos/biblion/logo-biblion-light-app.png",
  },
  formatDetection: { email: false, address: false, telephone: false },
  category: "education",
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
        <a className="skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <MotionLayer />
        {children}
      </body>
    </html>
  );
}
