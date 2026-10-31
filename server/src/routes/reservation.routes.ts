import { FastifyInstance } from 'fastify'
import { verifyJwt, bearerSecurity } from '../middleware/auth'
import { reservationController } from '../controllers/reservation.controller'

export default async function reservationRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ['Reservations'],
      summary: 'Create a new reservation',
      body: { type: 'object' }
    }
  }, reservationController.createReservation)

  // Admin-only routes: every route registered in this scope requires a valid JWT
  fastify.register(async (admin) => {
    admin.addHook('preHandler', verifyJwt)

    admin.get('/', {
      schema: {
        security: bearerSecurity,
        tags: ['Reservations'],
        summary: 'Get all reservations'
      }
    }, reservationController.getAllReservations)

    admin.put('/:id/status', {
      schema: {
        security: bearerSecurity,
        tags: ['Reservations'],
        summary: 'Update reservation status',
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
    }, reservationController.updateReservationStatus)
  })
}
