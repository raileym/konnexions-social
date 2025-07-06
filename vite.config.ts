import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig(async () => {
  const mdx = (await import('@mdx-js/rollup')).default

  return {
    plugins: [react(), mdx()],
    resolve: {
      alias: {
        '@cknTypes': path.resolve(__dirname, 'shared/cknTypes'),
        '@shared': path.resolve(__dirname, 'shared'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@PanelGenAIPro': path.resolve(__dirname, 'src/components/PanelGenAIPro'),
        '@PanelGenAIProComponents': path.resolve(__dirname, 'src/components/PanelGenAIPro/PanelGenAIProComponents'),
        '@mdxPages': path.resolve(__dirname, 'src/mdxPages'),
      },
    },
    build: {
      outDir: 'build',
    },
    assetsInclude: ['**/*.html'],  // <-- add this line to fix html parsing issue
  }
})
