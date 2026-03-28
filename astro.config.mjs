// @ts-check
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import visualizer from 'rollup-plugin-visualizer';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [vue(), sitemap()],

  vite: {
    plugins: [
      tailwindcss(),
      visualizer({
        emitFile: true,
        filename: 'stats.html',
      }),
    ],
  },
});
