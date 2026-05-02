// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss'
  ],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      Poppins: [300, 400, 500, 600, 700],
      'Plus+Jakarta+Sans': [400, 500, 600, 700, 800]
    },
    display: 'swap'
  },
  auth: {
    baseURL: '/api/auth',
    provider: {
      type: 'authjs',
      trustHost: true,
      defaultProvider: 'github'
    },
    globalAppMiddleware: {
      isEnabled: false
    }
  },



  seo: {
    redirectToCanonicalSiteUrl: true
  },
  ogImage: {
    zeroRuntime: true
  },
  css: ['assets/css/main.css'],
  runtimeConfig: {
    public: {
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN || ''
    }
  },
  routeRules: {
    '/**': {
      headers: {
        'Content-Security-Policy': "default-src 'self' *; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: *; style-src 'self' 'unsafe-inline' *; img-src 'self' data: blob: *; connect-src 'self' data: blob: *.mapbox.com *; worker-src 'self' blob:; frame-src 'self' data: blob: *;"
      }
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'lucide-vue-next',
      ]
    }
  }
})
