import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { BACKEND_URL } from './api'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `₹${price.toFixed(2)}`
}

export function generateOrderId(): string {
  return `RW-${Date.now().toString(36).toUpperCase()}`
}

export function getFileUrl(path: string): string {
  if (!path) return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600' // Default placeholder
  if (path.startsWith('http') || path.startsWith('data:')) return path
  if (path.startsWith('/uploads')) return `${BACKEND_URL}${path}`
  return path
}
