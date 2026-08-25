import { Coupon } from '../models/Coupon'

export class CouponService {
  async getAllCoupons() {
    return Coupon.find()
  }

  async validateCoupon(code: string) {
    const coupon = await Coupon.findOne({ code, active: true })
    if (!coupon) throw new Error('Invalid or expired coupon')
    
    if (new Date(coupon.expiryDate) < new Date()) {
      throw new Error('Coupon expired')
    }
    
    if (coupon.usedCount >= coupon.usageLimit) {
      throw new Error('Coupon usage limit reached')
    }

    return coupon
  }

  async createCoupon(data: any) {
    const coupon = new Coupon(data)
    await coupon.save()
    return coupon
  }

  async updateCoupon(id: string, data: any) {
    return Coupon.findByIdAndUpdate(id, data, { new: true })
  }

  async deleteCoupon(id: string) {
    return Coupon.findByIdAndDelete(id)
  }
}

export const couponService = new CouponService()
