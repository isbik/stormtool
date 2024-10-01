"use client";

import { Button } from "@/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function setLightTheme() {
    setTheme("light");
  }
  function setDarkTheme() {
    setTheme("dark");
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={theme === "light" ? setDarkTheme : setLightTheme}
            className="ml-auto"
            variant={"outline"}
            size={"icon"}
          >
            <SunMoon className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Переключить тему</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
