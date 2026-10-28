import type { Metadata } from "next";
import localFont from "next/font/local";
import { site, asset } from "@/data/site";
import { BrandSprite } from "@/components/brands";
import { Header, Footer, MotionEngine, Cursor } from "@/components/shell";
import "./globals.css";
const geist = localFont({
  src: "../../public/fonts/Geist.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
});
const mono = localFont({
  src: "../../public/fonts/GeistMono.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bilal Hassan — Interfaces & Systems",
    template: "%s — Bilal Hassan",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [{ url: `${site.url}/og.png`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: asset("/apple-icon.png"), apple: asset("/apple-icon.png") },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{document.documentElement.dataset.theme='light'}`,
          }}
        />
      </head>
      <body className={`${geist.variable} ${mono.variable}`}>
        <BrandSprite />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionEngine />
        <Cursor />
      </body>
    </html>
  );
}
