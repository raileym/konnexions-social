import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import mdx from '@mdx-js/rollup'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    plugins: [react(),
      svgr(),
      mdx({include: /\.mdx$/}) as PluginOption,
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'My Konnexions',
          short_name: 'My Konnexions',
          description: 'Let\'s konnect! Promoting ways to connect socially',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'web-app-manifest-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'web-app-manifest-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'web-app-manifest-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })      
    ],
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@cknTypes': path.resolve(__dirname, 'shared/cknTypes'),
        '@shared': path.resolve(__dirname, 'shared'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@mdxComponents': path.resolve(__dirname, 'src/mdxComponents'),
        '@PanelGenAIPro': path.resolve(__dirname, 'src/components/PanelGenAIPro'),
        '@PanelGenAIProComponents': path.resolve(__dirname, 'src/components/PanelGenAIPro/PanelGenAIProComponents'),
        '@mdxPages': path.resolve(__dirname, 'src/mdxPages'),
      },
    },
    build: {
      outDir: 'build',
    }
  }
)


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import * as path from 'path'
// import mdx from '@mdx-js/rollup'

// export default defineConfig(async () => {
//   // const mdx = (await import('@mdx-js/rollup')).default

//   return {
//     plugins: [react(), mdx()],
//     resolve: {
//       alias: {
//         '@cknTypes': path.resolve(__dirname, 'shared/cknTypes'),
//         '@shared': path.resolve(__dirname, 'shared'),
//         '@context': path.resolve(__dirname, 'src/context'),
//         '@hooks': path.resolve(__dirname, 'src/hooks'),
//         '@components': path.resolve(__dirname, 'src/components'),
//         '@PanelGenAIPro': path.resolve(__dirname, 'src/components/PanelGenAIPro'),
//         '@PanelGenAIProComponents': path.resolve(__dirname, 'src/components/PanelGenAIPro/PanelGenAIProComponents'),
//         '@mdxPages': path.resolve(__dirname, 'src/mdxPages'),
//       },
//     },
//     build: {
//       outDir: 'build',
//     }
//   }
// })
