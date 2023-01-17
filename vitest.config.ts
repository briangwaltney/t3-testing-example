// vite.config.ts
import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react'
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    alias: {
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
  },
});
