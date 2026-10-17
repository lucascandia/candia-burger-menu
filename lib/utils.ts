import type { CartItem } from "@/lib/types";

export function formatPrice(price: number): string {
  return `Gs. ${price.toLocaleString("es-PY").replace(/,/g, ".")}`;
}

export { SALSA_AJO_ITEM_ID, getSalsaAjoLineTotal, getItemLineTotal } from "./pricing";
import { getItemLineTotal } from "./pricing";

export type OrderType = "local" | "retirar" | "delivery";

export interface CheckoutFormData {
  name: string;
  tableNumber?: string;
  referencia?: string;
}

function formatOrderLines(items: CartItem[]): string[] {
  return items.flatMap((item) => {
    const line = `${item.quantity}x ${item.name} (${formatPrice(getItemLineTotal(item))})`;
    const out = [line];
    if (item.extras && item.extras.length > 0) {
      out.push(`  + Agregados: ${item.extras.map((e) => e.name).join(", ")}`);
    }
    const obs = (item.observations ?? "").trim();
    if (obs) out.push(`  *Nota: ${obs}*`);
    return out;
  });
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
