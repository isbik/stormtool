import { cn } from "@/shared/lib/cn";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@/shared/ui/sidebar";
import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";

export const NavItem = ({
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
    <SidebarMenuItem className="group/item">
      <SidebarMenuButton asChild isActive={isActive}>
        <Link
          href={url}
          className={cn("flex items-center rounded")}
          target={isExternal ? "_blank" : "_self"}
        >
          {isExternal && <ExternalLink className="size-3" />}
          <span className="overflow-hidden whitespace-nowrap text-ellipsis">
            {name}
          </span>
        </Link>
      </SidebarMenuButton>
      <SidebarMenuAction
        onClick={() => {
          onClickFavorite?.();
        }}
      >
        <Star
          className={cn(
            "size-3 shrink-0 sm:hidden group-hover/item:block",
            isFavorite && "fill-blue-500 stroke-blue-500"
          )}
        />
      </SidebarMenuAction>
    </SidebarMenuItem>
  );
};
