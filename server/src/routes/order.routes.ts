import { FastifyInstance } from 'fastify'
import { verifyJwt, bearerSecurity } from '../middleware/auth'
import { orderController } from '../controllers/order.controller'

export default async function orderRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ['Orders'],
      summary: 'Create a new order',
      body: { type: 'object' }
    }
  }, orderController.createOrder)

  // Admin-only routes: every route registered in this scope requires a valid JWT
  fastify.register(async (admin) => {
    admin.addHook('preHandler', verifyJwt)

    admin.get('/', {
      schema: {
        security: bearerSecurity,
        tags: ['Orders'],
        summary: 'Get all orders'
      }
    }, orderController.getAllOrders)

    admin.put('/:id/status', {
      schema: {
        security: bearerSecurity,
        tags: ['Orders'],
        summary: 'Update order status',
        params: {
          type: 'object',
          properties: { id: { type: 'string' } },
          required: ['id']
        },
        body: {
          type: 'object',
          properties: { status: { type: 'string' } },
          required: ['status']
        }
      }
    }, orderController.updateOrderStatus)
  })
}
