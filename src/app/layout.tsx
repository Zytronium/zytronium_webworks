import type { Metadata } from "next";
import LogoLarge from '@/components/LogoLarge';
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Zytronium WebWorks",
  description: "Affordable modern websites built for the future of the internet.",
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"h-full antialiased"} >
      <body className="min-h-full flex flex-col bg-background text-foreground">
      <Header/>
        {children}
      </body>
    </html>
  );
}
