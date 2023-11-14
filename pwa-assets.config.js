import { defineConfig, minimalPreset as preset } from '@vite-pwa/assets-generator/config'
//https://github.com/vite-pwa/assets-generator#-usage
export default defineConfig({
  preset,
  images: [
    'public/logo.svg'
  ]
})