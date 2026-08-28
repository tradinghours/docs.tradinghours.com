// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import mediumZoom from 'medium-zoom'
import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  setup() {
    const route = useRoute()
    let zoom
    
    const initZoom = () => {
      // Clean up existing zoom instances
      if (zoom) {
        zoom.detach()
      }
      
      // Initialize zoom with better settings
      zoom = mediumZoom('.main img', { 
        background: 'rgba(0, 0, 0, 1)',
        margin: 48,
        scrollOffset: 0
      })
    }
    
    onMounted(() => {
      initZoom()
    })
    
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  }
}
