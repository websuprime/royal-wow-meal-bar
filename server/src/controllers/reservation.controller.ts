import { FastifyRequest, FastifyReply } from 'fastify'
import { reservationService } from '../services/reservation.service'
import { successResponse, errorResponse } from '../utils/response'

export class ReservationController {
  async getAllReservations(request: FastifyRequest, reply: FastifyReply) {
    try {
      const reservations = await reservationService.getAllReservations()
      return reply.send(successResponse(reservations, 'Reservations retrieved successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to fetch reservations'))
    }
  }

  async createReservation(request: FastifyRequest, reply: FastifyReply) {
    try {
      const res = await reservationService.createReservation(request.body)
      return reply.code(201).send(successResponse(res, 'Reservation created successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to create reservation'))
    }
  }

  async updateReservationStatus(request: FastifyRequest<{ Params: { id: string }, Body: { status: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params
      const { status } = request.body
      const res = await reservationService.updateReservationStatus(id, status)
      if (!res) {
        return reply.status(404).send(errorResponse('Reservation not found', 404))
      }
      return reply.send(successResponse(res, 'Reservation status updated successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to update reservation status'))
    }
  }
}

export const reservationController = new ReservationController()
