import { SwaggerOptions } from '@fastify/swagger'
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui'

export const swaggerConfig: SwaggerOptions = {
  openapi: {
    info: {
      title: 'Royal Wow API',
      description: 'API documentation for Royal Wow Restaurant and Bar',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Local environment'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
}

export const swaggerUiConfig: FastifySwaggerUiOptions = {
  routePrefix: '/api/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header: string) => header,
}
