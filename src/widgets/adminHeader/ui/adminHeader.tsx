import * as React from "react";
import Link from "next/link";
import { HeaderLayout } from "@/shared/layouts";
import { NavItem } from "./navItem";
import Logo from "assets/logo.svg";

export function AdminHeader() {
  return (
    <HeaderLayout>
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <NavItem as={Link} href="/">
          Admin Panel
        </NavItem>
        <nav className="flex space-x-4">
          <NavItem as={Link} href="/kanban">
            Kanban
          </NavItem>
          <NavItem as={Link} href="/users">
            Users
          </NavItem>
          <NavItem as={Link} href="/login">
            Login
          </NavItem>
        </nav>
      </div>
    </HeaderLayout>
  );
}
