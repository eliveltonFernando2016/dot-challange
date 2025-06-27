import type { CreateAxiosDefaults } from 'axios'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  plugins: [
    '~/plugins/axios',
    '~/plugins/loading.client'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_APP_API_URL,
      token: process.env.NUXT_APP_ACCESS_TOKEN,
      axios: <CreateAxiosDefaults>{
        baseURL: process.env.NUXT_APP_API_URL,
        timeout: 30000,
      },
    }
  },
  pinia: {
    storesDirs: ['./store/**'],
  },
})