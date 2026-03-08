"use client";

import { useState } from "react";
import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { CartFAB } from "./CartFAB";
import { CheckoutModal } from "./CheckoutModal";

interface MenuCategory {
  id: string;
  category: string;
  items: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
  }>;
}

interface MenuAndCartProps {
  menuData: MenuCategory[];
}

export function MenuAndCart({ menuData }: MenuAndCartProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const categories = menuData.map(({ id, category }) => ({ id, category }));

  return (
    <>
      <Header categories={categories} />
      <main className="mx-auto max-w-lg px-4 pb-28 pt-4">
        {menuData.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 pb-8"
          >
            <h2 className="mb-4 text-lg font-bold uppercase tracking-wide text-orange-500">
              {section.category}
            </h2>
            <ul className="flex flex-col gap-3">
              {section.items.map((item) => (
                <li key={item.id}>
                  <ProductCard item={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <CartFAB onOpenCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
