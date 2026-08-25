import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  expiryDate: { type: String, required: true },
  usageLimit: { type: Number, required: true },
  usedCount: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true })

export const Coupon = mongoose.model('Coupon', couponSchema)
