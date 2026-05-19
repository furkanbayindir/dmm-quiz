import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DMM Gençlik Zirvesi — Medya Okuryazarlığı Bilgi Yarışması",
  description: "Dezenformasyon ve medya okuryazarlığı kavramlarını test edin!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
