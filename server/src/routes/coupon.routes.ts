import { FastifyInstance } from 'fastify'
import { verifyJwt, bearerSecurity } from '../middleware/auth'
import { couponController } from '../controllers/coupon.controller'

export default async function couponRoutes(fastify: FastifyInstance) {
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

  // Admin-only routes: every route registered in this scope requires a valid JWT
  fastify.register(async (admin) => {
    admin.addHook('preHandler', verifyJwt)

    admin.get('/', {
      schema: {
        security: bearerSecurity,
        tags: ['Coupons'],
        summary: 'Get all coupons'
      }
    }, couponController.getAllCoupons)

    admin.post('/', {
      schema: {
        security: bearerSecurity,
        tags: ['Coupons'],
        summary: 'Create a coupon',
        body: { type: 'object' }
      }
    }, couponController.createCoupon)

    admin.put('/:id', {
      schema: {
        security: bearerSecurity,
        tags: ['Coupons'],
        summary: 'Update a coupon',
        params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
        body: { type: 'object' }
      }
    }, couponController.updateCoupon)

    admin.delete('/:id', {
      schema: {
        security: bearerSecurity,
        tags: ['Coupons'],
        summary: 'Delete a coupon',
        params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] }
      }
    }, couponController.deleteCoupon)
  })
}
