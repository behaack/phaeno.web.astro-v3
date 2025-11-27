import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import tailwind from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://phaeno-test-v3.cadexgenomics.com',
  trailingSlash: 'ignore',
  output: 'static',
  redirects: {
    "/about": "/about/about-us"
  },
  integrations: [
    react(), 
    sitemap(),
    (await import("astro-compress")).default(),    
  ],
  vite: {
    build: {
      minify: 'esbuild' // or 'terser' if needed
    },      
    plugins: [
      tailwind()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },    
  },
});