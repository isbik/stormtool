import { ALL_TOOLS, CONVERTER_TOOLS, OTHER_TOOLS } from "@/shared/data/tools";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  Sidebar,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/shared/ui/sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NavItem } from "./nav-item";
import { Input } from "@/shared/ui/input";

export function AppSidebar() {
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
    <Sidebar>
      <SidebarHeader>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Поиск"
          type="search"
        />
      </SidebarHeader>
      <SidebarContent>
        {pinned.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Избранное</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {displayPinned.map((tool) => (
                  <NavItem
                    key={tool.name}
                    {...tool}
                    isFavorite
                    isActive={pathname === tool.url}
                    onClickFavorite={() => onToggleFavorite(tool.url)}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <SidebarGroup>
          <SidebarGroupLabel>Конвертация кода</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {displayConverterTools.map((tool) => (
                <NavItem
                  key={tool.name}
                  {...tool}
                  isActive={pathname === tool.url}
                  onClickFavorite={() => onToggleFavorite(tool.url)}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Другие инструменты</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {displayOtherTools.map((tool) => (
                <NavItem
                  key={tool.name}
                  {...tool}
                  isActive={pathname === tool.url}
                  onClickFavorite={() => onToggleFavorite(tool.url)}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
