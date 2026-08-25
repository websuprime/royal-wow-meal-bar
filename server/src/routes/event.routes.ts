import { FastifyInstance } from 'fastify'
import { eventController } from '../controllers/event.controller'

export default async function eventRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      tags: ['Events'],
      summary: 'Get all events'
    }
  }, eventController.getAllEvents)

  fastify.post('/', {
    schema: {
      tags: ['Events'],
      summary: 'Create a new event',
      body: { type: 'object' }
    }
  }, eventController.createEvent)

  fastify.put('/:id', {
    schema: {
      tags: ['Events'],
      summary: 'Update an event',
      params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      body: { type: 'object' }
    }
  }, eventController.updateEvent)

  fastify.delete('/:id', {
    schema: {
      tags: ['Events'],
      summary: 'Delete an event',
      params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] }
    }
  }, eventController.deleteEvent)
}
