import { Contact } from '../models/Contact'

export class ContactService {
  async getAllContacts() {
    return Contact.find().sort({ createdAt: -1 })
  }

  async createContact(data: any) {
    const contact = new Contact(data)
    await contact.save()
    return contact
  }

  async updateContactStatus(id: string, status: string) {
    return Contact.findByIdAndUpdate(id, { status }, { new: true })
  }
}

export const contactService = new ContactService()
