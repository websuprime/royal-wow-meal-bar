import { FastifyInstance } from 'fastify'
import { adminController } from '../controllers/admin.controller'

export default async function adminRoutes(fastify: FastifyInstance) {
  fastify.post('/login', {
    schema: {
      tags: ['Admin Auth'],
      summary: 'Admin login',
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['email', 'password']
      }
    }
  }, adminController.login)
}
