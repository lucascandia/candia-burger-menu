export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  cartItemId: string;
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  observations?: string;
}
