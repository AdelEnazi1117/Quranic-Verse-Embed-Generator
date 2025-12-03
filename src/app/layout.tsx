import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "مولد آيات القرآن | Quranic Verse Embed Generator",
  description:
    "أنشئ آيات قرآنية قابلة للتضمين في موقعك. Generate beautiful, embeddable Quranic verses for your website.",
  keywords: [
    "Quran",
    "القرآن",
    "Islamic",
    "إسلامي",
    "Embed",
    "تضمين",
    "Verse",
    "آية",
    "Ayah",
    "Widget",
    "Arabic",
    "عربي",
  ],
  authors: [{ name: "Quranic Embed Generator" }],
  openGraph: {
    title: "مولد آيات القرآن | Quranic Verse Embed Generator",
    description:
      "أنشئ آيات قرآنية قابلة للتضمين في موقعك. Generate beautiful, embeddable Quranic verses for your website.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="bg-navy-950 text-white min-h-screen font-arabic">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
