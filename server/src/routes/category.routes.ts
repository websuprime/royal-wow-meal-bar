import { FastifyInstance } from 'fastify'
import { verifyJwt, bearerSecurity } from '../middleware/auth'
import { categoryController } from '../controllers/category.controller'

export default async function categoryRoutes(fastify: FastifyInstance) {
  fastify.get('/', categoryController.getAllCategories)

  // Admin-only routes: every route registered in this scope requires a valid JWT
  fastify.register(async (admin) => {
    admin.addHook('preHandler', verifyJwt)

    admin.post('/', { schema: { security: bearerSecurity } }, categoryController.createCategory)
    admin.put('/:id', { schema: { security: bearerSecurity } }, categoryController.updateCategory)
    admin.delete('/:id', { schema: { security: bearerSecurity } }, categoryController.deleteCategory)
  })
}
