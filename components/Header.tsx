"use client";

import { CategoryTabs } from "./CategoryTabs";

interface Category {
  id: string;
  category: string;
}

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
      <div className="mx-auto max-w-lg px-4 py-3">
        <h1 className="mb-3 text-center text-xl font-bold tracking-tight text-white">
          Candia Burger
        </h1>
        <CategoryTabs categories={categories} />
      </div>
    </header>
  );
}
