import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Base relativa para compatibilidad con GitHub Pages y Vercel
  base: './',

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
    open: true,
    hmr: {
      port: 5173,
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    // Optimización de chunks para Vercel
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['recharts'],
          'icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
