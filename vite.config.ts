import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
  define: {
    __CARD_VERSION__: JSON.stringify(`${pkg.version}.${Date.now()}`),
  },
  build: {
    lib: {
      entry: "src/sabiana-vmc-card.ts",
      name: "SabianaVmcCard",
      fileName: "sabiana-vmc-card",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["fsevents"],  // 👈 ignora fsevents
    },
  },
});
