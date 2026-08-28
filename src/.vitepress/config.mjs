import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TradingHours API Docs",
  description: "Official Documentation for TradingHours.com",

  // Generates /llms.txt, /llms-full.txt, and a markdown twin of every page
  // (e.g. /3.x/authentication.md) per the llmstxt.org spec.
  vite: {
    plugins: [
      llmstxt({
        domain: 'https://docs.tradinghours.com',
        title: 'TradingHours.com API Documentation',
        description: 'Official documentation for the TradingHours.com market data API: trading hours, market holidays, currency holidays, and real-time market status for 1,000+ exchanges and trading venues worldwide.',
        details: 'The API delivers structured, machine-readable financial calendar data over JSON (REST), bulk CSV/Excel download, an official Python package, Snowflake, or an on-premise deployment. Authentication uses API tokens. Enterprise data access is licensed annually; see https://www.tradinghours.com/data for products and https://www.tradinghours.com/llms.txt for a site-wide overview.',
        // Meta-refresh redirect stubs, not real content
        ignoreFiles: ['3.x/index.md', '3.x/endpoints/index.md', '3.x/enterprise/index.md'],
      }),
    ],
  },
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

  sitemap: {
    hostname: 'https://docs.tradinghours.com'
  },

  cleanUrls: true,

  themeConfig: {
    logo: '/assets/logo.svg',

    nav: [
      { text: 'TradingHours.com', link: 'https://www.tradinghours.com' },
      { text: 'Python Library', link: 'https://github.com/tradinghours/tradinghours-python' }
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
            { text: 'Introduction', link: '/3.x/introduction' },
            { text: 'Authentication', link: '/3.x/authentication' },
            { text: 'API Details', link: '/3.x/api-details' },
            { text: 'Python Library', link: '/python-library' },
            { text: 'Change Log', link: '/change-log' },
        ],
      }, {
        text: "Basic API Endpoints",
        items: [
            { text: 'Find Markets', link: '/3.x/endpoints/find-markets' },
            { text: 'Market Details', link: '/3.x/endpoints/market-details' },
            { text: 'Market Status', link: '/3.x/endpoints/market-status' },
            { text: 'Local Times', link: '/3.x/endpoints/local-time' },
            { text: 'Timezones', link: '/3.x/endpoints/timezones' },
            { text: 'Last Updated', link: '/3.x/endpoints/last-updated' },
        ],
      }, {
        text: "Enterprise API Endpoints",
        items: [
            { text: 'Trading Hours', link: '/3.x/enterprise/trading-hours' },
            { text: 'Market Holidays', link: '/3.x/enterprise/market-holidays' },
            { text: 'Currency Holidays', link: '/3.x/enterprise/currency-holidays' },
            { text: 'Regional Holidays', link: '/3.x/enterprise/regional-and-religious-holidays' },
            { text: 'Data Download (CSV)', link: '/3.x/enterprise/download' }
        ],
      }
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
