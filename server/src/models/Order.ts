import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  city: { type: String },
  items: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['card', 'upi', 'cod'], required: true },
  status: { type: String, enum: ['pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'], default: 'pending' },
  channel: { type: String, enum: ['restaurant', 'bar'], required: true },
}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema)
