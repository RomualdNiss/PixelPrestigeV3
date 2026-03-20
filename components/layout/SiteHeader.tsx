"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { localizedPath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/types/content";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const headerLabels: Record<
  Locale,
  {
    closeMenu: string;
    mobileMenu: string;
    navigation: string;
    openMenu: string;
  }
> = {
  fr: {
    closeMenu: "Fermer le menu",
    mobileMenu: "Menu principal",
    navigation: "Navigation principale",
    openMenu: "Ouvrir le menu",
  },
  en: {
    closeMenu: "Close menu",
    mobileMenu: "Main menu",
    navigation: "Primary navigation",
    openMenu: "Open menu",
  },
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isCompact, setIsCompact] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const labels = headerLabels[locale];
  const isCondensed = isCompact || isMenuOpen;
  const headerVars = {
    "--active-header-height": isCondensed ? "var(--header-height-compact)" : "var(--header-height)",
  } as CSSProperties;
  const panelTransition = reducedMotion
    ? ({ duration: 0.14 } as const)
    : ({ type: "spring" as const, stiffness: 310, damping: 30, mass: 0.9 } as const);
  const staggerTransition = reducedMotion
    ? { duration: 0.14 }
    : { delayChildren: 0.08, staggerChildren: 0.045 };

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        style={headerVars}
        className={cn(
          "sticky top-0 z-[95] border-b transition-[background-color,border-color,box-shadow] duration-200",
          isCondensed
            ? "border-border bg-bg/82 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
            : "border-border-soft bg-bg/68 backdrop-blur-xl",
        )}
      >
        <div
          className={cn(
            "container-default flex h-[var(--active-header-height)] items-center justify-between gap-4 transition-[height,padding] duration-200",
            isCondensed ? "py-3" : "py-4",
          )}
        >
          <Link href={localizedPath(locale, "/")} className="flex shrink-0 items-center">
            <Image
              src="/assets/img/logo_complet.svg"
              alt="Pixel Prestige"
              width={494}
              height={161}
              priority
              className={cn(
                "h-auto transition-[width] duration-200",
                isCondensed ? "w-[124px] sm:w-[140px]" : "w-[132px] sm:w-[148px]",
              )}
            />
          </Link>

          <nav aria-label={labels.navigation} className="hidden items-center gap-6 md:flex">
            {dictionary.nav.map((item) => {
              const href = localizedPath(locale, item.href);
              const isActive = pathname === href;

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    "text-sm transition-colors hover:text-text",
                    isActive ? "text-text" : "text-text-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LocaleSwitcher locale={locale} label={dictionary.common.localeSwitch} />
            <ThemeToggle locale={locale} />
            <Link href={localizedPath(locale, "/contact")} className="btn-primary text-sm md:inline-flex">
              {dictionary.common.ctaContact}
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? labels.closeMenu : labels.openMenu}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="theme-icon-button h-11 w-11"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <div className="md:hidden">
            <motion.button
              key="mobile-menu-backdrop"
              type="button"
              aria-label={labels.closeMenu}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[96] bg-overlay backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.14 : 0.22, ease: "easeOut" }}
            />

            <div className="fixed inset-0 z-[97] flex items-center justify-center px-4 py-4 pointer-events-none">
              <motion.div
                key="mobile-menu-panel"
                id="mobile-navigation"
                role="dialog"
                aria-modal="true"
                aria-label={labels.mobileMenu}
                className="pointer-events-auto relative w-full max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[1.6rem] border border-border bg-surface-strong shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -12, clipPath: "inset(0 0 100% 0 round 1.6rem)" }
                }
                animate={
                  reducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 1.6rem)" }
                }
                exit={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -8, clipPath: "inset(0 0 100% 0 round 1.6rem)" }
                }
                transition={panelTransition}
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand/80 to-transparent"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scaleX: 0.35 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0 }}
                  transition={reducedMotion ? { duration: 0.14 } : { duration: 0.28, delay: 0.06, ease: "easeOut" }}
                />
                <motion.div
                  className="flex flex-col p-5"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    visible: {},
                  }}
                  transition={staggerTransition}
                >
                  <motion.div
                    className="flex items-center justify-between gap-4 border-b border-border-soft pb-4"
                    variants={{
                      hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: reducedMotion ? 0.14 : 0.24, ease: "easeOut" }}
                  >
                    <p className="text-[0.7rem] uppercase tracking-[0.22em] text-text-muted">{labels.mobileMenu}</p>
                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="theme-icon-button h-10 w-10"
                    >
                      <X className="h-[18px] w-[18px]" />
                    </button>
                  </motion.div>

                  <motion.nav
                    aria-label={labels.navigation}
                    className="mt-6 flex flex-col gap-2"
                    variants={{
                      hidden: {},
                      visible: {},
                    }}
                    transition={staggerTransition}
                  >
                    {dictionary.nav.map((item) => {
                      const href = localizedPath(locale, item.href);
                      const isActive = pathname === href;

                      return (
                        <motion.div
                          key={item.href}
                          className="relative w-full"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                          }}
                          transition={{ duration: reducedMotion ? 0.14 : 0.22, ease: "easeOut" }}
                        >
                          <Link
                            href={href}
                            onClick={() => setIsMenuOpen(false)}
                            className={cn(
                              "flex w-full items-center rounded-[1.15rem] border px-4 py-4 text-lg font-medium leading-[1.15] transition-colors",
                              isActive
                                ? "border-brand/40 bg-brand/18 text-white"
                                : "border-border-soft bg-surface-subtle text-text-muted hover:border-brand/35 hover:text-text",
                            )}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.nav>

                  <motion.div
                    className="mt-5 flex flex-col gap-4 pt-5"
                    variants={{
                      hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: reducedMotion ? 0.14 : 0.24, ease: "easeOut", delay: reducedMotion ? 0 : 0.06 }}
                  >
                    <div className="flex items-center gap-3">
                      <LocaleSwitcher
                        locale={locale}
                        label={dictionary.common.localeSwitch}
                        onNavigate={() => setIsMenuOpen(false)}
                      />
                      <ThemeToggle locale={locale} />
                    </div>
                    <Link
                      href={localizedPath(locale, "/contact")}
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-primary w-full justify-center"
                    >
                      {dictionary.common.ctaContact}
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
