import type { CartItem, Extra, MenuItem } from "./types";

export const SALSA_AJO_ITEM_ID = "s1";

/** Precio por cantidad de salsas: 1 → 2000, 2 → 3000, 3 → 5000; 4+ → 5000 + (qty-3)*2000 */
export function getSalsaAjoLineTotal(quantity: number): number {
  if (quantity <= 0) return 0;
  if (quantity === 1) return 2000;
  if (quantity === 2) return 3000;
  if (quantity === 3) return 5000;
  return 5000 + (quantity - 3) * 2000;
}

export function getExtrasTotal(extras: Extra[] | undefined): number {
  return (extras ?? []).reduce((sum, e) => sum + e.price, 0);
}

/** Clave estable de un conjunto de agregados (independiente del orden). */
export function extrasKey(extras: Extra[] | undefined): string {
  return (extras ?? [])
    .map((e) => e.id)
    .sort()
    .join(",");
}

export function getUnitPrice(item: Pick<CartItem, "price" | "extras">): number {
  return item.price + getExtrasTotal(item.extras);
}

export function getItemLineTotal(item: CartItem): number {
  if (item.id === SALSA_AJO_ITEM_ID) return getSalsaAjoLineTotal(item.quantity);
  return getUnitPrice(item) * item.quantity;
}

/** Fotos reales de combinaciones mitad y mitad, por id compuesto (ids ordenados). */
const HALF_PIZZA_IMAGES: Record<string, string> = {
  "z2+z5": "/images/pizza-mitad-pepperoni-pollo-katupiry.jpeg",
  "z4+z5": "/images/pizza-mitad-choclo-pollo-katupiry.jpeg",
  "z3+z5": "/images/pizza-mitad-napolitana-pollo-katupiry.jpeg",
};

function flavorOf(pizza: MenuItem): string {
  return pizza.name.replace(/^Pizza\s+/i, "");
}

/**
 * Pizza mitad y mitad: un MenuItem derivado cuyo precio es el del sabor más caro.
 * El id no depende del orden de elección, así el carrito junta pedidos iguales.
 */
export function buildHalfPizza(a: MenuItem, b: MenuItem): MenuItem {
  if (a.id === b.id) return a;
  const [first, second] = [a, b].sort((x, y) => x.id.localeCompare(y.id));
  const id = `${first.id}+${second.id}`;
  return {
    id,
    name: `Pizza mitad ${flavorOf(first)} / mitad ${flavorOf(second)}`,
    description: `Mitad ${flavorOf(first)} y mitad ${flavorOf(second)} (8 porciones)`,
    price: Math.max(a.price, b.price),
    image: HALF_PIZZA_IMAGES[id] ?? (first.image || second.image),
    kind: "pizza",
  };
}
