import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'TradingHours API Docs',
  description: 'The most comprehensive solution for market holidays and trading hours data.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'link',
      {
        href:
          'https://fonts.googleapis.com/css?family=Lato:200,200i,300,300i,400,400i,600,600i,800,800i,900,900i',
        rel: 'stylesheet',
        type: 'text/css',
      },
    ],
    // Add Google Tag Manager
    ['script', {}, `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T5J2ZQM');
    `]
  ],
  theme: defaultTheme({
    logo: "/assets/logo.png",
    contributors: false,
    sidebarDepth: 0,
    navbar: [
      { text: 'TradingHours.com', link: 'https://www.tradinghours.com/dashboard' },
      { text: 'Python Library', link: 'https://github.com/tradinghours/tradinghours-python' },
    ],
    sidebar: {
      '/': require('./3.x'),
      '/3.x/': require('./3.x'),
    },
  }),

  bundler: viteBundler(),
})
