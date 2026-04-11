"use client";

import { useEffect, useRef } from "react";

interface Category {
  id: string;
  category: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategoryId: string | null;
  onTabClick?: (id: string) => void;
}

export function CategoryTabs({ categories, activeCategoryId, onTabClick }: CategoryTabsProps) {
  const prevActiveRef = useRef<string | null>(activeCategoryId);

  useEffect(() => {
    if (activeCategoryId == null) {
      prevActiveRef.current = null;
      return;
    }
    if (prevActiveRef.current === activeCategoryId) return;
    prevActiveRef.current = activeCategoryId;
    document.getElementById(`category-tab-${activeCategoryId}`)?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeCategoryId]);
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleClick = (id: string) => {
    onTabClick?.(id);
    scrollToSection(id);
  };

  return (
    <nav
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700"
      aria-label="Categorías del menú"
    >
      {categories.map(({ id, category }) => {
        const isActive = id === activeCategoryId;
        return (
          <button
            id={`category-tab-${id}`}
            key={id}
            type="button"
            onClick={() => handleClick(id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-950 ${
              isActive
                ? "bg-gradient-to-r from-orange-600 to-red-600 text-white"
                : "border border-orange-500/50 bg-zinc-900 text-white hover:border-orange-500 hover:bg-orange-500/10"
            }`}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
}
