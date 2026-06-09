import fs from "node:fs";
import path from "node:path";

// La convention Next `opengraph-image` génère des fichiers PNG SANS extension
// (ex. out/fr/blog/<slug>/opengraph-image). En hébergement statique (Apache),
// un fichier sans extension n'a pas de Content-Type fiable. On copie donc chaque
// fichier vers `<nom>.png` pour garantir un MIME correct ; les métadonnées des
// articles référencent l'URL en .png.
const outDir = path.join(process.cwd(), "out");
let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(entryPath);
      continue;
    }

    if (entry.name === "opengraph-image" || entry.name === "twitter-image") {
      const target = `${entryPath}.png`;
      fs.copyFileSync(entryPath, target);
      copied += 1;
    }
  }
}

if (fs.existsSync(outDir)) {
  walk(outDir);
}

console.log(`[copy-og-images] ${copied} image(s) OG copiée(s) en .png`);
