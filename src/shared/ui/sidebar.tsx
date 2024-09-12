"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/cn";

type Props = {};

const TOOLS = [
  {
    name: "CSS TO JS (React styles)",
    url: "css-to-js",
  },
  {
    name: "URL parser",
    url: "url-parser",
  },
  {
    name: "HTML to JSX",
    url: "html-to-jsx",
  },
  {
    name: "JSON to XML",
    url: "json-to-xml",
  },
  {
    name: "CSV to JSON",
    url: "csv-to-json",
  },
  {
    name: "XML to JSON",
    url: "xml-to-json",
  },
  {
    name: "JavaScript to TypeScript",
    url: "js-object-to-typescript",
  },
  {
    name: "JavaScript to JSON",
    url: "js-object-to-json",
  },
];

export const Sidebar = (props: Props) => {
  const pathname = usePathname();
  console.log("🚀 ~ Sidebar ~ pathname:", pathname);

  return (
    <div className="max-w-64 border-r border-r-slate-200 block w-full shrink-0">
      <h1 className="p-2 font-bold text-lg text-center">
        <Link href="/">Storm Tool</Link>
      </h1>

      {TOOLS.map((tool) => {
        return (
          <Link
            href={`/${tool.url}`}
            className={cn(
              "block p-2 border-l-4",
              pathname === `/${tool.url}` && "border-l-blue-500 bg-blue-100"
            )}
            key={tool.url}
          >
            {tool.name}
          </Link>
        );
      })}
    </div>
  );
};
