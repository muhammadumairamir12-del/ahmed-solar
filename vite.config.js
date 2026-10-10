import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig } from 'vite'
import { handleAssistantApiRequest } from './server/apiRouter.js'

// Load environment variables from .env
try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile()
  }
} catch {
  // Ignore if .env is missing or already loaded
}

function assistantApiPlugin() {
  return {
    name: 'assistant-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/assistant')) {
          try {
            await handleAssistantApiRequest(req, res)
          } catch (err) {
            next(err)
          }
          return
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/assistant')) {
          try {
            await handleAssistantApiRequest(req, res)
          } catch (err) {
            next(err)
          }
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), basicSsl(), assistantApiPlugin()],
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    https: true,
  },
})
