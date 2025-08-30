import * as React from "react";
import Link from "next/link";
import { HeaderLayout } from "@/shared/layouts";
import { NavItem } from "./navItem";
import Logo from "@/shared/ui/logo";

type HeaderLink = {
  href: string;
  label: string;
};

const headerLinks: HeaderLink[] = [
  { href: "/kanban", label: "Kanban" },
  { href: "/users", label: "Users" },
  { href: "/login", label: "Login" },
];

export function AdminHeader() {
  return (
    <HeaderLayout>
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <NavItem as={Link} variant="logo" href="/">
          <Logo />
          <span className="text-xl font-bold">Bratatui</span>
        </NavItem>

        <nav className="flex space-x-4">
          {headerLinks.map((link) => (
            <NavItem key={link.href} as={Link} href={link.href}>
              {link.label}
            </NavItem>
          ))}
        </nav>
      </div>
    </HeaderLayout>
  );
}

