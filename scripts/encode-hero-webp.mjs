/**
 * Jednorazowo / po zmianie Hero.png: generuje public/images/Hero.webp (dla LCP + Next Image).
 * Uruchom: node scripts/encode-hero-webp.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "public", "images", "Hero.png");
const output = path.join(root, "public", "images", "Hero.webp");

await sharp(input)
  /** Max szerokość jak `.content-container` (1200px) — mniejszy plik + zgodność z `sizes` w hero. */
  .resize(1200, null, { withoutEnlargement: true, fit: "inside" })
  .webp({ quality: 82, effort: 6, smartSubsample: true })
  .toFile(output);

const fs = await import("node:fs");
const inB = fs.statSync(input).size;
const outB = fs.statSync(output).size;
console.log(`Hero.webp written: ${(outB / 1024).toFixed(0)} KiB (was PNG ${(inB / 1024).toFixed(0)} KiB)`);
