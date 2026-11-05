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
  }
})
