"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore, MAX_QUANTITY_PER_ITEM } from "@/store/cartStore";

const DESCRIPTION_EXPAND_THRESHOLD = 123;

const CATEGORY_EMOJI: Record<string, string> = {
  hamburguesas: "🍔",
  "lomitos-arabes": "🥪",
  "chivitos-porciones": "🍖",
  "papas-salsas": "🍟",
  bebidas: "🥤",
};

function getEmojiForItem(categoryId: string, itemName: string): string {
  if (categoryId === "bebidas" && itemName.toLowerCase().includes("cerveza")) {
    return "🍺";
  }
  if (categoryId === "papas-salsas") {
    const name = itemName.toLowerCase();
    if (name.includes("salsa de ajo") || name.includes("ajo")) return "🧄";
    if (name.includes("mayonesa")) return "🫙";
    if (name.includes("ketchup")) return "🍅";
  }
  return CATEGORY_EMOJI[categoryId] ?? "🍽️";
}

interface ProductCardProps {
  item: MenuItem;
  categoryId: string;
}

export function ProductCard({ item, categoryId }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const canExpand = item.description.length > DESCRIPTION_EXPAND_THRESHOLD;
  const quantity = useCartStore((state) =>
    state.items.find((i) => i.id === item.id)?.quantity ?? 0
  );
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="flex gap-3 rounded-lg bg-zinc-900 p-4 shadow-sm">
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-zinc-800">
        {!item.image || imgError ? (
          <span className="text-4xl" role="img" aria-hidden>
            {getEmojiForItem(categoryId, item.name)}
          </span>
        ) : (
          <Image
            src={item.image}
            alt={item.name}
            width={96}
            height={96}
            className="h-24 w-24 object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="min-w-0 flex-1 flex flex-col gap-1">
        <h3 className="font-medium text-white">{item.name}</h3>
        <div>
          <p
            className={`text-xs text-zinc-400 ${descriptionExpanded ? "" : "line-clamp-2"}`}
          >
            {item.description}
          </p>
          {canExpand && (
            <button
              type="button"
              onClick={() => setDescriptionExpanded((e) => !e)}
              className="mt-0.5 flex items-center gap-0.5 text-xs font-medium text-orange-500 hover:text-orange-400 transition-colors"
              aria-expanded={descriptionExpanded}
            >
              {descriptionExpanded ? (
                <>
                  Ver menos <ChevronUp className="h-3.5 w-3.5" aria-hidden />
                </>
              ) : (
                <>
                  Ver más <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                </>
              )}
            </button>
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-bold text-orange-500">
            {formatPrice(item.price)}
          </span>
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => addItem(item)}
              className="flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 px-2.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 active:opacity-80"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Agregar
            </button>
          ) : (
            <div className="flex items-center gap-0.5 rounded-lg border border-zinc-600 bg-zinc-800">
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="flex h-8 w-8 items-center justify-center text-white transition-colors hover:bg-zinc-700 rounded-l-lg"
                aria-label={quantity === 1 ? "Quitar del carrito" : "Quitar uno"}
              >
                {quantity === 1 ? (
                  <Trash2 className="h-3.5 w-3.5" />
                ) : (
                  <Minus className="h-3.5 w-3.5" />
                )}
              </button>
              <span className="min-w-[1.5rem] px-1 text-center text-xs font-medium text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => addItem(item)}
                disabled={quantity >= MAX_QUANTITY_PER_ITEM}
                className="flex h-8 w-8 items-center justify-center text-white transition-colors hover:bg-zinc-700 rounded-r-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-800"
                aria-label="Agregar uno"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
