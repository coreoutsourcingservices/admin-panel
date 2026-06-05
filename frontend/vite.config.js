import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {

      '/careers': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },

      '/user': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },

      '/contact': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },

      '/partners': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },

      '/ourteam': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },

      '/teamsecond': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },

      '/gallery': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },

      '/bloge': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },

      '/job': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },

      '/wishlan': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },

    },
  },
})