import type { Extra, MenuCategory } from "@/lib/types";

export const EXTRA_PRICE = 4000;

/** Agregados del menú: Gs. 4.000 c/u. Se ofrecen en los productos con `allowsExtras`. */
export const extras: Extra[] = [
  { id: "x-carne", name: "Carne", price: EXTRA_PRICE },
  { id: "x-huevo", name: "Huevo", price: EXTRA_PRICE },
  { id: "x-cheddar", name: "Cheddar", price: EXTRA_PRICE },
  { id: "x-katupiry", name: "Katupiry", price: EXTRA_PRICE },
  { id: "x-mozzarella", name: "Mozzarella", price: EXTRA_PRICE },
  { id: "x-panceta", name: "Panceta", price: EXTRA_PRICE },
];

export const menuData: MenuCategory[] = [
  {
    id: "hamburguesas",
    category: "Hamburguesas",
    items: [
      { id: "h1", name: "Kids", description: "Pan, carne, queso mozzarella, lechuga y tomate", price: 12000, image: "/images/hamburguesa%20kids.jpeg", allowsExtras: true },
      { id: "h2", name: "Completa", description: "Pan, carne, huevo, queso mozzarella, lechuga y tomate", price: 16000, image: "/images/hamburguesa%20completa.jpeg", allowsExtras: true },
      { id: "h3", name: "Clásica", description: "Pan, carne casera, huevo, queso cheddar, lechuga y tomate", price: 18000, image: "/images/hamburguesa%20cacera.jpeg", allowsExtras: true },
      { id: "h4", name: "Doble", description: "Pan, doble carne, huevo, queso mozzarella, lechuga y tomate", price: 24000, image: "/images/hamburguesa%20completa.jpeg", allowsExtras: true },
      { id: "h5", name: "Gourmet", description: "Pan, carne casera 90 gr, huevo, queso mozzarella, queso cheddar, cebolla caramelizada, lechuga y tomate", price: 22000, image: "/images/hamburguesa%20cacera.jpeg", allowsExtras: true }
    ]
  },
  {
    id: "lomitos-arabes",
    category: "Lomitos Árabes",
    items: [
      { id: "a1", name: "Mixto", description: "Pan árabe, repollo picado, tomate, carne, pollo, salsa de choclo", price: 23000, image: "/images/lomitos.jpeg", allowsExtras: true },
      { id: "a2", name: "Pollo", description: "Pan árabe, repollo picado, tomate, carne, pollo, salsa de choclo", price: 23000, image: "/images/lomitos.jpeg", allowsExtras: true },
      { id: "a3", name: "Completo", description: "Pan árabe, repollo picado, tomate, carne, pollo, salsa de choclo, queso cheddar", price: 26000, image: "/images/lomitos.jpeg", allowsExtras: true },
      { id: "a4", name: "Willi's", description: "Pan árabe, repollo picado, tomate, carne, pollo, salsa de choclo, queso cheddar, queso catupyry, cebolla caramelizada", price: 29000, image: "/images/lomitos.jpeg", allowsExtras: true },
      { id: "a5", name: "De Carne Normal", description: "Pan árabe, repollo picado, tomate, carne 90 gr, salsa de choclo", price: 28000, image: "/images/lomitos.jpeg", allowsExtras: true },
      { id: "a6", name: "De Carne Completo", description: "Pan árabe, repollo picado, tomate, carne 90 gr, salsa de choclo, queso cheddar", price: 30000, image: "/images/lomitos.jpeg", allowsExtras: true },
      { id: "a7", name: "De Carne Willi's Plus", description: "Pan árabe, repollo picado, tomate, carne, pollo, salsa de choclo, queso cheddar, queso catupyry, cebolla caramelizada", price: 33000, image: "/images/lomitos.jpeg", allowsExtras: true }
    ]
  },
  {
    id: "pizzas",
    category: "Pizzas",
    items: [
      { id: "z1", name: "Pizza Mozzarella", description: "Salsa, queso mozzarella, orégano, aceituna", price: 25000, image: "/images/pizza-mozzarella.jpg", kind: "pizza" },
      { id: "z2", name: "Pizza Pepperoni", description: "Salsa, queso mozzarella, pepperoni, orégano, aceituna", price: 30000, image: "/images/pizza-pepperoni.jpg", kind: "pizza" },
      { id: "z3", name: "Pizza Napolitana", description: "Salsa, jamón, queso mozzarella, tomate en rodajas, orégano, aceituna", price: 35000, image: "/images/pizza-napolitana.jpg", kind: "pizza" },
      { id: "z4", name: "Pizza Choclo y Katupiry", description: "Salsa, queso mozzarella, queso katupiry, choclo, orégano", price: 40000, image: "/images/pizza-choclo-katupiry.jpg", kind: "pizza" },
      { id: "z5", name: "Pizza Pollo y Katupiry", description: "Salsa, queso mozzarella, queso katupiry, pollo, orégano", price: 45000, image: "/images/pizza-pollo-katupiry.jpg", kind: "pizza" }
    ]
  },
  {
    id: "papas",
    category: "Papas",
    items: [
      { id: "p1", name: "Papas pequeñas", description: "", price: 7000, image: "/images/papas%20chicas.jpeg" },
      { id: "p2", name: "Papas grandes", description: "", price: 12000, image: "/images/papas%20grandes.jpeg" },
      { id: "p3", name: "Papas con agregado de cheddar", description: "", price: 17000, image: "/images/papas-cheddar.jpg" },
      { id: "p4", name: "Papas con agregado de catupiry", description: "", price: 17000, image: "" },
      { id: "p5", name: "Papas con agregado de catupiry y cheddar", description: "", price: 22000, image: "" }
    ]
  },
  {
    id: "otras-opciones",
    category: "Otras Opciones",
    items: [
      { id: "o1", name: "Chivito Normal", description: "Doble carne de lomito, doble huevo, queso mozzarella, lechuga, tomate, repollo, salsa de la casa", price: 36000, image: "/images/chivito-normal.jpg", allowsExtras: true },
      { id: "o2", name: "Chivito Plus", description: "Triple carne de lomito, triple huevo, queso mozzarella, cebolla caramelizada, toque de cheddar, lechuga, tomate, repollo, salsa de la casa, agregado de papas", price: 70000, image: "/images/chivitoplus.jpeg", allowsExtras: true },
      { id: "o3", name: "Sandwich de Lomito", description: "Pan de lomito, lomito 90 gr, tomate, lechuga, huevo, queso mozzarella, salsa de choclo", price: 19000, image: "/images/sandwich%20de%20lomito.jpeg", allowsExtras: true },
      { id: "o4", name: "Sandwich de Lomito Plus", description: "Pan pirata, carne de lomito, tomate, lechuga, repollo, doble huevo, queso mozzarella, cebolla caramelizada, salsa de choclo", price: 23000, image: "/images/sandwich%20de%20lomito.jpeg", allowsExtras: true },
      { id: "o5", name: "Lomipizza", description: "Pan, tapa de pizza, carne de lomito, tomate, lechuga, repollo, 4 huevo, queso mozzarella, cebolla caramelizada, aceituna, panceta, salsa de choclo", price: 55000, image: "", allowsExtras: true },
      { id: "o6", name: "Hamburpizza", description: "Pan, tapa de pizza, carne de hamburguesa, tomate, lechuga, repollo, 4 huevo, queso mozzarella, queso cheddar, cebolla caramelizada, aceituna, panceta, salsa de choclo", price: 55000, image: "/images/hamburpizza.jpg", allowsExtras: true },
      { id: "o7", name: "Lomifit", description: "Pan árabe tostado, lomito, mozzarella, lechuga, tomate, sin salsa", price: 21000, image: "/images/lomifit.jpeg", allowsExtras: true },
      { id: "o8", name: "Churrasquito", description: "", price: 9000, image: "/images/churrasquito.jpeg", allowsExtras: true },
      { id: "o9", name: "Super Pancho", description: "", price: 12000, image: "/images/super-pancho.jpg", allowsExtras: true }
    ]
  },
  {
    id: "combo-kids",
    category: "Combo Kids",
    items: [
      { id: "k1", name: "Combo Kids", description: "Hamburguesa Kids con agregado de huevo + papas pequeñas + Coca Cola 250 ml", price: 23000, image: "/images/hamburguesa%20kids.jpeg" }
    ]
  },
  {
    id: "salsas",
    category: "Salsas",
    items: [
      { id: "s1", name: "Salsa", description: "1 pote Gs. 2.000 · 2 potes Gs. 3.000 · 3 potes Gs. 5.000", price: 2000, image: "" }
    ]
  },
  {
    id: "bebidas",
    category: "Bebidas",
    items: [
      { id: "b1", name: "Coca Cola / Fanta / Sprite 1L", description: "1 litro", price: 11000, image: "/images/coca%20cola%201L.jpeg" },
      { id: "b2", name: "Coca Cola 500 ml", description: "", price: 7000, image: "/images/coca%20cola%20500ml.jpeg" },
      { id: "b3", name: "Coca Cola 250 ml", description: "", price: 5000, image: "" },
      { id: "b4", name: "Pulp 500 ml", description: "", price: 7000, image: "" }
    ]
  },
  {
    id: "cervezas",
    category: "Cervezas",
    items: [
      { id: "ce1", name: "Skol", description: "", price: 6000, image: "" },
      { id: "ce2", name: "Bud 66 310 ml", description: "", price: 7000, image: "" },
      { id: "ce3", name: "Ouro Fino", description: "", price: 5000, image: "" },
      { id: "ce4", name: "Múnich Ultra", description: "", price: 5000, image: "" },
      { id: "ce5", name: "Pilsen 355 ml", description: "", price: 6000, image: "" },
      { id: "ce6", name: "Michelob Ultra", description: "", price: 6000, image: "/images/cerveza-michelob-ultra.jpg" },
      { id: "ce7", name: "Polar Ice", description: "", price: 5000, image: "" }
    ]
  },
];
