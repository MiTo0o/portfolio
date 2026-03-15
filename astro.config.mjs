import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from 'tailwindcss';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://portfolio.derzan.dev',
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()]
  }
});