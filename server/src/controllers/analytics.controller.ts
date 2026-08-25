import { FastifyRequest, FastifyReply } from 'fastify'
import { analyticsService } from '../services/analytics.service'
import { successResponse, errorResponse } from '../utils/response'

export class AnalyticsController {
  async getDashboardStats(request: FastifyRequest, reply: FastifyReply) {
    try {
      const stats = await analyticsService.getDashboardStats()
      return reply.send(successResponse(stats, 'Dashboard stats retrieved successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to fetch dashboard stats'))
    }
  }
}

export const analyticsController = new AnalyticsController()
