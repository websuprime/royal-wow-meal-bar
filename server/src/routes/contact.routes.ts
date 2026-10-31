import { FastifyInstance } from 'fastify'
import { verifyJwt, bearerSecurity } from '../middleware/auth'
import { contactController } from '../controllers/contact.controller'

export default async function contactRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ['Contact Messages'],
      summary: 'Submit a new contact message',
      body: { type: 'object' }
    }
  }, contactController.createContact)

  // Admin-only routes: every route registered in this scope requires a valid JWT
  fastify.register(async (admin) => {
    admin.addHook('preHandler', verifyJwt)

    admin.get('/', {
      schema: {
        security: bearerSecurity,
        tags: ['Contact Messages'],
        summary: 'Get all contact messages'
      }
    }, contactController.getAllContacts)

    admin.put('/:id/status', {
      schema: {
        security: bearerSecurity,
        tags: ['Contact Messages'],
        summary: 'Update contact message status',
        params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
        body: { type: 'object', properties: { status: { type: 'string' } }, required: ['status'] }
      }
    }, contactController.updateContactStatus)
  })
}
