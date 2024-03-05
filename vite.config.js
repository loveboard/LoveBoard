import { sentryVitePlugin } from "@sentry/vite-plugin";
import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin = {
  // injectRegister: 'auto',

  mode: 'development',
  base: "./",
  includeAssets: ['logo.svg'],
  //strategies : 'injectManifest',
  // registerType: "autoUpdate",
  registerType: "prompt",
  // includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png", "logo.svg"],
  manifest: {
    name: "LoveBoard",
    short_name: "LoveBoard",
    theme_color: '#ffffff',
    description: "A non-superficial dating social network.",

    icons: [
      // https://vite-pwa-org.netlify.app/assets-generator/#example-using-minimal-preset
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png'
      },
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
        purpose: "any maskable"
      },
      {
        src: 'pwa-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'apple-touch-icon-180x180.png', // <== don't remove slash, for testing
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
    ],
    // theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",

  plugins: [react(), VitePWA(manifestForPlugin), sentryVitePlugin({
    org: "sain-yu",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
})