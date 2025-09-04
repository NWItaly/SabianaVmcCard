import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TRANSLATIONS_DIR = path.resolve(__dirname, "../src/translations");
const OUTPUT_FILE = path.resolve(__dirname, "../src/localize-keys.ts");

// Usa la lingua "en" come riferimento per le chiavi
const enFile = path.join(TRANSLATIONS_DIR, "en.json");
const enData = JSON.parse(fs.readFileSync(enFile, "utf-8"));

// Funzione ricorsiva per attraversare i JSON e costruire le chiavi
function buildKeys(obj: any, prefix: string[] = []): any {
  if (typeof obj !== "object" || obj === null) {
    return prefix.join(".");
  }

  const result: any = {};
  for (const key of Object.keys(obj)) {
    result[key] = buildKeys(obj[key], [...prefix, key]);
  }
  return result;
}

const keys = buildKeys(enData);

// Stringa TypeScript da salvare
const fileContent = `// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// Run "npm run gen:localize-keys" to regenerate

export const LOC_KEYS = ${JSON.stringify(keys, null, 2)} as const;
`;

fs.writeFileSync(OUTPUT_FILE, fileContent, "utf-8");

console.log("✅ Generated:", OUTPUT_FILE);
