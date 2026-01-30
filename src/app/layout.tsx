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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: '#0a0a0f', color: '#f5f5f7' }}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <div style={{ flex: 1, marginLeft: '280px' }}>
            <Header />
            <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

