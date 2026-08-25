import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  specialRequests: { type: String },
  type: { type: String, enum: ['restaurant', 'bar'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' },
}, { timestamps: true })

export const Reservation = mongoose.model('Reservation', reservationSchema)
