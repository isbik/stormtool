"use client";

import { Switch } from "@/shared/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import React from "react";

const ThemeSwitcherComponent = () => {
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
};

const ThemeSwitcher = dynamic(() => Promise.resolve(ThemeSwitcherComponent), {
  ssr: false,
});

export { ThemeSwitcher };
