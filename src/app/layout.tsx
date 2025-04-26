import type { Metadata } from "next";
//import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import type React from "react"; // Import React
//import { cn } from "@/lib/utils";

//const bricolageGrotesque = Bricolage_Grotesque({
//  subsets: ["latin"],
//  display: "swap",
//});

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { Toaster } from "sonner";

// Ces métadonnées sont utilisées par défaut pour toutes les pages
// Elles peuvent être surchargées par les métadonnées des pages individuelles
export const metadata: Metadata = {
  title: {
    template: "%s | SantéApp",
    default: "SantéApp - Votre compagnon de santé personnel",
  },
  description: "Suivez vos objectifs de santé et votre bien-être",
  keywords: ["santé", "bien-être", "nutrition", "exercice", "suivi de santé"],
  authors: [{ name: "SantéApp Team" }],
  creator: "SantéApp",
  openGraph: {
    title: "SantéApp - Votre compagnon de santé personnel",
    description: "Suivez vos objectifs de santé et votre bien-être",
    images: ["/og-image.jpg"],
  },
};

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
