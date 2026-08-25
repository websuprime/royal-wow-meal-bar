import { FastifyRequest, FastifyReply } from 'fastify'
import { eventService } from '../services/event.service'
import { successResponse, errorResponse } from '../utils/response'

export class EventController {
  async getAllEvents(request: FastifyRequest, reply: FastifyReply) {
    try {
      const events = await eventService.getAllEvents()
      return reply.send(successResponse(events, 'Events retrieved successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to fetch events'))
    }
  }

  async createEvent(request: FastifyRequest, reply: FastifyReply) {
    try {
      const event = await eventService.createEvent(request.body)
      return reply.code(201).send(successResponse(event, 'Event created successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to create event'))
    }
  }

  async updateEvent(request: FastifyRequest<{ Params: { id: string }, Body: any }>, reply: FastifyReply) {
    try {
      const { id } = request.params
      const event = await eventService.updateEvent(id, request.body)
      if (!event) return reply.status(404).send(errorResponse('Event not found', 404))
      return reply.send(successResponse(event, 'Event updated successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to update event'))
    }
  }

  async deleteEvent(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params
      const event = await eventService.deleteEvent(id)
      if (!event) return reply.status(404).send(errorResponse('Event not found', 404))
      return reply.send(successResponse(null, 'Event deleted successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to delete event'))
    }
  }
}

export const eventController = new EventController()
