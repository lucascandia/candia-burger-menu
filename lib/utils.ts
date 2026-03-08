import type { CartItem } from "@/lib/types";

export function formatPrice(price: number): string {
  return `Gs. ${price.toLocaleString("es-PY").replace(/,/g, ".")}`;
}

export function buildWhatsAppMessage(items: CartItem[]): string {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lines: string[] = [
    "Hola Candia Burger, quiero hacer el siguiente pedido:",
    "",
    ...items.map(
      (item) =>
        ` - ${item.quantity}x ${item.name} (${formatPrice(item.price * item.quantity)})`
    ),
    "",
    `Total: ${formatPrice(total)}`,
  ];
  return lines.join("\n");
}

const WHATSAPP_NUMBER = "595983009309";

export function getWhatsAppOrderUrl(items: CartItem[]): string {
  const message = buildWhatsAppMessage(items);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
