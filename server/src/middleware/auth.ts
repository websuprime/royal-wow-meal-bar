import { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'
import { errorResponse } from '../utils/response'

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required (see server/.env.example)')
}

export const JWT_SECRET: string = process.env.JWT_SECRET

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

    if (isReadOnly(decoded) && !['GET', 'HEAD'].includes(request.method)) {
      return reply.code(403).send(errorResponse(DEMO_READ_ONLY, 403))
    }
  } catch (error) {
    return reply.code(401).send(errorResponse('Unauthorized: Invalid or expired token', 401))
  }
}

export const DEMO_READ_ONLY = 'This is a read-only demo account: changes are not saved'

function isReadOnly(decoded: string | jwt.JwtPayload) {
  return typeof decoded === 'object' && decoded.role === 'demo'
}

// Swagger security requirement for routes guarded by verifyJwt
export const bearerSecurity = [{ bearerAuth: [] }]
