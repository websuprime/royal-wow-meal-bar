import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Admin } from '../models/Admin'
import { JWT_SECRET } from '../middleware/auth'

export const DEMO_EMAIL = 'demo@royalwow.com'
export const DEMO_PASSWORD = 'royalwow-demo'

export class AdminService {
  // The real admin comes from ADMIN_EMAIL / ADMIN_PASSWORD. It is created once and never reset on restart.
  async createInitialAdmin() {
    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD
    if (!email || !password) {
      console.log('ADMIN_EMAIL / ADMIN_PASSWORD not set: no admin user created')
      return
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
      await Admin.create({ email, password: await bcrypt.hash(password, 10), role: 'admin' })
      console.log(`Admin user created: ${email}`)
    }
  }

  // The demo login is public on purpose: the 'demo' role can read everything and change nothing (see verifyJwt).
  async createDemoAdmin() {
    const email = process.env.DEMO_EMAIL || DEMO_EMAIL
    const password = process.env.DEMO_PASSWORD || DEMO_PASSWORD
    await Admin.updateOne(
      { email },
      { $set: { password: await bcrypt.hash(password, 10), role: 'demo' } },
      { upsert: true }
    )
    console.log(`Read-only demo user ready: ${email}`)
  }

  async login(email: string, passwordString: string) {
    console.log(`Login attempt for: ${email}`)
    const admin = await Admin.findOne({ email })
    if (!admin) {
      console.log(`Admin not found for email: ${email}`)
      throw new Error('Invalid credentials')
    }

    const isValid = await bcrypt.compare(passwordString, admin.password)
    console.log(`Password match for ${email}: ${isValid}`)
    if (!isValid) throw new Error('Invalid credentials')

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    return { token, email: admin.email, role: admin.role }
  }
}

export const adminService = new AdminService()
