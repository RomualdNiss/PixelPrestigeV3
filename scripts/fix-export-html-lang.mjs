import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const localeDirs = [
  { locale: "fr", dir: path.join(outDir, "fr") },
  { locale: "en", dir: path.join(outDir, "en") },
];

function walkHtmlFiles(dir, locale) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkHtmlFiles(entryPath, locale);
      continue;
    }

    if (!entry.name.endsWith(".html")) {
      continue;
    }

    const html = fs.readFileSync(entryPath, "utf8");
    const nextHtml = html.replace(/<html lang="[^"]+"/, `<html lang="${locale}"`);

    if (nextHtml !== html) {
      fs.writeFileSync(entryPath, nextHtml, "utf8");
    }
  }
}

if (fs.existsSync(outDir)) {
  for (const { dir, locale } of localeDirs) {
    if (fs.existsSync(dir)) {
      walkHtmlFiles(dir, locale);
    }
  }
}
