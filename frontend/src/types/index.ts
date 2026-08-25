export interface Variation {
  label: string;
  price: number;
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  type: 'restaurant' | 'bar';
  origin?: string;
  ingredients?: string[];
  tags?: string[];
  available: boolean;
  variations?: Variation[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedVariation?: Variation;
  uniqueId: string;
}

export interface Order {
  _id?: string;
  orderId: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pinCode: string;
  specialInstructions: string;
  paymentMethod: 'card' | 'upi' | 'cod';
  subtotal: number;
  serviceFee: number;
  total: number;
  status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  couponCode?: string;
  discount?: number;
  channel: 'restaurant' | 'bar';
  createdAt?: string;
}

export interface Reservation {
  _id?: string;
  customerName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'approved' | 'rejected';
  type: 'restaurant' | 'bar';
  specialRequests?: string;
  createdAt?: string;
}

export interface BarEvent {
  _id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  bannerImage: string;
  status: 'upcoming' | 'sold_out' | 'limited';
  seatsRemaining?: number;
}

export interface ContactMessage {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt?: string;
  venue?: 'restaurant' | 'bar';
  pagePath?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  leadSource?: string;
  relatedEventTitle?: string;
}

export interface Category {
  _id?: string;
  name: string;
  type: 'restaurant' | 'bar';
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Coupon {
  _id?: string;
  code: string;
  discountPercentage: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

export interface GalleryImage {
  _id?: string;
  url: string;
  category: 'interior' | 'food' | 'bar' | 'events';
  caption?: string;
}

export interface AdminUser {
  email: string;
  token: string;
}

export interface DashboardStats {
  totalRevenue: number;
  activeOrders: number;
  upcomingBookings: number;
  todayOrders: number;
  pendingOrders: number;
  preparingOrders: number;
  deliveredOrders: number;
  revenueChange: number;
}
