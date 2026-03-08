"use client";

interface Category {
  id: string;
  category: string;
}

interface CategoryTabsProps {
  categories: Category[];
}

export function CategoryTabs({ categories }: CategoryTabsProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700"
      aria-label="Categorías del menú"
    >
      {categories.map(({ id, category }) => (
        <button
          key={id}
          type="button"
          onClick={() => scrollToSection(id)}
          className="shrink-0 rounded-full border border-orange-500/50 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-orange-500 hover:bg-orange-500/10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
        >
          {category}
        </button>
      ))}
    </nav>
  );
}
