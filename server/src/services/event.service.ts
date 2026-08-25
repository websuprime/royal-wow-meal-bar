import { Event } from '../models/Event'

export class EventService {
  async getAllEvents() {
    return Event.find().sort({ date: 1 })
  }

  async createEvent(data: any) {
    const event = new Event(data)
    await event.save()
    return event
  }

  async updateEvent(id: string, data: any) {
    return Event.findByIdAndUpdate(id, data, { new: true })
  }

  async deleteEvent(id: string) {
    return Event.findByIdAndDelete(id)
  }
}

export const eventService = new EventService()
