import { Github } from "lucide-react";
import React from "react";
import { ThemeSwitcher } from "./theme-switcher";
import { cn } from "@/shared/lib/cn";

type Props = {
  children?: React.ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

const Header = ({ children, className, ...props }: Props) => {
  return (
    <header
      {...props}
      className={cn(
        "min-h-8 border-b p-2 px-4 shrink-0 flex items-center gap-2",
        className
      )}
    >
      {children}

      <ThemeSwitcher />

      <a
        className="ml-2"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/isbik/stormtool"
      >
        <Github />
      </a>
    </header>
  );
};

export { Header };
