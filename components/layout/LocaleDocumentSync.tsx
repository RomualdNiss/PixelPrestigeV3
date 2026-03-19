"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

type LocaleDocumentSyncProps = {
  locale: Locale;
};

export function LocaleDocumentSync({ locale }: LocaleDocumentSyncProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
