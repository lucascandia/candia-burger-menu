"use client";

import { useState, useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { CartFAB } from "./CartFAB";
import { CheckoutModal } from "./CheckoutModal";
import type { MenuItem } from "@/lib/types";

interface MenuCategory {
  id: string;
  category: string;
  items: MenuItem[];
}

interface MenuAndCartProps {
  menuData: MenuCategory[];
}

const DELIVERY_PHONE = "0983 009 309";
const SCROLL_SPY_IGNORE_MS = 900;

export function MenuAndCart({ menuData }: MenuAndCartProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
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
                  <ProductCard item={item} categoryId={section.id} />
                </li>
              ))}
            </ul>
          </section>
        ))}
        <footer className="flex items-center justify-center gap-2 py-6 text-sm text-zinc-400">
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          <span>
            Delivery Disponible:{" "}
            <a href={`tel:${DELIVERY_PHONE.replace(/\s/g, "")}`} className="text-orange-500 hover:underline">
              {DELIVERY_PHONE}
            </a>
          </span>
        </footer>
      </main>
      <CartFAB onOpenCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
