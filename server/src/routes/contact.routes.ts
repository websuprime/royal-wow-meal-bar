import { FastifyInstance } from 'fastify'
import { contactController } from '../controllers/contact.controller'

export default async function contactRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      tags: ['Contact Messages'],
      summary: 'Get all contact messages'
    }
  }, contactController.getAllContacts)

  fastify.post('/', {
    schema: {
      tags: ['Contact Messages'],
      summary: 'Submit a new contact message',
      body: { type: 'object' }
    }
  }, contactController.createContact)

  fastify.put('/:id/status', {
    schema: {
      tags: ['Contact Messages'],
      summary: 'Update contact message status',
      params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      body: { type: 'object', properties: { status: { type: 'string' } }, required: ['status'] }
    }
  }, contactController.updateContactStatus)
}
