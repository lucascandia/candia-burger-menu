"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import { CategoryTabs } from "./CategoryTabs";

interface Category {
  id: string;
  category: string;
}

interface HeaderProps {
  categories: Category[];
  activeCategoryId: string | null;
  onTabClick?: (id: string) => void;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { categories, activeCategoryId, onTabClick },
  ref
) {
  const [logoError, setLogoError] = useState(false);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80"
    >
      <div className="mx-auto max-w-lg px-4 py-3">
        <div className="mb-3 flex justify-center">
          {logoError ? (
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800 text-5xl"
              aria-hidden
            >
              🍔
            </div>
          ) : (
            <Image
              src="/images/logo.jpeg"
              alt="Candia Burger"
              width={96}
              height={96}
              className="h-24 w-24 rounded-2xl object-contain"
              onError={() => setLogoError(true)}
              sizes="96px"
            />
          )}
        </div>
        <CategoryTabs
          categories={categories}
          activeCategoryId={activeCategoryId}
          onTabClick={onTabClick}
        />
      </div>
    </header>
  );
});
