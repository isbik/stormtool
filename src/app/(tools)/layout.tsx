import { Sidebar } from "@/shared/ui/sidebar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Storm Tool",
  description: "Storm Tool",
};

export default function ToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex grow min-h-screen flex-col max-h-screen">
      <div className="bg-black/20 min-h-8 border-b border-white/20 p-2 px-4">
        <h1 className="font-bold text-lg">
          <Link href="/">Storm Tool</Link>
        </h1>
      </div>
      <div className="flex grow">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
