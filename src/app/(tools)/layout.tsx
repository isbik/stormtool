import { Sidebar } from "@/shared/ui/sidebar";
import type { Metadata } from "next";

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
    <>
      <main className="flex grow min-h-screen">
        <Sidebar />
        {children}
      </main>
    </>
  );
}
