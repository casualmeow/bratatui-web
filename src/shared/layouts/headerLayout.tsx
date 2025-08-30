"use client";

import { useScroll } from "@/shared/hooks/useScroll";

interface HeaderLayoutProps {
  children: React.ReactNode;
}

export function HeaderLayout({ children }: HeaderLayoutProps) {
  const { isScrolled, scrollDirection } = useScroll({ threshold: 50 });
  return (
    <header role="banner" className="flex flex-row justify-center">
      <div className="fixed top-4 w-9/10 rounded-xl shadow-lg border border-zinc-900/8 backdrop-blur-xl min-h-10">
        {children}
      </div>
    </header>
  );
}
