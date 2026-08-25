import { FastifyInstance } from 'fastify'
import { categoryController } from '../controllers/category.controller'

export default async function categoryRoutes(fastify: FastifyInstance) {
  fastify.get('/', categoryController.getAllCategories)
  fastify.post('/', categoryController.createCategory)
  fastify.put('/:id', categoryController.updateCategory)
  fastify.delete('/:id', categoryController.deleteCategory)
}
