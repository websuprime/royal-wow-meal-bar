import { FastifyRequest, FastifyReply } from 'fastify'
import mongoose from 'mongoose'
import { Category } from '../models/Category'
import { successResponse, errorResponse } from '../utils/response'

export class CategoryController {
  async getAllCategories(request: FastifyRequest, reply: FastifyReply) {
    try {
      const categories = await Category.find().sort({ order: 1, name: 1 })
      return reply.send(successResponse(categories, 'Categories retrieved successfully'))
    } catch (error: any) {
      return reply.status(500).send(errorResponse(error.message || 'Failed to fetch categories'))
    }
  }

  async createCategory(request: FastifyRequest<{ Body: { name: string, type: 'restaurant' | 'bar', order?: number } }>, reply: FastifyReply) {
    try {
      const category = new Category(request.body)
      await category.save()
      return reply.code(201).send(successResponse(category, 'Category created successfully'))
    } catch (error: any) {
      return reply.status(500).send(errorResponse(error.message || 'Failed to create category'))
    }
  }

  async updateCategory(request: FastifyRequest<{ Params: { id: string }, Body: { name?: string, type?: 'restaurant' | 'bar', order?: number } }>, reply: FastifyReply) {
    try {
      const { id } = request.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send(errorResponse('Invalid category ID format', 400))
      }
      const category = await Category.findByIdAndUpdate(id, { $set: request.body }, { new: true })
      if (!category) return reply.status(404).send(errorResponse('Category not found', 404))
      return reply.send(successResponse(category, 'Category updated successfully'))
    } catch (error: any) {
      return reply.status(500).send(errorResponse(error.message || 'Failed to update category'))
    }
  }

  async deleteCategory(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send(errorResponse('Invalid category ID format', 400))
      }
      const category = await Category.findByIdAndDelete(id)
      if (!category) return reply.status(404).send(errorResponse('Category not found', 404))
      return reply.send(successResponse(null, 'Category deleted successfully'))
    } catch (error: any) {
      return reply.status(500).send(errorResponse(error.message || 'Failed to delete category'))
    }
  }
}

export const categoryController = new CategoryController()
