"use client";

import React from "react";
import Link from "next/link";
import { CONVERTER_TOOLS, OTHER_TOOLS } from "@/shared/data/tools";
import { ExternalLink } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Header } from "@/widgets/header";

type Props = {};

const IndexPage = (props: Props) => {
  const Card = ({ name, description, url, icon: Icon }: any) => {
    const isExternal = url.startsWith("http");

    return (
      <Link
        href={url}
        className={cn(
          "rounded p-4 border min-h-32 flex flex-col bg-background/20 hover:bg-background/30 transition-colors",
          isExternal && "bg-background/5"
        )}
        target={isExternal ? "_blank" : "_self"}
      >
        <div className="flex items-center gap-3 mb-auto">
          <Icon className="size-4" />

          <h3 className="text-xl font-bold mr-auto">{name}</h3>

          {isExternal && <ExternalLink className="size-4" />}
        </div>
        <p className="opacity-80">{description}</p>
      </Link>
    );
  };

  return (
    <>
      <Header>
        <div className="max-w-6xl ml-auto">
          <p className="max-md:text-sm">
            Storm Tool — это бесплатные инструменты для разработки.
          </p>
        </div>
      </Header>

      <div className="max-w-6xl mx-auto p-4">
        <div className="py-12 sm:py-32">
          <h1 className="text-5xl font-bold mb-8">Storm Tool</h1>
          <p className="max-w-2xl">
            Лучшие бесплатные онлайн-инструменты для веб-разработки, которые
            помогут вам быстрее учиться, создавать креативные проекты и работать
            продуктивнее. Обязательно сохраните их в закладках браузера, чтобы
            всегда иметь под рукой!
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-24 mb-4">Инструменты и сервисы</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {OTHER_TOOLS.map((service) => (
            <Card key={service.url} {...service} />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Конвертация кода</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONVERTER_TOOLS.map((tool) => (
            <Card key={tool.url} {...tool} />
          ))}
        </div>
      </div>

      <footer className="text-center text-sm text-slate-200 mt-32 bg-black/50 py-3 border-t border-white/20">
        Copyright {new Date().getFullYear()} Storm Tool. All rights reserved.
      </footer>
    </>
  );
};

export default IndexPage;
