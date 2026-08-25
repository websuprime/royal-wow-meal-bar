import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  venue: { type: String, enum: ['restaurant', 'bar'] },
  pagePath: { type: String },
  referrer: { type: String },
  utmSource: { type: String },
  utmMedium: { type: String },
  utmCampaign: { type: String },
  leadSource: { type: String },
  relatedEventTitle: { type: String },
}, { timestamps: true })

export const Contact = mongoose.model('Contact', contactSchema)
