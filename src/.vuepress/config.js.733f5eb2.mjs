// src/.vuepress/config.js
import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import searchPlugin from "@vuepress/plugin-search";
var config_default = defineUserConfig({
  lang: "en-US",
  title: "TradingHours API Docs",
  description: "The most trusted source for financial calendar reference data",
  head: [
    ["link", { rel: "icon", href: "/assets/favicon.ico" }],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css?family=Lato:200,200i,300,300i,400,400i,600,600i,800,800i,900,900i",
        rel: "stylesheet",
        type: "text/css"
      }
    ],
    ["script", {}, `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T5J2ZQM');
    `]
  ],
  theme: defaultTheme({
    logo: "/assets/logo.png",
    repo: "https://gitlab.com/tradinghours/docs",
    colorModeSwitch: false,
    colorMode: "light",
    navbar: [
      { text: "Home", link: "/" },
      {
        text: "Version",
        children: [
          { text: "3.0", link: "/3.x/" },
          { text: "2.0", link: "/2.x/" }
        ]
      },
      { text: "Account", link: "https://www.tradinghours.com/dashboard" }
    ]
  }),
  plugins: []
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWxhbi9Db2RlL3RyYWRpbmdob3Vycy12My9kb2NzL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hbGFuL0NvZGUvdHJhZGluZ2hvdXJzLXYzL2RvY3Mvc3JjLy52dWVwcmVzcy9jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FsYW4vQ29kZS90cmFkaW5naG91cnMtdjMvZG9jcy9zcmMvLnZ1ZXByZXNzL2NvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZVVzZXJDb25maWcgfSBmcm9tICd2dWVwcmVzcydcbmltcG9ydCB7IGRlZmF1bHRUaGVtZSB9IGZyb20gJ0B2dWVwcmVzcy90aGVtZS1kZWZhdWx0J1xuaW1wb3J0IHNlYXJjaFBsdWdpbiBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLXNlYXJjaCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XG4gIGxhbmc6ICdlbi1VUycsXG4gIHRpdGxlOiAnVHJhZGluZ0hvdXJzIEFQSSBEb2NzJyxcbiAgZGVzY3JpcHRpb246ICdUaGUgbW9zdCB0cnVzdGVkIHNvdXJjZSBmb3IgZmluYW5jaWFsIGNhbGVuZGFyIHJlZmVyZW5jZSBkYXRhJyxcblxuICBoZWFkOiBbXG4gICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgaHJlZjogJy9hc3NldHMvZmF2aWNvbi5pY28nIH1dLFxuICAgIFtcbiAgICAgICdsaW5rJyxcbiAgICAgIHtcbiAgICAgICAgaHJlZjpcbiAgICAgICAgICAnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PUxhdG86MjAwLDIwMGksMzAwLDMwMGksNDAwLDQwMGksNjAwLDYwMGksODAwLDgwMGksOTAwLDkwMGknLFxuICAgICAgICByZWw6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgdHlwZTogJ3RleHQvY3NzJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICAvLyBBZGQgR29vZ2xlIFRhZyBNYW5hZ2VyXG4gICAgWydzY3JpcHQnLCB7fSwgYFxuICAgICAgICAoZnVuY3Rpb24odyxkLHMsbCxpKXt3W2xdPXdbbF18fFtdO3dbbF0ucHVzaCh7J2d0bS5zdGFydCc6XG4gICAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpLGV2ZW50OidndG0uanMnfSk7dmFyIGY9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXSxcbiAgICAgICAgaj1kLmNyZWF0ZUVsZW1lbnQocyksZGw9bCE9J2RhdGFMYXllcic/JyZsPScrbDonJztqLmFzeW5jPXRydWU7ai5zcmM9XG4gICAgICAgICdodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndG0uanM/aWQ9JytpK2RsO2YucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaixmKTtcbiAgICAgICAgfSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCdkYXRhTGF5ZXInLCdHVE0tVDVKMlpRTScpO1xuICAgIGBdXG4gIF0sXG5cbiAgdGhlbWU6IGRlZmF1bHRUaGVtZSh7XG4gICAgbG9nbzogXCIvYXNzZXRzL2xvZ28ucG5nXCIsXG4gICAgcmVwbzogJ2h0dHBzOi8vZ2l0bGFiLmNvbS90cmFkaW5naG91cnMvZG9jcycsXG4gICAgY29sb3JNb2RlU3dpdGNoOiBmYWxzZSxcbiAgICBjb2xvck1vZGU6ICdsaWdodCcsXG4gICAgbmF2YmFyOiBbXG4gICAgICAgIHsgdGV4dDogJ0hvbWUnLCBsaW5rOiAnLycgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1ZlcnNpb24nLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICczLjAnLCBsaW5rOiAnLzMueC8nIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnMi4wJywgbGluazogJy8yLngvJyB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7IHRleHQ6ICdBY2NvdW50JywgbGluazogJ2h0dHBzOi8vd3d3LnRyYWRpbmdob3Vycy5jb20vZGFzaGJvYXJkJyB9LFxuICAgIF0sXG4gIH0pLFxuXG4gIHBsdWdpbnM6IFtcbiAgICAvLyBzZWFyY2hQbHVnaW4oe1xuICAgIC8vICAgbG9jYWxlczoge1xuICAgIC8vICAgICAnLyc6IHtcbiAgICAvLyAgICAgICBwbGFjZWhvbGRlcjogJ3NlYXJjaCcsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICB9LFxuICAgIC8vIH0pLFxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVUsU0FBUyx3QkFBd0I7QUFDbFcsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxrQkFBa0I7QUFFekIsSUFBTyxpQkFBUSxpQkFBaUI7QUFBQSxFQUM5QixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFFYixNQUFNO0FBQUEsSUFDSixDQUFDLFFBQVEsRUFBRSxLQUFLLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUFBLElBQ3JEO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQ0U7QUFBQSxRQUNGLEtBQUs7QUFBQSxRQUNMLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLElBRUEsQ0FBQyxVQUFVLENBQUMsR0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQU1kO0FBQUEsRUFDSDtBQUFBLEVBRUEsT0FBTyxhQUFhO0FBQUEsSUFDbEIsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04saUJBQWlCO0FBQUEsSUFDakIsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLE1BQ0osRUFBRSxNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQUEsTUFDMUI7QUFBQSxRQUNJLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxVQUNOLEVBQUUsTUFBTSxPQUFPLE1BQU0sUUFBUTtBQUFBLFVBQzdCLEVBQUUsTUFBTSxPQUFPLE1BQU0sUUFBUTtBQUFBLFFBQ2pDO0FBQUEsTUFDSjtBQUFBLE1BQ0EsRUFBRSxNQUFNLFdBQVcsTUFBTSx5Q0FBeUM7QUFBQSxJQUN0RTtBQUFBLEVBQ0YsQ0FBQztBQUFBLEVBRUQsU0FBUyxDQVFUO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
