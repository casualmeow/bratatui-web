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
      <div className="">{children}</div>
    </header>
  );
}
