"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/cn";
import { useState } from "react";
import { ALL_TOOLS, CONVERTER_TOOLS, OTHER_TOOLS } from "../data/tools";
import { Input } from "./input";
import { ExternalLink, Star } from "lucide-react";
import { useLocalStorage } from "../hooks/use-local-storage";

const NavItem = ({
  name,
  url,
  isActive,
  isFavorite = false,
  onClickFavorite,
}: {
  name: string;
  url: string;
  isActive: boolean;
  isFavorite?: boolean;
  onClickFavorite?: () => void;
}) => {
  const isExternal = url.startsWith("https://") || url.startsWith("http://");

  return (
    <Link
      href={url}
      className={cn(
        "flex items-center p-1 px-2.5 text-sm rounded group",
        isActive && "bg-slate-700/50"
      )}
      target={isExternal ? "_blank" : "_self"}
    >
      {isExternal && <ExternalLink className="size-3 mr-2" />}
      <span className="overflow-hidden whitespace-nowrap text-ellipsis">
        {name}
      </span>

      <Star
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClickFavorite?.();
        }}
        className={cn(
          "size-4 ml-auto shrink-0 sm:hidden group-hover:block",
          isFavorite && "fill-blue-500 stroke-blue-500"
        )}
      />
    </Link>
  );
};

type Props = {
  isOpen: boolean;
};

export const Sidebar = ({ isOpen }: Props) => {
  const pathname = usePathname();
  const { value: pinned = [], set: setPinned } = useLocalStorage<string[]>(
    "pinned-tools",
    []
  );

  const displayPinned = ALL_TOOLS.filter((tool) => pinned.includes(tool.url));

  const [search, setSearch] = useState("");

  const displayConverterTools = CONVERTER_TOOLS.filter(
    (tool) => !pinned.includes(tool.url)
  ).filter((tool) => tool.name.toLowerCase().includes(search.toLowerCase()));

  const displayOtherTools = OTHER_TOOLS.filter(
    (tool) => !pinned.includes(tool.url)
  ).filter((tool) => tool.name.toLowerCase().includes(search.toLowerCase()));

  const onToggleFavorite = (url: string) => {
    const newPinned = [...pinned];
    if (newPinned.includes(url)) {
      newPinned.splice(newPinned.indexOf(url), 1);
    } else {
      newPinned.push(url);
    }

    setPinned(newPinned);
  };

  return (
    <div
      className={cn(
        "max-w-64 w-full grow shrink-0 border-r border-black/10 dark:border-white/10 p-2 overflow-auto shadow-md transition-all",
        isOpen ? "block max-md:translate-x-0" : "max-md:-translate-x-full",
        "max-md:absolute max-md:z-10 max-md:h-full bg-white dark:bg-neutral-950"
      )}
    >
      <Input
        placeholder="Поиск инструмента"
        className="mb-4"
        type="search"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />

      {pinned.length > 0 && (
        <div className="space-1-2 mb-4">
          <div className="mb-2 flex gap-2">
            <p className="px-2 text-xs font-bold tracking-wide opacity-70">
              Избранное
            </p>

            <button
              className="text-xs opacity-60 font-bold ml-auto"
              onClick={() => setPinned([])}
            >
              Очистить
            </button>
          </div>

          {displayPinned.map((tool) => {
            return (
              <NavItem
                key={tool.url}
                name={tool.name}
                url={tool.url}
                isActive={pathname === tool.url}
                isFavorite
                onClickFavorite={() => onToggleFavorite(tool.url)}
              />
            );
          })}
        </div>
      )}

      <div className="space-y-1 mb-4">
        <p className="px-2 text-xs font-bold tracking-wide opacity-70">
          Конвертация кода
        </p>
        {displayConverterTools.map((tool) => {
          return (
            <NavItem
              key={tool.url}
              name={tool.name}
              url={tool.url}
              isActive={pathname === tool.url}
              onClickFavorite={() => onToggleFavorite(tool.url)}
            />
          );
        })}
      </div>

      <div className="space-y-2">
        <p className="px-2 text-xs font-bold tracking-wide opacity-70">
          Другие инструменты
        </p>
        {displayOtherTools.map((tool) => {
          return (
            <NavItem
              key={tool.url}
              name={tool.name}
              url={tool.url}
              isActive={pathname === tool.url}
              onClickFavorite={() => onToggleFavorite(tool.url)}
            />
          );
        })}
      </div>
    </div>
  );
};
