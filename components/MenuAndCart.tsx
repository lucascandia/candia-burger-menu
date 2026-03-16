"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ProductCard } from "./ProductCard";
import { CartFAB } from "./CartFAB";
import { CheckoutModal } from "./CheckoutModal";
import { AddToCartModal } from "./AddToCartModal";
import type { MenuItem, CartItem } from "@/lib/types";

interface MenuCategory {
  id: string;
  category: string;
  items: MenuItem[];
}

interface MenuAndCartProps {
  menuData: MenuCategory[];
}

const SCROLL_SPY_IGNORE_MS = 900;

function cartItemToMenuItem(item: CartItem): MenuItem {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
  };
}

export function MenuAndCart({ menuData }: MenuAndCartProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [addToCartProduct, setAddToCartProduct] = useState<MenuItem | null>(null);
  const [addToCartEditItem, setAddToCartEditItem] = useState<CartItem | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(menuData[0]?.id ?? null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const categories = menuData.map(({ id, category }) => ({ id, category }));

  const sectionRatiosRef = useRef<Record<string, number>>({});
  const lastTabClickAtRef = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() - lastTabClickAtRef.current < SCROLL_SPY_IGNORE_MS) {
          return;
        }
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.sectionId;
          if (id != null) {
            sectionRatiosRef.current[id] = entry.intersectionRatio;
          }
        });
        const ratios = sectionRatiosRef.current;
        const withRatio = menuData
          .map((s) => ({ id: s.id, ratio: ratios[s.id] ?? 0 }))
          .filter((x) => x.ratio > 0.05)
          .sort((a, b) => b.ratio - a.ratio);
        const activeId = withRatio[0]?.id ?? null;
        setActiveCategoryId((prev) => (activeId !== null ? activeId : prev));
      },
      {
        rootMargin: "-100px 0px -50% 0px",
        threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    const timer = requestAnimationFrame(() => {
      menuData.forEach((section) => {
        const el = sectionRefs.current[section.id];
        if (el) observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(timer);
      observer.disconnect();
    };
  }, [menuData]);

  return (
    <>
      <Header
        categories={categories}
        activeCategoryId={activeCategoryId}
        onTabClick={(id) => {
          lastTabClickAtRef.current = Date.now();
          setActiveCategoryId(id);
        }}
      />
      <main className="mx-auto max-w-lg px-4 pb-28 pt-4">
        {menuData.map((section) => (
          <section
            key={section.id}
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
            data-section-id={section.id}
            id={section.id}
            className="scroll-mt-24 pb-8"
          >
            <h2 className="mb-4 text-lg font-bold uppercase tracking-wide text-orange-500">
              {section.category}
            </h2>
            <ul className="flex flex-col gap-3">
              {section.items.map((item) => (
                <li key={item.id}>
                  <ProductCard
                    item={item}
                    categoryId={section.id}
                    onAddClick={(product) => {
                    setAddToCartProduct(product);
                    setAddToCartEditItem(null);
                  }}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
        <Footer />
      </main>
      <CartFAB onOpenCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onEditItem={(item) => {
          setAddToCartProduct(cartItemToMenuItem(item));
          setAddToCartEditItem(item);
        }}
      />
      <AddToCartModal
        product={addToCartProduct}
        editItem={addToCartEditItem}
        onClose={() => {
          setAddToCartProduct(null);
          setAddToCartEditItem(null);
        }}
      />
    </>
  );
}
