export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  /** Pizza: se puede pedir entera o mitad y mitad con otro sabor. */
  kind?: "pizza";
  /** Admite los agregados (carne, huevo, cheddar, etc.) en el modal. */
  allowsExtras?: boolean;
}

export interface MenuCategory {
  id: string;
  category: string;
  items: MenuItem[];
}

export interface Extra {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  id: string;
  name: string;
  description: string;
  /** Precio base unitario, sin agregados. */
  price: number;
  image: string;
  quantity: number;
  observations?: string;
  extras?: Extra[];
}
