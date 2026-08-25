import { Order } from '../models/Order'

export class OrderService {
  async getAllOrders() {
    return Order.find().populate('items._id').sort({ createdAt: -1 })
  }

  async createOrder(data: any) {
    const order = new Order(data)
    await order.save()
    return order
  }

  async updateOrderStatus(id: string, status: string) {
    return Order.findByIdAndUpdate(id, { status }, { new: true })
  }
}

export const orderService = new OrderService()
