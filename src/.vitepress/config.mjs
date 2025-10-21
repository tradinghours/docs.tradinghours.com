import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TradingHours Docs",
  description: "Official Documentation for TradingHours.com",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T5J2ZQM');
    `]
  ],

  rewrites: {
    '3.x/introduction.md': 'index.md'
  },

  sitemap: {
    hostname: 'https://docs.tradinghours.com'
  },

  cleanUrls: true,

  themeConfig: {
    logo: '/assets/logo.svg',
    outline: [2, 4],
    nav: [
      { text: 'TradingHours.com', link: 'https://www.tradinghours.com' },
      { text: 'Python Library', link: 'https://github.com/tradinghours/tradinghours-python' }
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
            { text: 'Introduction', link: '/' },
            { text: 'Authentication', link: '/3.x/authentication' },
            { text: 'Change Log', link: '/change-log' },
        ],
      },
      {
        text: "Python Library",
        items: [
            { text: 'Overview', link: '/python-library/' },
            { 
              text: 'Server Mode', 
              collapsed: false,
              items: [
                { text: 'Getting Started', link: '/python-library/server-mode/getting-started' },
                { text: 'API Endpoints', link: '/python-library/server-mode/api-endpoints' },
                { text: 'Configuration', link: '/python-library/server-mode/configuration' },
              ]
            },
            {
              text: 'Package Mode',
              collapsed: false,
              items: [
                { text: 'Getting Started', link: '/python-library/package-mode/getting-started' },
                { text: 'Markets', link: '/python-library/package-mode/markets' },
                { text: 'Currencies', link: '/python-library/package-mode/currencies' },
              ]
            }
        ],
      },
      {
        text: "TradingHours API",
        items: [
          { text: 'API Details', link: '/3.x/api-details' },
          {
            text: 'Endpoints',
            collapsed: false,
            items: [
              // Basic Endpoints
              { text: 'Find Markets', link: '/3.x/endpoints/find-markets' },
              { text: 'Market Details', link: '/3.x/endpoints/market-details' },
              { text: 'Market Status', link: '/3.x/endpoints/market-status' },
              { text: 'Local Times', link: '/3.x/endpoints/local-time' },
              { text: 'Timezones', link: '/3.x/endpoints/timezones' },
              { text: 'Last Updated', link: '/3.x/endpoints/last-updated' },

              // Enterprise Endpoints
              { text: 'Trading Hours', link: '/3.x/enterprise/trading-hours' },
              { text: 'Market Holidays', link: '/3.x/enterprise/market-holidays' },
              { text: 'Currency Holidays', link: '/3.x/enterprise/currency-holidays' },
              { text: 'Regional Holidays', link: '/3.x/enterprise/regional-and-religious-holidays' },
              { text: 'Data Download (CSV)', link: '/3.x/enterprise/download' }
            ]
          }
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tradinghours' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/tradinghours' }
    ],

    footer: {
      // message: '...',
      copyright: '© 2015 - 2025 TradingHours.com, LLC. All rights reserved.'
    },

    search: {
      provider: 'local'
    }
  }
})
