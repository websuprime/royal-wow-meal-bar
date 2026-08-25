import { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'
import { errorResponse } from '../utils/response'

export const JWT_SECRET = process.env.JWT_SECRET || 'royal-wow-super-secret-key-2026'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send(errorResponse('Unauthorized: No token provided', 401))
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    
    // Attach user to request
    ;(request as any).user = decoded
  } catch (error) {
    return reply.code(401).send(errorResponse('Unauthorized: Invalid or expired token', 401))
  }
}
