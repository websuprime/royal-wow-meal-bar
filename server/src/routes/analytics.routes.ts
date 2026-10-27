import { FastifyInstance } from 'fastify'
import { verifyJwt, bearerSecurity } from '../middleware/auth'
import { analyticsController } from '../controllers/analytics.controller'

export default async function analyticsRoutes(fastify: FastifyInstance) {
  // Admin-only routes: every route registered in this scope requires a valid JWT
  fastify.register(async (admin) => {
    admin.addHook('preHandler', verifyJwt)

    admin.get('/dashboard', {
      schema: {
        security: bearerSecurity,
        tags: ['Analytics'],
        summary: 'Get dashboard statistics'
      }
    }, analyticsController.getDashboardStats)
  })
}
