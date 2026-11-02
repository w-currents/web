import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://w-currents.cl',
  output: 'static', // páginas estáticas; solo /api/* corre en servidor (prerender = false)
  adapter: vercel(),
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  trailingSlash: 'never',
})
