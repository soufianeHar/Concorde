import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import NavGuard from "@/components/NavGuard";

const poppins = Poppins({ subsets: ["latin"], weight: ["400","500","600","700"] });

export const metadata: Metadata = { title: "Concorde", description: "Plateforme de matching de profils" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${poppins.className} snap`}>
        <NavGuard>
          <Navbar />
        </NavGuard>
        {children}
      </body>
    </html>
  );
}
