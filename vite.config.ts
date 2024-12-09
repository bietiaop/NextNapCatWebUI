import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'node:path'

const monacoEditorPath = normalizePath(
  path.resolve(__dirname, 'node_modules/monaco-editor/min/vs')
)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: monacoEditorPath,
          dest: 'monaco-editor/min'
        }
      ]
    })
  ],
  base: './',
  server: {
    // proxy: {
    // '/api': 'http://192.168.31.196:6099'
    // '/api': 'http://127.0.0.1:6099'
    // }
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco-editor': ['monaco-editor'],
          'react-dom': ['react-dom'],
          'react-router-dom': ['react-router-dom'],
          'react-hook-form': ['react-hook-form'],
          'react-icons': ['react-icons'],
          'react-hot-toast': ['react-hot-toast'],
          qface: ['qface']
        }
      }
    }
  }
})
