"use client";

import { useScroll } from "@/shared/hooks/useScroll";
import { Children } from "react";

interface HeaderLayoutProps {
  children: React.ReactNode;
}

export function HeaderLayout({ children }: HeaderLayoutProps) {
  const { isScrolled, scrollDirection } = useScroll({ threshold: 50 });
  return (
    <header role="banner" className="flex flex-row justify-center">
      <div className="fixed top-4 w-9/10 border shadow-lg bg-zinc-700/80 backdrop-blur-xl">
        {children}
      </div>
    </header>
  );
}
