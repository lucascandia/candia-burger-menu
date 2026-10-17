// Correr con: node --test lib/pricing.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildHalfPizza,
  extrasKey,
  getItemLineTotal,
  getSalsaAjoLineTotal,
} from "./pricing.ts";
import type { CartItem, MenuItem } from "./types.ts";

const pizza = (id: string, name: string, price: number): MenuItem => ({
  id,
  name,
  description: "",
  price,
  image: "",
  kind: "pizza",
});

const cartItem = (over: Partial<CartItem>): CartItem => ({
  cartItemId: "c1",
  id: "h1",
  name: "Kids",
  description: "",
  price: 12000,
  image: "",
  quantity: 1,
  ...over,
});

test("mitad y mitad cobra el sabor más caro", () => {
  const half = buildHalfPizza(
    pizza("z2", "Pizza Pepperoni", 30000),
    pizza("z5", "Pizza Pollo y Katupiry", 45000)
  );
  assert.equal(half.price, 45000);
});

test("mitad y mitad no depende del orden", () => {
  const a = pizza("z1", "Pizza Mozzarella", 25000);
  const b = pizza("z3", "Pizza Napolitana", 35000);
  assert.equal(buildHalfPizza(a, b).id, buildHalfPizza(b, a).id);
  assert.equal(buildHalfPizza(a, b).name, buildHalfPizza(b, a).name);
});

test("mitad y mitad del mismo sabor devuelve la pizza entera", () => {
  const a = pizza("z1", "Pizza Mozzarella", 25000);
  assert.equal(buildHalfPizza(a, a), a);
});

test("agregados suman 4.000 c/u por unidad", () => {
  const extras = [
    { id: "x-huevo", name: "Huevo", price: 4000 },
    { id: "x-panceta", name: "Panceta", price: 4000 },
  ];
  assert.equal(getItemLineTotal(cartItem({ extras, quantity: 2 })), (12000 + 8000) * 2);
});

test("extrasKey ignora el orden", () => {
  const a = { id: "a", name: "A", price: 1 };
  const b = { id: "b", name: "B", price: 1 };
  assert.equal(extrasKey([a, b]), extrasKey([b, a]));
  assert.equal(extrasKey(undefined), "");
});

test("salsas: 1, 2 y 3 potes", () => {
  assert.deepEqual([1, 2, 3].map(getSalsaAjoLineTotal), [2000, 3000, 5000]);
  assert.equal(getItemLineTotal(cartItem({ id: "s1", quantity: 2 })), 3000);
});
