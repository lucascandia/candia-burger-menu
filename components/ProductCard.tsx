"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { buildHalfPizza } from "@/lib/pricing";
import { useCartStore } from "@/store/cartStore";

const DESCRIPTION_EXPAND_THRESHOLD = 123;

const CATEGORY_EMOJI: Record<string, string> = {
  hamburguesas: "🍔",
  "lomitos-arabes": "🥪",
  "otras-opciones": "🥪",
  papas: "🍟",
  "combo-kids": "🧒",
  pizzas: "🍕",
  salsas: "🧄",
  bebidas: "🥤",
  cervezas: "🍺",
};

function getEmojiForCategory(categoryId: string): string {
  return CATEGORY_EMOJI[categoryId] ?? "🍽️";
}

const BOX_BASE =
  "min-h-[44px] rounded-lg border px-3 py-2 text-left text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";
const BOX_ON = "border-orange-500 bg-orange-500/10 text-white";
const BOX_OFF = "border-zinc-800 bg-zinc-800/40 text-zinc-300 hover:border-zinc-600";

interface ProductCardProps {
  item: MenuItem;
  categoryId: string;
  /** Items de la misma categoría (para elegir el segundo sabor de una pizza mitad y mitad). */
  siblings?: MenuItem[];
  onAddClick: (item: MenuItem) => void;
}

export function ProductCard({ item, categoryId, siblings = [], onAddClick }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const canExpand = item.description.length > DESCRIPTION_EXPAND_THRESHOLD;
  const isPizza = item.kind === "pizza";
  const [mode, setMode] = useState<"whole" | "half">("whole");
  const [secondId, setSecondId] = useState<string | null>(null);
  const otherPizzas = siblings.filter((s) => s.kind === "pizza" && s.id !== item.id);
  const second = mode === "half" ? otherPizzas.find((s) => s.id === secondId) ?? null : null;
  const effectiveItem = second ? buildHalfPizza(item, second) : item;
  const needsSecond = isPizza && mode === "half" && !second;
  const quantityInCart = useCartStore((state) =>
    state.getQuantityByProductId(effectiveItem.id)
  );

  return (
    <article className="group flex flex-col gap-3 rounded-lg border border-zinc-800/70 bg-zinc-950 p-3 transition-all duration-300 motion-reduce:transition-none motion-safe:hover:-translate-y-0.5 hover:border-orange-500/60 hover:shadow-[0_0_24px_-4px_rgba(249,115,22,0.35)]">
      <div className="flex gap-3">
      <div className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-900">
        {!effectiveItem.image || imgError ? (
          <span className="text-3xl" role="img" aria-hidden>
            {getEmojiForCategory(categoryId)}
          </span>
        ) : (
          <Image
            src={effectiveItem.image}
            alt={item.name}
            width={88}
            height={88}
            className="h-[88px] w-[88px] object-cover transition-transform duration-500 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-[1.08]"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="min-w-0 flex-1 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-white leading-snug">{item.name}</h3>
        <div>
          {item.description && (
            <p
              className={`text-xs text-zinc-500 leading-relaxed ${descriptionExpanded ? "" : "line-clamp-2"}`}
            >
              {item.description}
            </p>
          )}
          {canExpand && (
            <button
              type="button"
              onClick={() => setDescriptionExpanded((e) => !e)}
              className="mt-0.5 flex items-center gap-0.5 text-xs font-medium text-orange-500 hover:text-orange-400 transition-colors"
              aria-expanded={descriptionExpanded}
            >
              {descriptionExpanded ? (
                <>Ver menos <ChevronUp className="h-3.5 w-3.5" aria-hidden /></>
              ) : (
                <>Ver más <ChevronDown className="h-3.5 w-3.5" aria-hidden /></>
              )}
            </button>
          )}
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          <span className="font-display text-xl leading-none tracking-wide text-orange-500">
            {formatPrice(effectiveItem.price)}
          </span>
          <div className="flex items-center gap-2">
            {quantityInCart > 0 && (
              <span className="text-xs text-zinc-500">
                {quantityInCart} en pedido
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                if (needsSecond) return;
                onAddClick(effectiveItem);
              }}
              aria-disabled={needsSecond}
              className={`flex min-h-[44px] items-center justify-center gap-1 rounded-md px-4 py-1.5 text-xs font-semibold text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                needsSecond
                  ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                  : "bg-orange-600 hover:bg-orange-500 active:bg-orange-700"
              }`}
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Agregar
            </button>
          </div>
        </div>
      </div>
      </div>
      {isPizza && (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Tipo de pizza">
            {([["whole", "Entera"], ["half", "Mitad y mitad"]] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className={`${BOX_BASE} font-semibold ${mode === value ? BOX_ON : BOX_OFF}`}
              >
                {label}
              </button>
            ))}
          </div>
          {mode === "half" && (
            <div>
              <p className="mb-1.5 text-xs text-zinc-500">
                Elegí el segundo sabor · el precio final es el del sabor más caro
              </p>
              <div className="grid grid-cols-2 gap-2" role="group" aria-label="Segundo sabor">
                {otherPizzas.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={secondId === p.id}
                    onClick={() => setSecondId(p.id)}
                    className={`${BOX_BASE} ${secondId === p.id ? BOX_ON : BOX_OFF}`}
                  >
                    <span className="block font-medium leading-snug">{p.name.replace(/^Pizza\s+/i, "")}</span>
                    <span className="font-display text-sm tracking-wide text-orange-500">
                      {formatPrice(Math.max(item.price, p.price))}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
