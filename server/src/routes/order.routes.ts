import { FastifyInstance } from 'fastify'
import { orderController } from '../controllers/order.controller'

export default async function orderRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      tags: ['Orders'],
      summary: 'Get all orders'
    }
  }, orderController.getAllOrders)

  fastify.post('/', {
    schema: {
      tags: ['Orders'],
      summary: 'Create a new order',
      body: { type: 'object' }
    }
  }, orderController.createOrder)

  fastify.put('/:id/status', {
    schema: {
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
}
