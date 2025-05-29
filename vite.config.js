import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Finly",
        short_name: "Finly",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#222222",
        description: "Финансовый трекер Finly",
        icons: [
          {
            src: "/icons/finly-icon-mini.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/finly-icon-max.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 МБ
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/normalize" as *;
          @use "@/styles/variables" as *;
          @use "@/styles/helpers" as *;
          @use "@/styles/utils" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
