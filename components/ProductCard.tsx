"use client";

import { Plus, Minus } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  item: MenuItem;
}

export function ProductCard({ item }: ProductCardProps) {
  const quantity = useCartStore((state) =>
    state.items.find((i) => i.id === item.id)?.quantity ?? 0
  );
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="rounded-lg bg-zinc-900 p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-white">{item.name}</h3>
        <p className="text-sm text-zinc-400">{item.description}</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <span className="text-lg font-semibold text-orange-500">
            {formatPrice(item.price)}
          </span>
          <div className="flex items-center gap-2">
            {quantity === 0 ? (
              <button
                type="button"
                onClick={() => addItem(item)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1 rounded-lg bg-orange-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-500 active:bg-orange-700"
              >
                <Plus className="h-4 w-4" aria-hidden />
                Agregar
              </button>
            ) : (
              <div className="flex items-center gap-1 rounded-lg border border-zinc-600 bg-zinc-800">
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center text-white hover:bg-zinc-700 rounded-l-lg transition-colors"
                  aria-label="Quitar uno"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2ch] px-2 text-center font-medium text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => addItem(item)}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center text-white hover:bg-zinc-700 rounded-r-lg transition-colors"
                  aria-label="Agregar uno"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
