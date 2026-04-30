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
    '@sidebase/nuxt-auth'
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
  routeRules: {
    '/api/projects/**': { proxy: 'http://localhost:8080/api/projects/**' },
    '/api/projects': { proxy: 'http://localhost:8080/api/projects' },
    '/api/developers/**': { proxy: 'http://localhost:8080/api/developers/**' },
    '/api/developers': { proxy: 'http://localhost:8080/api/developers' }
  },






  seo: {
    redirectToCanonicalSiteUrl: true
  },
  ogImage: {
    zeroRuntime: true
  },
  css: ['assets/css/main.css'],
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

