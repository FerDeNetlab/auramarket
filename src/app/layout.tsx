import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema Aura | Aura Market Admin",
  description: "Dashboard de administración de e-commerce para Aura Market. Gestión de proveedores y sincronización con marketplaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-surface-1`}
      >
        <div className="min-h-screen">
          <Sidebar />
          {/* Main content area - responsive margin for sidebar */}
          <div className="pt-14 md:pt-0 md:ml-64 lg:ml-72 min-h-screen">
            <Header />
            <main className="md:pt-16 p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
