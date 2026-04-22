import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TheGuide — AI Travel Companion per l'Italia",
  description:
    "Mockup interattivo di TheGuide: l'AI travel companion che trasforma l'Italia in un'esperienza personalizzata, immersiva e senza attriti.",
  authors: [{ name: "Jacopo Quaresima" }],
  keywords: [
    "TheGuide",
    "travel",
    "AI",
    "Italia",
    "turismo",
    "Iris",
    "TravelPass",
    "pitch",
    "demo"
  ],
  openGraph: {
    title: "TheGuide — AI Travel Companion per l'Italia",
    description:
      "L'AI travel companion italiana. Demo mobile interattiva del prodotto 2026.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FBF7F1"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
