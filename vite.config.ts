import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [tailwindcss()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  build: {
    outDir: "static/inventory-ui",
    emptyOutDir: true,
    lib: {
      entry: "frontend/inventory.tsx",
      formats: ["es"],
      fileName: () => "inventory.js",
      cssFileName: "inventory",
    },
  },
});
