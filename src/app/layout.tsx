import { cn } from "@/shared/lib/cn";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen dark", inter.className)}>
        {children}
      </body>
    </html>
  );
}
