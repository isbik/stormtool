"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/cn";
import { useState } from "react";
import { ALL_TOOLS, CONVERTER_TOOLS, OTHER_TOOLS } from "../data/tools";
import { useLocalStorage } from "@siberiacancode/reactuse";
import { Input } from "./input";
import { Star } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";

type Props = {};

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
  const Icon = isFavorite ? StarFilledIcon : Star;

  return (
    <Link
      href={url}
      className={cn(
        "flex items-center p-1 px-2.5 text-sm rounded group",
        isActive && "bg-slate-700/50"
      )}
    >
      <span className="overflow-hidden whitespace-nowrap text-ellipsis">
        {name}
      </span>

      <Icon
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClickFavorite?.();
        }}
        className="size-4 ml-auto shrink-0 sm:hidden group-hover:block"
      />
    </Link>
  );
};

export const Sidebar = (props: Props) => {
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
    <div className="max-w-64 w-full grow shrink-0 bg-black/20 border-r border-white/30 p-2 overflow-auto">
      <Input
        placeholder="Поиск"
        className="mb-4"
        type="search"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />

      {pinned.length > 0 && (
        <div className="space-y-2 mb-4">
          <div className="flex gap-2">
            <p className="px-2 text-xs font-bold tracking-wide text-slate-400">
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

      <div className="space-y-2 mb-4">
        <p className="px-2 text-xs font-bold tracking-wide text-slate-400">
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
        <p className="px-2 text-xs font-bold tracking-wide text-slate-400">
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
