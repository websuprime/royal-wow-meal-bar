import { Order } from '../models/Order'
import { Reservation } from '../models/Reservation'

export class AnalyticsService {
  async getDashboardStats() {
    const activeOrders = await Order.countDocuments({ status: { $in: ['pending', 'preparing', 'out_for_delivery'] } })
    const upcomingBookings = await Reservation.countDocuments({ status: 'approved', date: { $gte: new Date().toISOString().split('T')[0] } })
    
    const allOrders = await Order.find({ status: 'delivered' })
    const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0)
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayOrders = await Order.countDocuments({ createdAt: { $gte: today } })
    const pendingOrders = await Order.countDocuments({ status: 'pending' })
    const preparingOrders = await Order.countDocuments({ status: 'preparing' })
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' })

    return {
      totalRevenue,
      activeOrders,
      upcomingBookings,
      todayOrders,
      pendingOrders,
      preparingOrders,
      deliveredOrders,
      revenueChange: 12.5 // Mock baseline
    }
  }
}

export const analyticsService = new AnalyticsService()
