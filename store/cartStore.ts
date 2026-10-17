import { create } from "zustand";
import type { CartItem, Extra, MenuItem } from "@/lib/types";
import { extrasKey, getItemLineTotal } from "@/lib/pricing";

export const MAX_QUANTITY_PER_ITEM = 10;

function normaliseObservations(obs: string | undefined): string {
  return (obs ?? "").trim().toLowerCase();
}

function newCartItemId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `cart-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface CartState {
  items: CartItem[];
  addItem: (
    item: MenuItem,
    quantity?: number,
    observations?: string,
    extras?: Extra[]
  ) => void;
  removeItem: (cartItemId: string) => void;
  updateCartItem: (
    oldCartItemId: string,
    product: MenuItem,
    newQty: number,
    newObservations: string,
    extras?: Extra[]
  ) => void;
  increment: (cartItemId: string) => void;
  decrement: (cartItemId: string) => void;
  clearCart: () => void;
  getQuantityByProductId: (productId: string) => number;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (
    item: MenuItem,
    quantity = 1,
    observations?: string,
    extras?: Extra[]
  ) =>
    set((state) => {
      const obsNorm = normaliseObservations(observations);
      const exKey = extrasKey(extras);
      const existing = state.items.find(
        (i) =>
          i.id === item.id &&
          normaliseObservations(i.observations) === obsNorm &&
          extrasKey(i.extras) === exKey
      );
      if (existing) {
        const nextQty = Math.min(
          existing.quantity + quantity,
          MAX_QUANTITY_PER_ITEM
        );
        if (nextQty <= existing.quantity) return state;
        return {
          items: state.items.map((i) =>
            i.cartItemId === existing.cartItemId
              ? { ...i, quantity: nextQty }
              : i
          ),
        };
      }
      const qty = Math.min(quantity, MAX_QUANTITY_PER_ITEM);
      if (qty < 1) return state;
      const newItem: CartItem = {
        cartItemId: newCartItemId(),
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        quantity: qty,
        observations: (observations ?? "").trim() || undefined,
        extras: extras && extras.length > 0 ? [...extras] : undefined,
      };
      return { items: [...state.items, newItem] };
    }),

  removeItem: (cartItemId: string) =>
    set((state) => ({
      items: state.items.filter((i) => i.cartItemId !== cartItemId),
    })),

  updateCartItem: (
    oldCartItemId: string,
    product: MenuItem,
    newQty: number,
    newObservations: string,
    extras?: Extra[]
  ) =>
    set((state) => {
      const withoutOld = state.items.filter(
        (i) => i.cartItemId !== oldCartItemId
      );
      const obsNorm = normaliseObservations(newObservations);
      const exKey = extrasKey(extras);
      const existing = withoutOld.find(
        (i) =>
          i.id === product.id &&
          normaliseObservations(i.observations) === obsNorm &&
          extrasKey(i.extras) === exKey
      );
      if (existing) {
        const nextQty = Math.min(
          existing.quantity + newQty,
          MAX_QUANTITY_PER_ITEM
        );
        if (nextQty <= existing.quantity)
          return { items: withoutOld };
        return {
          items: withoutOld.map((i) =>
            i.cartItemId === existing.cartItemId
              ? { ...i, quantity: nextQty }
              : i
          ),
        };
      }
      const qty = Math.min(newQty, MAX_QUANTITY_PER_ITEM);
      if (qty < 1) return { items: withoutOld };
      const newItem: CartItem = {
        cartItemId: newCartItemId(),
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        quantity: qty,
        observations:
          (newObservations ?? "").trim() || undefined,
        extras: extras && extras.length > 0 ? [...extras] : undefined,
      };
      return { items: [...withoutOld, newItem] };
    }),

  increment: (cartItemId: string) =>
    set((state) => {
      const item = state.items.find((i) => i.cartItemId === cartItemId);
      if (!item || item.quantity >= MAX_QUANTITY_PER_ITEM) return state;
      return {
        items: state.items.map((i) =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }),

  decrement: (cartItemId: string) =>
    set((state) => {
      const item = state.items.find((i) => i.cartItemId === cartItemId);
      if (!item) return state;
      if (item.quantity <= 1) {
        return { items: state.items.filter((i) => i.cartItemId !== cartItemId) };
      }
      return {
        items: state.items.map((i) =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        ),
      };
    }),

  clearCart: () => set({ items: [] }),

  getQuantityByProductId: (productId: string) =>
    get().items
      .filter((i) => i.id === productId)
      .reduce((sum, i) => sum + i.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce((sum, item) => sum + getItemLineTotal(item), 0),

  getTotalItems: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
