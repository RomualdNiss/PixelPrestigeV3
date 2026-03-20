export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "pp_theme";
export const THEME_CHANGE_EVENT = "pp-theme-change";
export const THEME_META_ID = "pp-theme-color";

const DARK_THEME_COLOR = "#07070b";
const LIGHT_THEME_COLOR = "#ffffff";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function getThemeColor(theme: Theme) {
  return theme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(storedTheme) ? storedTheme : null;
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const metaTheme = document.getElementById(THEME_META_ID);

  if (metaTheme instanceof HTMLMetaElement) {
    metaTheme.content = getThemeColor(theme);
  }
}

export function setTheme(theme: Theme) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function subscribeToTheme(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handleMediaChange = () => {
    if (!getStoredTheme()) {
      applyTheme(getSystemTheme());
      onStoreChange();
    }
  };

  const handleThemeChange = () => {
    applyTheme(getThemeSnapshot());
    onStoreChange();
  };

  mediaQuery.addEventListener("change", handleMediaChange);
  window.addEventListener("storage", handleThemeChange);
  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);

  return () => {
    mediaQuery.removeEventListener("change", handleMediaChange);
    window.removeEventListener("storage", handleThemeChange);
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  };
}

export const themeInitScript = `
(() => {
  const storageKey = "${THEME_STORAGE_KEY}";
  const metaId = "${THEME_META_ID}";
  const darkThemeColor = "${DARK_THEME_COLOR}";
  const lightThemeColor = "${LIGHT_THEME_COLOR}";
  const isTheme = (value) => value === "light" || value === "dark";
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  try {
    const storedTheme = window.localStorage.getItem(storageKey);
    const theme = isTheme(storedTheme) ? storedTheme : getSystemTheme();
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    const metaTheme = document.getElementById(metaId);

    if (metaTheme) {
      metaTheme.setAttribute("content", theme === "dark" ? darkThemeColor : lightThemeColor);
    }
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
  }
})();
`.trim();
