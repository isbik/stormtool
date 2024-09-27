import { Sidebar } from "@/shared/ui/sidebar";
import { ThemeSwitcher } from "@/widgets/theme-switcher";

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
    <main className="flex grow h-full flex-col max-h-screen overflow-hidden">
      <div className="min-h-8 border-b dark:border-black/20 p-2 px-4 shrink-0 flex items-center gap-2 border-white/20">
        <h1 className="font-bold text-lg">
          <Link href="/">Storm Tool</Link>
        </h1>
        <ThemeSwitcher />
      </div>

      <div className="flex grow overflow-hidden">
        <Sidebar />
        <div className="flex overflow-auto grow flex-col">{children}</div>
      </div>
    </main>
  );
}
