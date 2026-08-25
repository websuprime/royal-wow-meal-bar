import apiClient from './api'
import type { MenuItem, Order, Reservation, BarEvent, ContactMessage, Coupon, DashboardStats, Category } from '../types'

// Menu API
export const apiGetMenu = async () => (await apiClient.get<{data: MenuItem[]}>('/menu')).data.data
export const apiGetMenuByType = async (type: string) => (await apiClient.get<{data: MenuItem[]}>(`/menu/${type}`)).data.data
export const apiCreateMenuItem = async (data: Partial<MenuItem> | FormData) => (await apiClient.post<{data: MenuItem}>('/menu', data)).data.data
export const apiUpdateMenuItem = async (id: string, data: Partial<MenuItem> | FormData) => (await apiClient.put<{data: MenuItem}>(`/menu/${id}`, data)).data.data
export const apiDeleteMenuItem = async (id: string) => (await apiClient.delete(`/menu/${id}`)).data

export type MenuImportResult = { created: number; updated: number; errors: string[] }

export const apiExportMenuCsv = async (type: 'restaurant' | 'bar' | 'all') => {
  const res = await apiClient.get<Blob>(`/menu/export/csv?type=${type}`, { responseType: 'blob' })
  return res.data
}

export const apiExportMenuXlsx = async (type: 'restaurant' | 'bar' | 'all') => {
  const res = await apiClient.get<Blob>(`/menu/export/xlsx?type=${type}`, { responseType: 'blob' })
  return res.data
}

export const apiImportMenuFile = async (file: File, defaultType?: 'restaurant' | 'bar') => {
  const fd = new FormData()
  fd.append('file', file)
  const q = defaultType ? `?defaultType=${defaultType}` : ''
  return (await apiClient.post<{ success: boolean; message: string; data: MenuImportResult }>(`/menu/import${q}`, fd))
    .data
}

// Orders API
export const apiGetOrders = async () => (await apiClient.get<{data: Order[]}>('/orders')).data.data
export const apiCreateOrder = async (data: Partial<Order>) => (await apiClient.post<{data: Order}>('/orders', data)).data.data
export const apiUpdateOrderStatus = async (id: string, status: string) => (await apiClient.put<{data: Order}>(`/orders/${id}/status`, { status })).data.data

// Reservations API
export const apiGetReservations = async () => (await apiClient.get<{data: Reservation[]}>('/reservations')).data.data
export const apiCreateReservation = async (data: Partial<Reservation>) => (await apiClient.post<{data: Reservation}>('/reservations', data)).data.data
export const apiUpdateReservationStatus = async (id: string, status: string) => (await apiClient.put<{data: Reservation}>(`/reservations/${id}/status`, { status })).data.data

// Events API
export const apiGetEvents = async () => (await apiClient.get<{data: BarEvent[]}>('/events')).data.data
export const apiCreateEvent = async (data: Partial<BarEvent>) => (await apiClient.post<{data: BarEvent}>('/events', data)).data.data
export const apiUpdateEvent = async (id: string, data: Partial<BarEvent>) => (await apiClient.put<{data: BarEvent}>(`/events/${id}`, data)).data.data
export const apiDeleteEvent = async (id: string) => (await apiClient.delete(`/events/${id}`)).data

// Contact API
export const apiGetContacts = async () => (await apiClient.get<{data: ContactMessage[]}>('/contact')).data.data
export const apiCreateContact = async (data: Partial<ContactMessage>) => (await apiClient.post<{data: ContactMessage}>('/contact', data)).data.data
export const apiUpdateContactStatus = async (id: string, status: string) => (await apiClient.put<{data: ContactMessage}>(`/contact/${id}/status`, { status })).data.data

// Coupons API
export const apiGetCoupons = async () => (await apiClient.get<{data: Coupon[]}>('/coupons')).data.data
export const apiCreateCoupon = async (data: Partial<Coupon>) => (await apiClient.post<{data: Coupon}>('/coupons', data)).data.data
export const apiUpdateCoupon = async (id: string, data: Partial<Coupon>) => (await apiClient.put<{data: Coupon}>(`/coupons/${id}`, data)).data.data
export const apiDeleteCoupon = async (id: string) => (await apiClient.delete(`/coupons/${id}`)).data
export const apiValidateCoupon = async (code: string) => (await apiClient.post<{data: Coupon}>('/coupons/validate', { code })).data.data

// Admin API
export const apiAdminLogin = async (data: any) => (await apiClient.post<{data: {token: string, email: string, role: string}}>('/admin/login', data)).data.data
export const apiGetDashboardStats = async () => (await apiClient.get<{data: DashboardStats}>('/analytics/dashboard')).data.data

// Categories API
export const apiGetCategories = async () => (await apiClient.get<{data: Category[]}>('/categories')).data.data
export const apiCreateCategory = async (data: Partial<Category>) => (await apiClient.post<{data: Category}>('/categories', data)).data.data
export const apiUpdateCategory = async (id: string, data: Partial<Category>) => (await apiClient.put<{data: Category}>(`/categories/${id}`, data)).data.data
export const apiDeleteCategory = async (id: string) => (await apiClient.delete(`/categories/${id}`)).data
