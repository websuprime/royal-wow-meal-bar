import { Reservation } from '../models/Reservation'

export class ReservationService {
  async getAllReservations() {
    return Reservation.find().sort({ date: 1, time: 1 })
  }

  async createReservation(data: any) {
    const res = new Reservation(data)
    await res.save()
    return res
  }

  async updateReservationStatus(id: string, status: string) {
    return Reservation.findByIdAndUpdate(id, { status }, { new: true })
  }
}

export const reservationService = new ReservationService()
