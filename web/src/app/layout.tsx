import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeInitializer } from "@/components/ThemeInitializer";
import fs from 'fs';
import path from 'path';

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'siteData.json');
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileData);
      return {
        title: data.global?.siteTitle || "Personal Brand Website",
        description: data.home?.slogan || "A showcase of my personal brand, projects, and thoughts.",
      };
    }
  } catch (e) {
    console.error("Failed to generate metadata from siteData.json", e);
  }
  
  return {
    title: "Personal Brand Website",
    description: "A showcase of my personal brand, projects, and thoughts.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${notoSansSC.variable} font-sans antialiased bg-white text-gray-900 min-h-screen flex flex-col`}
      >
        <ThemeInitializer />
        <Navbar />
        <main className="flex-grow pt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
