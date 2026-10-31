import 'dotenv/config'
import mongoose from 'mongoose'
import { buildApp } from './app'
import { adminService } from './services/admin.service'

const app = buildApp()

const start = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/royal-wow')
    app.log.info('Connected to MongoDB')

    // Create the admin (from env) and the read-only demo user
    await adminService.createInitialAdmin()
    await adminService.createDemoAdmin()

    // Start fastify server
    const port = Number(process.env.PORT) || 3001
    await app.listen({ port, host: '0.0.0.0' })
    app.log.info(`Server listening on http://localhost:${port}`)
    app.log.info(`Swagger UI available at http://localhost:${port}/api/docs`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
