import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Chunks separados por vendor — el browser los cachea independientemente del código de la app
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-axios':  ['axios'],
        },
      },
    },
    // Sin sourcemaps en producción — reduce el tamaño del build
    sourcemap: false,
    // Avisar si un chunk supera los 500KB
    chunkSizeWarningLimit: 500,
  },
});
