import { FastifyRequest, FastifyReply } from 'fastify'
import { contactService } from '../services/contact.service'
import { successResponse, errorResponse } from '../utils/response'

export class ContactController {
  async getAllContacts(request: FastifyRequest, reply: FastifyReply) {
    try {
      const contacts = await contactService.getAllContacts()
      return reply.send(successResponse(contacts, 'Contacts retrieved successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to fetch contacts'))
    }
  }

  async createContact(request: FastifyRequest, reply: FastifyReply) {
    try {
      const contact = await contactService.createContact(request.body)
      return reply.code(201).send(successResponse(contact, 'Message sent successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to send message'))
    }
  }

  async updateContactStatus(request: FastifyRequest<{ Params: { id: string }, Body: { status: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params
      const { status } = request.body
      const contact = await contactService.updateContactStatus(id, status)
      if (!contact) {
        return reply.status(404).send(errorResponse('Contact not found', 404))
      }
      return reply.send(successResponse(contact, 'Contact status updated successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to update contact status'))
    }
  }
}

export const contactController = new ContactController()
