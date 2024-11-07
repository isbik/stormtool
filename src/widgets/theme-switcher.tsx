"use client";

import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { Moon, Sun, SunMoon } from "lucide-react";
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
    <Switch
      onClick={theme === "light" ? setDarkTheme : setLightTheme}
      className="ml-auto"
      checked={theme === "dark"}
    >
      {theme === "light" ? (
        <Sun className="size-3 text-white" />
      ) : (
        <Moon className="text-black size-3" />
      )}
    </Switch>
  );
}
