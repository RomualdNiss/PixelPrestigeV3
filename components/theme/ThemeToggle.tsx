"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n";
import { getThemeSnapshot, setTheme, subscribeToTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  locale: Locale;
  className?: string;
};

const labels = {
  fr: {
    dark: "Activer le mode sombre",
    light: "Activer le mode clair",
  },
  en: {
    dark: "Enable dark mode",
    light: "Enable light mode",
  },
} as const;

export function ThemeToggle({ locale, className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => "dark");
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = labels[locale][nextTheme];
  const Icon = theme === "dark" ? Moon : Sun;

  return (
    <button
      type="button"
      className={cn("theme-toggle", className)}
      aria-label={label}
      title={label}
      onClick={() => setTheme(nextTheme)}
    >
      <Icon aria-hidden className="h-[1.05rem] w-[1.05rem]" />
    </button>
  );
}
