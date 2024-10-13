"use client";
import { ALL_TOOLS } from "@/shared/data/tools";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { Sidebar } from "@/shared/ui/sidebar";
import { ThemeSwitcher } from "@/widgets/theme-switcher";
import { Github, Menu, X } from "lucide-react";
import Head from "next/head";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [router]);

  const tool = ALL_TOOLS.find((tool) => {
    return tool.url === router;
  });

  return (
    <>
      {tool && (
        <Head>
          <title>{tool?.name}</title>
          <meta name="description" content={tool?.description} />
        </Head>
      )}
      <main className="flex grow h-full flex-col max-h-screen overflow-hidden">
        <div className="min-h-8 border-b border-black/20 p-2 px-4 shrink-0 flex items-center gap-2 dark:border-white/20">
          <Button
            className="md:hidden shrink-0"
            onClick={() => setOpen(!open)}
            variant={"ghost"}
            size={"icon"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
          <h1 className="font-bold sm:text-lg overflow-hidden whitespace-nowrap text-ellipsis">
            <Link href="/">Storm Tool</Link>
            {tool && ` ❘ ${tool.name}`}
          </h1>
          <ThemeSwitcher />
          <a href="https://github.com/isbik/stormtool">Github</a>
        </div>

        <div className="flex grow overflow-hidden relative">
          <Sidebar isOpen={open} />
          <div
            className={cn(
              "flex overflow-auto grow flex-col",
              open && "max-md:opacity-50 max-md:pointer-events-none"
            )}
          >
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
