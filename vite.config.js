import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function localCoffeeApi() {
  return {
    name: 'local-coffee-api',
    configureServer(server) {
      server.middlewares.use('/api/coffees', async (request, response, next) => {
        try {
          const { default: handler } = await import('./api/coffees.js')
          await handler(request, response)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')
  for (const name of ['DATABASE_URL', 'NEON_AUTH_BASE_URL']) {
    if (!process.env[name] && environment[name]) process.env[name] = environment[name]
  }

  return {
    plugins: [react(), tailwindcss(), localCoffeeApi()],
    server: {
      allowedHosts: ['sb-27q7ura8eikb.vercel.run'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes('/node_modules/framer-motion/') ||
              id.includes('/node_modules/motion-dom/') ||
              id.includes('/node_modules/motion-utils/')
            ) {
              return 'motion-vendor'
            }
            if (
              id.includes('/node_modules/@neon/') ||
              id.includes('/node_modules/@better-auth/') ||
              id.includes('/node_modules/better-auth/') ||
              id.includes('/node_modules/jose/') ||
              id.includes('/node_modules/@noble/')
            ) {
              return 'auth-vendor'
            }
            if (
              id.includes('/node_modules/react/') ||
              id.includes('/node_modules/react-dom/') ||
              id.includes('/node_modules/scheduler/')
            ) {
              return 'react-vendor'
            }
            if (id.includes('/node_modules/')) return 'vendor'
          },
        },
      },
    },
  }
})
