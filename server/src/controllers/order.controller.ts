import { FastifyRequest, FastifyReply } from 'fastify'
import { orderService } from '../services/order.service'
import { successResponse, errorResponse } from '../utils/response'

export class OrderController {
  async getAllOrders(request: FastifyRequest, reply: FastifyReply) {
    try {
      const orders = await orderService.getAllOrders()
      return reply.send(successResponse(orders, 'Orders retrieved successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to fetch orders'))
    }
  }

  async createOrder(request: FastifyRequest, reply: FastifyReply) {
    try {
      const order = await orderService.createOrder(request.body)
      return reply.code(201).send(successResponse(order, 'Order created successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to create order'))
    }
  }

  async updateOrderStatus(request: FastifyRequest<{ Params: { id: string }, Body: { status: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params
      const { status } = request.body
      const order = await orderService.updateOrderStatus(id, status)
      if (!order) {
        return reply.status(404).send(errorResponse('Order not found', 404))
      }
      return reply.send(successResponse(order, 'Order status updated successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to update order status'))
    }
  }
}

export const orderController = new OrderController()
