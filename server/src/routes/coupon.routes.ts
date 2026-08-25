import { FastifyInstance } from 'fastify'
import { couponController } from '../controllers/coupon.controller'

export default async function couponRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      tags: ['Coupons'],
      summary: 'Get all coupons'
    }
  }, couponController.getAllCoupons)

  fastify.post('/validate', {
    schema: {
      tags: ['Coupons'],
      summary: 'Validate a coupon',
      body: {
        type: 'object',
        properties: { code: { type: 'string' } },
        required: ['code']
      }
    }
  }, couponController.validateCoupon)

  fastify.post('/', {
    schema: {
      tags: ['Coupons'],
      summary: 'Create a coupon',
      body: { type: 'object' }
    }
  }, couponController.createCoupon)

  fastify.put('/:id', {
    schema: {
      tags: ['Coupons'],
      summary: 'Update a coupon',
      params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      body: { type: 'object' }
    }
  }, couponController.updateCoupon)

  fastify.delete('/:id', {
    schema: {
      tags: ['Coupons'],
      summary: 'Delete a coupon',
      params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] }
    }
  }, couponController.deleteCoupon)
}
