import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Export statique : `images.unoptimized` est imposé, Next ne génère donc ni WebP
// ni redimensionnement. Ce script optimise en amont les logos clients raster :
// il produit un `<nom>.webp` redimensionné (les tuiles du marquee les affichent à
// ~36 px de haut) à côté de la source. Idempotent : on saute si le .webp est plus
// récent que la source. Les SVG sont laissés tels quels.
const clientsDir = path.join(process.cwd(), "public", "assets", "img", "clients");
const RASTER_EXT = new Set([".png", ".jpg", ".jpeg"]);
const MAX_HEIGHT = 120; // ~36 px affichés × 3 pour le retina
const QUALITY = 80;

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} Ko`;
}

async function run() {
  if (!fs.existsSync(clientsDir)) {
    console.log("[optimize-images] dossier clients introuvable, rien à faire");
    return;
  }

  let optimized = 0;
  let skipped = 0;

  for (const entry of fs.readdirSync(clientsDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (!RASTER_EXT.has(ext)) continue;

    const source = path.join(clientsDir, entry.name);
    const target = path.join(clientsDir, `${path.basename(entry.name, ext)}.webp`);

    if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= fs.statSync(source).mtimeMs) {
      skipped += 1;
      continue;
    }

    const before = fs.statSync(source).size;
    await sharp(source)
      .resize({ height: MAX_HEIGHT, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(target);
    const after = fs.statSync(target).size;

    optimized += 1;
    console.log(
      `[optimize-images] ${entry.name} → ${path.basename(target)} : ${formatKb(before)} → ${formatKb(after)}`,
    );
  }

  console.log(`[optimize-images] ${optimized} image(s) optimisée(s), ${skipped} à jour`);
}

run().catch((error) => {
  console.error("[optimize-images] échec :", error);
  process.exit(1);
});
