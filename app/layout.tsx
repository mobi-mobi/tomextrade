import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TomexTrade - Prémiové hygienické produkty",
  description:
    "Prémiové hygienické produkty pre vaše podnikanie. Kvalitné utierky, dávkovače a ostatné hygienické produkty, ktoré udržujú vaše pracovisko čisté, bezpečné a v súlade s najvyššími štandardmi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
