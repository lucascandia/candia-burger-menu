"use client";

import { X, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, getWhatsAppOrderUrl } from "@/lib/utils";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = getTotalPrice();

  if (!open) return null;

  const handleWhatsApp = () => {
    const url = getWhatsAppOrderUrl(items);
    window.open(url, "_blank", "noopener,noreferrer");
    clearCart();
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-hidden rounded-t-2xl bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex max-h-[85vh] flex-col">
          <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-3">
            <h2 id="checkout-title" className="text-lg font-bold text-white">
              Resumen del pedido
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between gap-2 border-b border-zinc-800 pb-3 text-sm last:border-0"
                >
                  <span className="text-white">
                    <span className="font-medium">{item.quantity}x</span>{" "}
                    {item.name}
                  </span>
                  <span className="shrink-0 font-medium text-orange-500">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-zinc-700 bg-zinc-950 px-4 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-xl font-bold text-orange-500">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-green-600 font-semibold text-white transition-colors hover:bg-green-500 active:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Pedir por WhatsApp
              </button>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] rounded-lg border border-zinc-600 bg-transparent font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
              >
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
