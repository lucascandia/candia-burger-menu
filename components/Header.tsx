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
      className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80"
    >
      <div className="mx-auto max-w-lg px-4 pt-3 pb-0">
        <div className="mb-2 flex flex-col items-center gap-1">
          {logoError ? (
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-800 text-3xl"
              aria-hidden
            >
              🍔
            </div>
          ) : (
            <Image
              src="/images/logo.jpeg"
              alt="Candia Burger"
              width={56}
              height={56}
              className="logo-pulse h-14 w-14 rounded-xl object-contain"
              onError={() => setLogoError(true)}
              sizes="56px"
            />
          )}
          <span className="font-display text-2xl tracking-widest text-white leading-none">
            CANDIA BURGER
          </span>
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
