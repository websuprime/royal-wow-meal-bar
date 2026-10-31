import { FastifyInstance } from 'fastify'
import { verifyJwt, bearerSecurity } from '../middleware/auth'
import { eventController } from '../controllers/event.controller'

export default async function eventRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      tags: ['Events'],
      summary: 'Get all events'
    }
  }, eventController.getAllEvents)

  // Admin-only routes: every route registered in this scope requires a valid JWT
  fastify.register(async (admin) => {
    admin.addHook('preHandler', verifyJwt)

    admin.post('/', {
      schema: {
        security: bearerSecurity,
        tags: ['Events'],
        summary: 'Create a new event',
        body: { type: 'object' }
      }
    }, eventController.createEvent)

    admin.put('/:id', {
      schema: {
        security: bearerSecurity,
        tags: ['Events'],
        summary: 'Update an event',
        params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
        body: { type: 'object' }
      }
    }, eventController.updateEvent)

    admin.delete('/:id', {
      schema: {
        security: bearerSecurity,
        tags: ['Events'],
        summary: 'Delete an event',
        params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] }
      }
    }, eventController.deleteEvent)
  })
}
