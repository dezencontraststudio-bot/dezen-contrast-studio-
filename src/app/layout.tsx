import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Dezen Contrast Studio — Architectural Interior Design",
    template: "%s | Dezen Contrast Studio",
  },
  description:
    "Dezen Contrast Studio crafts architectural interiors defined by material tension, spatial balance, and intentional contrast. Contact: Dezencontraststudio@gmail.com | +91 96660 55462. Serving clients globally.",
  keywords: [
    "architectural interior design",
    "interior architecture",
    "luxury interiors",
    "spatial design",
    "material contrast",
    "Dezen Contrast Studio",
  ],
  authors: [{ name: "Dezen Contrast Studio" }],
  creator: "Dezen Contrast Studio",
  publisher: "Dezen Contrast Studio",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dezencontraststudio.com",
    siteName: "Dezen Contrast Studio",
    title: "Dezen Contrast Studio — Architectural Interior Design",
    description:
      "Crafting architectural interiors defined by material tension, spatial balance, and intentional contrast. Contact: Dezencontraststudio@gmail.com | +91 96660 55462",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dezen Contrast Studio — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dezen Contrast Studio",
    description:
      "Architectural interiors defined by material tension and spatial balance. Contact: Dezencontraststudio@gmail.com | +91 96660 55462",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
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
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}