import { FastifyRequest, FastifyReply } from 'fastify'
import { couponService } from '../services/coupon.service'
import { successResponse, errorResponse } from '../utils/response'

export class CouponController {
  async getAllCoupons(request: FastifyRequest, reply: FastifyReply) {
    try {
      const coupons = await couponService.getAllCoupons()
      return reply.send(successResponse(coupons, 'Coupons retrieved successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to fetch coupons'))
    }
  }

  async validateCoupon(request: FastifyRequest<{ Body: { code: string } }>, reply: FastifyReply) {
    try {
      const { code } = request.body
      const coupon = await couponService.validateCoupon(code)
      return reply.send(successResponse(coupon, 'Coupon validated successfully'))
    } catch (error: any) {
      return reply.status(400).send(errorResponse(error.message, 400))
    }
  }

  async createCoupon(request: FastifyRequest, reply: FastifyReply) {
    try {
      const coupon = await couponService.createCoupon(request.body)
      return reply.code(201).send(successResponse(coupon, 'Coupon created successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to create coupon'))
    }
  }

  async updateCoupon(request: FastifyRequest<{ Params: { id: string }, Body: any }>, reply: FastifyReply) {
    try {
      const { id } = request.params
      const coupon = await couponService.updateCoupon(id, request.body)
      if (!coupon) return reply.status(404).send(errorResponse('Coupon not found', 404))
      return reply.send(successResponse(coupon, 'Coupon updated successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to update coupon'))
    }
  }

  async deleteCoupon(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params
      const coupon = await couponService.deleteCoupon(id)
      if (!coupon) return reply.status(404).send(errorResponse('Coupon not found', 404))
      return reply.send(successResponse(null, 'Coupon deleted successfully'))
    } catch (error) {
      return reply.status(500).send(errorResponse('Failed to delete coupon'))
    }
  }
}

export const couponController = new CouponController()
