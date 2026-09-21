import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Configuración para Vercel
  base: '/',
  
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Optimización de chunks para Vercel
    rollupOptions: {
      output: {
        manualChunks: {
          'charts': ['recharts'],
          'icons': ['lucide-react'],
        },
      },
    },
    // Aumentar límite de warning de chunk size
    chunkSizeWarningLimit: 1000,
  },
});
