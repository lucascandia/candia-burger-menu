// Correr con: node --test lib/*.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { EXTRA_PRICE, extras, menuData } from "../data/menu.ts";

const items = menuData.flatMap((c) => c.items);

test("cada foto del menú existe en public/", () => {
  const missing = items
    .filter((i) => i.image !== "")
    .filter((i) => !existsSync(join("public", decodeURIComponent(i.image))))
    .map((i) => `${i.id}: ${i.image}`);
  assert.deepEqual(missing, []);
});

test("los ids de productos y categorías no se repiten", () => {
  const ids = [...menuData.map((c) => c.id), ...items.map((i) => i.id)];
  assert.equal(new Set(ids).size, ids.length);
});

test("todos los precios son enteros positivos", () => {
  const bad = items.filter((i) => !Number.isInteger(i.price) || i.price <= 0);
  assert.deepEqual(bad.map((i) => i.id), []);
});

test("las pizzas viven solo en la categoría pizzas y todas lo son", () => {
  const pizzas = menuData.find((c) => c.id === "pizzas");
  assert.ok(pizzas);
  assert.ok(pizzas.items.length > 0 && pizzas.items.every((i) => i.kind === "pizza"));
  const strays = items.filter((i) => i.kind === "pizza" && !pizzas.items.includes(i));
  assert.deepEqual(strays, []);
});

test("los agregados cuestan Gs. 4.000 cada uno", () => {
  assert.equal(EXTRA_PRICE, 4000);
  assert.ok(extras.length > 0 && extras.every((e) => e.price === 4000));
});
