"use client";

import { useState } from "react";
import { X, MessageCircle, UtensilsCrossed, Store, Truck } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, getWhatsAppOrderUrl, getItemLineTotal, type OrderType, type CheckoutFormData } from "@/lib/utils";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const ORDER_OPTIONS: { value: OrderType; label: string; icon: React.ReactNode }[] = [
  { value: "local", label: "Comer en Local", icon: <UtensilsCrossed className="h-4 w-4" /> },
  { value: "retirar", label: "Para Retirar", icon: <Store className="h-4 w-4" /> },
  { value: "delivery", label: "Delivery", icon: <Truck className="h-4 w-4" /> },
];

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const [orderType, setOrderType] = useState<OrderType>("local");
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [referencia, setReferencia] = useState("");

  const totalPrice = getTotalPrice();

  const formData: CheckoutFormData = {
    name,
    ...(orderType === "local" && { tableNumber }),
    ...(orderType === "delivery" && { referencia }),
  };

  const canSubmit =
    name.trim().length > 0 &&
    (orderType !== "local" || tableNumber.trim().length > 0);

  const handleWhatsApp = () => {
    const url = getWhatsAppOrderUrl(items, orderType, formData);
    window.open(url, "_blank", "noopener,noreferrer");
    clearCart();
    onClose();
    setName("");
    setTableNumber("");
    setReferencia("");
  };

  const handleClose = () => {
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        aria-hidden
        onClick={handleClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-hidden rounded-t-2xl bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex max-h-[90vh] flex-col">
          <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-3">
            <h2 id="checkout-title" className="text-lg font-bold text-white">
              Resumen del pedido
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Tipo de pedido */}
            <fieldset className="mb-4">
              <legend className="mb-2 text-sm font-medium text-zinc-300">
                Tipo de pedido
              </legend>
              <div className="flex gap-2">
                {ORDER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={orderType === opt.value}
                    onClick={() => setOrderType(opt.value)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                      orderType === opt.value
                        ? "border-orange-500 bg-orange-500/20 text-orange-400"
                        : "border-zinc-600 bg-zinc-800/50 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800"
                    }`}
                  >
                    {opt.icon}
                    <span className="hidden sm:inline">{opt.label}</span>
                    <span className="sm:hidden">
                      {opt.value === "local" ? "Local" : opt.value === "retirar" ? "Retirar" : "Delivery"}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Formulario dinámico */}
            <div className="space-y-4">
              <div>
                <label htmlFor="checkout-name" className="mb-1 block text-sm font-medium text-zinc-300">
                  Nombre <span className="text-orange-500">*</span>
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2.5 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {orderType === "local" && (
                <div>
                  <label htmlFor="checkout-mesa" className="mb-1 block text-sm font-medium text-zinc-300">
                    Número de Mesa <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="checkout-mesa"
                    type="text"
                    inputMode="numeric"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Ej: 4"
                    className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2.5 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              )}

              {orderType === "delivery" && (
                <>
                  <div className="rounded-lg border border-orange-500 bg-orange-950/50 px-3 py-3 text-sm text-orange-200">
                    <p>
                      📍 <strong>Nota:</strong> Para calcular el costo exacto del delivery, te pediremos que nos envíes tu &quot;Ubicación Actual&quot; a través de WhatsApp una vez que envíes este pedido.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="checkout-referencia" className="mb-1 block text-sm font-medium text-zinc-300">
                      Referencia <span className="text-zinc-500">(opcional)</span>
                    </label>
                    <textarea
                      id="checkout-referencia"
                      value={referencia}
                      onChange={(e) => setReferencia(e.target.value)}
                      placeholder="Ej: portón negro, casa de dos pisos"
                      rows={2}
                      className="w-full resize-none rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2.5 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Lista de ítems */}
            <div className="mt-4 border-t border-zinc-800 pt-4">
              <h3 className="mb-3 text-sm font-medium text-zinc-300">Detalle</h3>
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
                      {formatPrice(getItemLineTotal(item))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
                disabled={!canSubmit}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-green-600 font-semibold text-white transition-colors hover:bg-green-500 active:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Pedir por WhatsApp
              </button>
              <button
                type="button"
                onClick={handleClose}
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
