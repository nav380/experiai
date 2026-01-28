import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ command }) => {
  const isVercel = process.env.VERCEL === "1";

  return {
    root: path.resolve(__dirname, "client"),
    base: isVercel ? "/" : "./",  // use absolute paths on Vercel
    plugins: [react(), tailwindcss()],
    publicDir: path.resolve(__dirname, "client", "public"),
    build: {
      outDir: path.resolve(__dirname, isVercel ? "dist" : "client/dist"),
      emptyOutDir: true,
      chunkSizeWarningLimit: 2000
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
  };
});
