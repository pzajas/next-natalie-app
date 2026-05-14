/**
 * WebP z PNG: `public/images/gallery/*` oraz `Interior.png`, `Flowers.png`.
 * Uruchom: npm run assets:webp
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");

const webpOpts = { quality: 80, effort: 6, smartSubsample: true };

async function toWebp(inputPath) {
  const base = path.basename(inputPath, path.extname(inputPath));
  const dir = path.dirname(inputPath);
  const outPath = path.join(dir, `${base}.webp`);
  await sharp(inputPath).webp(webpOpts).toFile(outPath);
  const inB = fs.statSync(inputPath).size;
  const outB = fs.statSync(outPath).size;
  console.log(`${path.relative(root, outPath)}  ${(outB / 1024).toFixed(0)} KiB  (was ${(inB / 1024).toFixed(0)} KiB)`);
}

const galleryDir = path.join(imagesDir, "gallery");
const galleryPngs = fs
  .readdirSync(galleryDir)
  .filter((f) => f.endsWith(".png"))
  .map((f) => path.join(galleryDir, f));

const extras = ["Interior.png", "Flowers.png"].map((f) => path.join(imagesDir, f));

for (const file of [...galleryPngs, ...extras]) {
  if (!fs.existsSync(file)) {
    continue;
  }
  await toWebp(file);
}

console.log("Done.");
