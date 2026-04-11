"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

/** Y position in the viewport used as the "reading line" for category detection (px from top). */
function readingLineY(headerEl: HTMLElement | null): number {
  if (headerEl) {
    return headerEl.getBoundingClientRect().bottom;
  }
  return 120;
}

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
  const headerRef = useRef<HTMLElement | null>(null);
  const categories = menuData.map(({ id, category }) => ({ id, category }));

  const lastTabClickAtRef = useRef<number>(0);

  const updateActiveFromScroll = useCallback(() => {
    if (Date.now() - lastTabClickAtRef.current < SCROLL_SPY_IGNORE_MS) {
      return;
    }
    const lineY = readingLineY(headerRef.current);
    const lastSection = menuData[menuData.length - 1];
    const lastEl = lastSection ? sectionRefs.current[lastSection.id] : null;
    if (lastEl) {
      const lastRect = lastEl.getBoundingClientRect();
      if (lineY >= lastRect.bottom) {
        setActiveCategoryId((prev) => (prev === null ? prev : null));
        return;
      }
    }

    let contained: string | null = null;
    let lastTopPassed: string | null = null;
    for (const section of menuData) {
      const el = sectionRefs.current[section.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (lineY >= r.top && lineY < r.bottom) {
        contained = section.id;
        break;
      }
      if (r.top <= lineY) {
        lastTopPassed = section.id;
      }
    }

    const next = contained ?? lastTopPassed ?? menuData[0]?.id ?? null;
    setActiveCategoryId((prev) => (prev === next ? prev : next));
  }, [menuData]);

  useEffect(() => {
    updateActiveFromScroll();
    const onScrollOrResize = () => {
      requestAnimationFrame(updateActiveFromScroll);
    };
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [updateActiveFromScroll]);

  return (
    <>
      <Header
        ref={headerRef}
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
