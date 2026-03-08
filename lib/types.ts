export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
