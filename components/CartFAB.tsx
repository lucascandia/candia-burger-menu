"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

interface CartFABProps {
  onOpenCheckout: () => void;
}

export function CartFAB({ onOpenCheckout }: CartFABProps) {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems < 1) return null;

  return (
    <button
      type="button"
      onClick={onOpenCheckout}
      className="fixed bottom-6 left-1/2 z-50 flex min-h-[52px] -translate-x-1/2 items-center gap-3 rounded-xl bg-orange-600 px-5 py-3 text-white shadow-lg shadow-orange-950/50 transition-colors hover:bg-orange-500 active:bg-orange-700"
      aria-label="Ver pedido"
    >
      <ShoppingCart className="h-6 w-6" aria-hidden />
      <span className="flex flex-col items-start text-left">
        <span className="text-xs font-medium opacity-90">
          {totalItems} {totalItems === 1 ? "ítem" : "ítems"}
        </span>
        <span className="text-lg font-bold">{formatPrice(totalPrice)}</span>
      </span>
      <span className="font-semibold">Ver Pedido</span>
    </button>
  );
}
