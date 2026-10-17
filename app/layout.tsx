import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const SITE_URL = "https://candia-burger-menu.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Candia Burger - Menú",
  description: "Menú digital de Candia Burger. Pedí por WhatsApp.",
  openGraph: {
    title: "Candia Burger - Menú",
    description: "Menú digital de Candia Burger. Pedí por WhatsApp.",
    url: SITE_URL,
    siteName: "Candia Burger",
    locale: "es_PY",
    type: "website",
    images: [{ url: "/images/logo.jpeg", width: 1508, height: 1508, alt: "Candia Burger" }],
  },
  twitter: {
    card: "summary",
    title: "Candia Burger - Menú",
    description: "Menú digital de Candia Burger. Pedí por WhatsApp.",
    images: ["/images/logo.jpeg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${bebasNeue.variable} ${dmSans.variable} min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
