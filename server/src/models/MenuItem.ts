import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, enum: ['restaurant', 'bar'], required: true },
  origin: { type: String },
  tags: [{ type: String }],
  available: { type: Boolean, default: true },
  variations: [{
    label: { type: String, required: true },
    price: { type: Number, required: true }
  }]
}, { timestamps: true })

export const MenuItem = mongoose.model('MenuItem', menuItemSchema)
