import { create } from "zustand";
import type { MenuItem } from "@/lib/types";

export const MAX_QUANTITY_PER_ITEM = 10;

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getQuantity: (itemId: string) => number;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item: MenuItem) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      const nextQty = existing ? existing.quantity + 1 : 1;
      if (nextQty > MAX_QUANTITY_PER_ITEM) return state;
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: nextQty } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),

  removeItem: (itemId: string) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === itemId);
      if (!existing) return state;
      if (existing.quantity <= 1) {
        return { items: state.items.filter((i) => i.id !== itemId) };
      }
      return {
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }),

  clearCart: () => set({ items: [] }),

  getQuantity: (itemId: string) => {
    const item = get().items.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  },

  getTotalPrice: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

  getTotalItems: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
