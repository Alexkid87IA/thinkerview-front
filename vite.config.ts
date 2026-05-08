import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash:8].js',
        entryFileNames: 'assets/[name]-[hash:8].js',
        assetFileNames: 'assets/[name]-[hash:8].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'vendor-react';
          if (id.includes('node_modules/react-router')) return 'vendor-router';
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons';
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion';
        },
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    cssCodeSplit: true,
  },
});
