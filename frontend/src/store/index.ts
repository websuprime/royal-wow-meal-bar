import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, MenuItem } from '@/types'

interface CartStore {
  items: CartItem[];
  channel: 'restaurant' | 'bar';
  setChannel: (channel: 'restaurant' | 'bar') => void;
  addItem: (item: MenuItem, variation?: { label: string, price: number }) => void;
  removeItem: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getServiceFee: () => number;
  getTotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      channel: 'restaurant',
      setChannel: (channel) => set({ channel }),
      addItem: (item, variation) => {
        const uniqueId = variation ? `${item._id}-${variation.label}` : item._id;
        const price = variation ? variation.price : item.price;
        
        const existing = get().items.find((i) => (i as any).uniqueId === uniqueId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              (i as any).uniqueId === uniqueId ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ 
            items: [
              ...get().items, 
              { ...item, price, quantity: 1, selectedVariation: variation, uniqueId } as any 
            ] 
          });
        }
      },
      removeItem: (uniqueId) => {
        set({ items: get().items.filter((i) => (i as any).uniqueId !== uniqueId) });
      },
      updateQuantity: (uniqueId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => (i as any).uniqueId !== uniqueId) });
        } else {
          set({
            items: get().items.map((i) =>
              (i as any).uniqueId === uniqueId ? { ...i, quantity } : i
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      getServiceFee: () => get().getSubtotal() * 0.12,
      getTotal: () => get().getSubtotal() + get().getServiceFee(),
      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'royal-wow-cart' }
  )
)

interface AdminStore {
  token: string | null;
  email: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (email: string, token: string, role: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      role: null,
      isAuthenticated: false,
      login: (email, token, role) => set({ email, token, role, isAuthenticated: true }),
      logout: () => set({ email: null, token: null, role: null, isAuthenticated: false }),
    }),
    { name: 'royal-wow-admin' }
  )
)
