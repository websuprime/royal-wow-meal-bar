import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Admin } from '../models/Admin'
import { JWT_SECRET } from '../middleware/auth'

export class AdminService {
  async createInitialAdmin() {
    const email = 'admin@royalwow.com'
    const password = 'admin123'
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const admin = await Admin.findOne({ email })
    if (!admin) {
      await Admin.create({ email, password: hashedPassword, role: 'admin' })
      console.log(`Default admin user created: ${email} / ${password}`)
    } else {
      admin.password = hashedPassword
      await admin.save()
      console.log(`Default admin user password reset: ${email} / ${password}`)
    }
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
