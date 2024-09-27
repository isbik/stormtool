import { cn } from "@/shared/lib/cn";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Metadata } from "next";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Storm Tool",
  description: "Storm Tool",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <body className={cn("min-h-screen", inter.className)}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
