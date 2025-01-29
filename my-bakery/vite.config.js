import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Commerce/',
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: [
      // Load both .js and .jsx files with JSX
      'src/**/*.js',
      'src/**/*.jsx'
    ]
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
