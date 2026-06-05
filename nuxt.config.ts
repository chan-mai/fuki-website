import { createClient } from 'microcms-js-sdk';
import { SITE } from './shared/constant';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-04-10',
  devtools: { enabled: true },
  ssr: true,

  css: [
    '~/assets/css/tailwindcss.css',
    '~/assets/css/font.css'
  ],

  modules: [
    "@nuxt/icon",
    "nuxt-microcms-module",
    "gsap-nuxt-module"
  ],

  gsap: {
    plugins: ['CustomEase'],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  icon: {
    provider: 'server',
  },

  microCMS: {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY
  },

  runtimeConfig: {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY
  },

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap' },
        { rel: "icon", type: "image/png", href: "/icon.webp" },
      ],
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: https://ogp.me/ns#'
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: 'description', name: "description", content: SITE.description },
        { hid: 'og:site_name', property: 'og:site_name', content: SITE.name },
        { hid: 'og:title', property: 'og:title', content: SITE.name },
        { hid: 'og:description', property: 'og:description', content: SITE.description },
        { hid: 'og:image', property: 'og:image', content: SITE.ogImage },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: SITE.url },
        { hid: 'og:locale', property: 'og:locale', content: SITE.locale },
        { name: 'twitter:card', content: 'summary_large_image' },
      ]
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/works/*": { prerender: true },
  },

  nitro: {
    preset: 'cloudflare_module',
    prerender: {
      autoSubfolderIndex: true,
      crawlLinks: true,
      routes: [],
      failOnError: false,
    }
  },

  hooks: {
    async "nitro:config"(nitroConfig) {
      if (nitroConfig.dev) {
        return;
      }

      const client = createClient({
        serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
        apiKey: process.env.MICROCMS_API_KEY!,
      })
      const res: any = await client.get({
        endpoint: 'works',
      });

      if (nitroConfig.prerender?.routes === undefined) {
        return;
      }

      nitroConfig.prerender.routes = res.contents.map((mount: any) => {
        return `/works/${mount.id}`;
      });
    },
  },
})
