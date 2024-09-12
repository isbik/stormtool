import { Sidebar } from "@/shared/ui/sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Storm Tool",
  description: "Storm Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex grow min-h-screen">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
