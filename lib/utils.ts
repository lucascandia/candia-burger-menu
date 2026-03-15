import type { CartItem } from "@/lib/types";

export function formatPrice(price: number): string {
  return `Gs. ${price.toLocaleString("es-PY").replace(/,/g, ".")}`;
}

export const SALSA_AJO_ITEM_ID = "s1";

/** Precio por cantidad para Salsa de ajo: 1 → 2000, 2 → 3000, 3 → 5000; 4+ → 5000 + (qty-3)*2000 */
export function getSalsaAjoLineTotal(quantity: number): number {
  if (quantity <= 0) return 0;
  if (quantity === 1) return 2000;
  if (quantity === 2) return 3000;
  if (quantity === 3) return 5000;
  return 5000 + (quantity - 3) * 2000;
}

export function getItemLineTotal(item: CartItem): number {
  if (item.id === SALSA_AJO_ITEM_ID) return getSalsaAjoLineTotal(item.quantity);
  return item.price * item.quantity;
}

export type OrderType = "local" | "retirar" | "delivery";

export interface CheckoutFormData {
  name: string;
  tableNumber?: string;
  referencia?: string;
}

function formatOrderLines(items: CartItem[]): string[] {
  return items.map(
    (item) =>
      `${item.quantity}x ${item.name} (${formatPrice(getItemLineTotal(item))})`
  );
}

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  orderType: OrderType,
  formData: CheckoutFormData
): string {
  const total = items.reduce((sum, item) => sum + getItemLineTotal(item), 0);
  const detailLines = formatOrderLines(items);
  const name = formData.name.trim();

  if (orderType === "delivery") {
    const ref = (formData.referencia ?? "").trim() || "—";
    return [
      "🛵 *Pedido para Delivery*",
      `A nombre de: ${name}`,
      `Referencia: ${ref}`,
      "",
      "*Detalle del pedido:*",
      ...detailLines,
      "",
      `Total: ${formatPrice(total)}`,
      "",
      "📍 *ATENCIÓN: Te enviaré mi ubicación de WhatsApp a continuación para calcular el envío.*",
    ].join("\n");
  }

  const label = orderType === "local" ? "Comer en Local" : "Retirar";
  const lines: string[] = [
    `🍽️ *Pedido para ${label}*`,
    ...(orderType === "local" && formData.tableNumber?.trim()
      ? [`Mesa: ${formData.tableNumber.trim()}`]
      : []),
    `A nombre de: ${name}`,
    "",
    "*Detalle del pedido:*",
    ...detailLines,
    "",
    `Total: ${formatPrice(total)}`,
  ];
  return lines.join("\n");
}

const WHATSAPP_NUMBER = "595983009309";

export function getWhatsAppOrderUrl(
  items: CartItem[],
  orderType: OrderType,
  formData: CheckoutFormData
): string {
  const message = buildWhatsAppOrderMessage(items, orderType, formData);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
