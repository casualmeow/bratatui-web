"use client";

import { useState, useEffect } from "react";

interface UseScrollOptions {
  threshold?: number;
}

export function useScroll({ threshold = 50 }: UseScrollOptions = {}) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { scrollY, isScrolled, scrollDirection };
}
