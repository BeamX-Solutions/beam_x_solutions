import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // lucide-react is deliberately NOT excluded from optimizeDeps. Excluded, the
  // dev server loads every icon as its own file, and privacy blockers (Firefox
  // tracking protection, uBlock) block icons/fingerprint.js by name, which
  // fails the whole module graph and leaves a white screen in dev.
  ssr: {
    // Bundle every dependency into the prerender build. Several UI packages
    // (and their transitive deps) are CommonJS; left external, Node's ESM
    // loader cannot take named/default imports from them and prerendering
    // dies. Nothing here is native or Node-only, so bundling all of it is
    // safe, and this bundle is a build artifact that never ships to users.
    noExternal: true,
  },
  build: {
    // manualChunks only applies to the client build; in the SSR build these
    // packages are external, and naming them there is a hard error.
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            // Splits the former single ~700kB chunk so the initial paint is
            // not gated on parsing animation and markdown code.
            manualChunks: {
              react: ['react', 'react-dom', 'react-router-dom'],
              motion: ['framer-motion'],
              markdown: ['react-markdown'],
            },
          },
        },
  },
}));
