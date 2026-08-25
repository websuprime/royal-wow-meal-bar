import { FastifyInstance } from 'fastify'
import { reservationController } from '../controllers/reservation.controller'

export default async function reservationRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      tags: ['Reservations'],
      summary: 'Get all reservations'
    }
  }, reservationController.getAllReservations)

  fastify.post('/', {
    schema: {
      tags: ['Reservations'],
      summary: 'Create a new reservation',
      body: { type: 'object' }
    }
  }, reservationController.createReservation)

  fastify.put('/:id/status', {
    schema: {
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
}
