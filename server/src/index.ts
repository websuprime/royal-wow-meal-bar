import mongoose from 'mongoose'
import { buildApp } from './app'
import { adminService } from './services/admin.service'

const app = buildApp()

const start = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/royal-wow')
    app.log.info('Connected to MongoDB')

    // Create default admin user
    await adminService.createInitialAdmin()
    app.log.info('Initial admin seeded (if not exists)')

    // Start fastify server
    await app.listen({ port: 3001, host: '0.0.0.0' })
    app.log.info(`Server listening on http://localhost:3001`)
    app.log.info(`Swagger UI available at http://localhost:3001/api/docs`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
