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
      className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800"
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
            className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 focus:ring-offset-zinc-950 ${
              isActive
                ? "bg-orange-600 border border-orange-600 text-white"
                : "border border-zinc-700 bg-transparent text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
            }`}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
}
