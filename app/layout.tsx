import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://inside-react.vercel.app"),
  title: "Inside React | Sanku's Blog",
  description: "Deep dives into React internals, Fiber architecture, and modern web development",
  generator: "v0.app",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inside-react.vercel.app",
    siteName: "Inside React",
    title: "Inside React | Sanku's Blog",
    description: "Deep dives into React internals, Fiber architecture, and modern web development",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inside React - Sanku's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inside React | Sanku's Blog",
    description: "Deep dives into React internals, Fiber architecture, and modern web development",
    images: ["/og-image.png"],
    creator: "@user_sankalpa",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased min-h-screen">
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
