import fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { swaggerConfig, swaggerUiConfig } from './config/swagger'
import { errorResponse } from './utils/response'

// Import routes
import menuRoutes from './routes/menu.routes'
import orderRoutes from './routes/order.routes'
import reservationRoutes from './routes/reservation.routes'
import eventRoutes from './routes/event.routes'
import couponRoutes from './routes/coupon.routes'
import analyticsRoutes from './routes/analytics.routes'
import adminRoutes from './routes/admin.routes'
import contactRoutes from './routes/contact.routes'
import categoryRoutes from './routes/category.routes'

export function buildApp() {
  const app = fastify({ logger: true })

  // Plugins
  app.register(cors, { 
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  })
  app.register(swagger, swaggerConfig)
  app.register(swaggerUi, swaggerUiConfig)
  app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB
    }
  })
  app.register(fastifyStatic, {
    root: path.join(__dirname, '../uploads'),
    prefix: '/uploads/',
  })

  // Register routes
  app.register(menuRoutes, { prefix: '/api/menu' })
  app.register(orderRoutes, { prefix: '/api/orders' })
  app.register(reservationRoutes, { prefix: '/api/reservations' })
  app.register(eventRoutes, { prefix: '/api/events' })
  app.register(couponRoutes, { prefix: '/api/coupons' })
  app.register(analyticsRoutes, { prefix: '/api/analytics' })
  app.register(adminRoutes, { prefix: '/api/admin' })
  app.register(contactRoutes, { prefix: '/api/contact' })
  app.register(categoryRoutes, { prefix: '/api/categories' })

  app.get('/health', async () => ({ status: 'ok' }))

  // Production: serve the built React app from the same server, with index.html for client-side routes
  const frontendDist = process.env.FRONTEND_DIST
  if (frontendDist) {
    app.register(fastifyStatic, { root: frontendDist, prefix: '/', decorateReply: false, wildcard: false })
    app.setNotFoundHandler((request, reply) => {
      const isPage = request.method === 'GET' && !request.url.startsWith('/api/') && !request.url.startsWith('/uploads/')
      if (isPage) return reply.sendFile('index.html', frontendDist)
      return reply.code(404).send(errorResponse('Not found', 404))
    })
  }

  return app
}
