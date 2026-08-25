import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  bannerImage: { type: String, required: true },
  status: { type: String, enum: ['upcoming', 'sold_out', 'limited', 'completed'], default: 'upcoming' },
  seatsRemaining: { type: Number },
}, { timestamps: true })

export const Event = mongoose.model('Event', eventSchema)
