"use client";

import { useState, useEffect, useRef } from "react";
import { X, Plus, Minus } from "lucide-react";
import type { CartItem, Extra, MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { getExtrasTotal, getItemLineTotal, getUnitPrice } from "@/lib/pricing";
import { extras as EXTRAS_OPTIONS } from "@/data/menu";
import { useCartStore, MAX_QUANTITY_PER_ITEM } from "@/store/cartStore";

interface AddToCartModalProps {
  product: MenuItem | null;
  editItem?: CartItem | null;
  onClose: () => void;
}

export function AddToCartModal({ product, editItem, onClose }: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [note, setNote] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const updateCartItem = useCartStore((state) => state.updateCartItem);

  useEffect(() => {
    if (!product) return;
    const isEdit = editItem != null && editItem.id === product.id;
    if (isEdit) {
      setQuantity(editItem.quantity);
      setNote(editItem.observations ?? "");
      setIsAddingNote(Boolean(editItem.observations?.trim()));
      setSelectedExtras(editItem.extras ?? []);
    } else {
      setQuantity(1);
      setIsAddingNote(false);
      setNote("");
      setSelectedExtras([]);
    }
  }, [product?.id, editItem?.cartItemId]);

  useEffect(() => {
    if (isAddingNote && noteRef.current) {
      noteRef.current.focus();
    }
  }, [isAddingNote]);

  if (!product) return null;

  const showExtras = Boolean(product.allowsExtras);
  const activeExtras = showExtras ? selectedExtras : [];
  const lineTotal = getItemLineTotal({
    ...product,
    cartItemId: "preview",
    quantity,
    extras: activeExtras,
  });
  const unitPrice = getUnitPrice({ price: product.price, extras: activeExtras });
  const extrasUnit = getExtrasTotal(activeExtras);
  const description = product.description?.trim();

  const toggleExtra = (extra: Extra) =>
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );

  const isEditMode = editItem != null && editItem.id === product.id;

  const handleAdd = () => {
    const normalizedObservation =
      !isAddingNote ? "" : (note.trim() ? note.trim().toLowerCase() : "");
    const obsArg =
      normalizedObservation === "" ? undefined : normalizedObservation;
    if (isEditMode) {
      updateCartItem(
        editItem.cartItemId,
        product,
        quantity,
        normalizedObservation,
        activeExtras
      );
    } else {
      addItem(product, quantity, obsArg, activeExtras);
    }
    onClose();
  };

  const handleCancelNote = () => {
    setNote("");
    setIsAddingNote(false);
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
        aria-labelledby="add-to-cart-title"
        className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-hidden rounded-t-2xl bg-zinc-900 shadow-2xl border-t border-zinc-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex max-h-[90vh] flex-col">
          <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-3">
            <h2
              id="add-to-cart-title"
              className="min-w-0 pr-2 text-lg font-bold text-white truncate"
            >
              {product.name}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {description && (
              <p className="text-sm leading-relaxed text-zinc-400">
                {description}
              </p>
            )}
            <p className="text-sm font-semibold text-orange-500">
              {formatPrice(unitPrice)} (unitario)
              {extrasUnit > 0 && (
                <span className="ml-1 font-normal text-zinc-500">
                  · incluye {formatPrice(extrasUnit)} en agregados
                </span>
              )}
            </p>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-300">
                Cantidad
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-600 bg-zinc-800 text-white transition-colors hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Menos"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2.5rem] text-center font-medium text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(MAX_QUANTITY_PER_ITEM, q + 1))
                  }
                  disabled={quantity >= MAX_QUANTITY_PER_ITEM}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-600 bg-zinc-800 text-white transition-colors hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Más"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {showExtras && (
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-zinc-300">
                  Agregados{" "}
                  <span className="font-normal text-zinc-500">
                    (+{formatPrice(EXTRAS_OPTIONS[0]?.price ?? 4000)} c/u)
                  </span>
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {EXTRAS_OPTIONS.map((extra) => {
                    const on = selectedExtras.some((e) => e.id === extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleExtra(extra)}
                        className={`flex min-h-[44px] items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                          on
                            ? "border-orange-500 bg-orange-500/15 text-orange-300"
                            : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500"
                        }`}
                      >
                        <span>{extra.name}</span>
                        <span aria-hidden className="text-xs">
                          {on ? "✓" : "+"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <div>
              {!isAddingNote ? (
                <button
                  type="button"
                  onClick={() => setIsAddingNote(true)}
                  className="flex items-center gap-1 text-sm font-medium text-orange-500 transition-colors hover:text-orange-400"
                >
                  <span aria-hidden>+</span> Agregar aclaración
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="add-cart-note"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Aclaraciones opcionales (sin costo)
                    </label>
                    <button
                      type="button"
                      onClick={handleCancelNote}
                      className="flex shrink-0 items-center gap-0.5 text-xs text-zinc-500 transition-colors hover:text-zinc-400"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden />
                      Cancelar aclaración
                    </button>
                  </div>
                  <textarea
                    ref={noteRef}
                    id="add-cart-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ej: sin tomate, sin mayonesa, pan bien tostado..."
                    rows={3}
                    className="w-full resize-none rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2.5 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-zinc-700 bg-zinc-950 px-4 py-4">
            <button
              type="button"
              onClick={handleAdd}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 font-semibold text-white transition-opacity motion-reduce:transition-none hover:opacity-90 active:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              {isEditMode
                ? `Guardar cambios – ${formatPrice(lineTotal)}`
                : `Agregar al pedido – ${formatPrice(lineTotal)}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
