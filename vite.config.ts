import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Rejoue /api/tipeee en dev — la fonction serverless n'existe qu'une fois déployée.
function tipeeeDevApi() {
  return {
    name: 'tipeee-dev-api',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use('/api/tipeee', async (_req, res) => {
        res.setHeader('content-type', 'application/json');
        try {
          const r = await fetch('https://api.tipeee.com/v2.0/projects/thinkerview', {
            headers: { accept: 'application/json' },
          });
          const d = await r.json();
          const tipeurs = Number(d?.parameters?.tipperNumber);
          const montantMensuel = Number(d?.parameters?.tipperAmount);
          if (!Number.isFinite(tipeurs) || !Number.isFinite(montantMensuel)) {
            res.statusCode = 502;
            res.end(JSON.stringify({ error: 'shape' }));
            return;
          }
          res.end(JSON.stringify({ tipeurs, montantMensuel, updatedAt: new Date().toISOString() }));
        } catch {
          res.statusCode = 502;
          res.end(JSON.stringify({ error: 'fetch' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tipeeeDevApi()],
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
