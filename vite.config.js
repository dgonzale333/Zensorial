import process from 'node:process'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function localApiRoutes() {
  const routes = [
    ['/api/coffees', './api/coffees.js'],
    ['/api/checkout', './api/checkout.js'],
  ]

  return {
    name: 'local-api-routes',
    configureServer(server) {
      for (const [path, modulePath] of routes) {
        server.middlewares.use(path, async (request, response, next) => {
          try {
            const handlerUrl = pathToFileURL(resolve(process.cwd(), modulePath)).href
            const { default: handler } = await import(handlerUrl)
            await handler(request, response)
          } catch (error) {
            next(error)
          }
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')
  for (const name of ['DATABASE_URL', 'NEON_AUTH_BASE_URL', 'STRIPE_SECRET_KEY']) {
    if (!process.env[name] && environment[name]) process.env[name] = environment[name]
  }

  return {
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    plugins: [react(), tailwindcss(), localApiRoutes()],
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

      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')
  for (const name of ['DATABASE_URL', 'NEON_AUTH_BASE_URL', 'STRIPE_SECRET_KEY']) {
    if (!process.env[name] && environment[name]) process.env[name] = environment[name]
  }

  return {
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    plugins: [react(), tailwindcss(), localApiRoutes()],
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
