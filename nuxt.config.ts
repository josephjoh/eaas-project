import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],

  // components/common/AppHeader.vue → <AppHeader /> 처럼 폴더 prefix 없이 사용한다.
  components: [{ path: '~/components', pathPrefix: false }],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'ko' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'theme-color', content: '#0c1a36' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  // 빌드(generate) 시점의 NUXT_PUBLIC_* 환경변수로 덮어쓴다. Secret은 절대 public에 두지 않는다.
  runtimeConfig: {
    public: {
      siteUrl: 'http://localhost:3000',
      gaId: '',
      inquiryFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdE2XYWCggnSTnCzVj_U3g5udRZOEPFDS_sza8YNJh8Ps5s5w/viewform',
      contactEmail: 'soluconlab@gmail.com',
      contactPhone: '',
    },
  },

  compatibilityDate: '2026-09-01',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
