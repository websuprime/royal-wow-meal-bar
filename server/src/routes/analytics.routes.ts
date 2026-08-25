import { FastifyInstance } from 'fastify'
import { analyticsController } from '../controllers/analytics.controller'

export default async function analyticsRoutes(fastify: FastifyInstance) {
  fastify.get('/dashboard', {
    schema: {
      tags: ['Analytics'],
      summary: 'Get dashboard statistics'
    }
  }, analyticsController.getDashboardStats)
}
