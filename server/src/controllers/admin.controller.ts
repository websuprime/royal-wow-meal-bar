import { FastifyRequest, FastifyReply } from 'fastify'
import { adminService } from '../services/admin.service'
import { successResponse, errorResponse } from '../utils/response'

export class AdminController {
  async login(request: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
    try {
      const { email, password } = request.body as any
      const data = await adminService.login(email, password)
      return reply.send(successResponse(data, 'Login successful'))
    } catch (error: any) {
      return reply.status(401).send(errorResponse(error.message, 401))
    }
  }
}

export const adminController = new AdminController()
