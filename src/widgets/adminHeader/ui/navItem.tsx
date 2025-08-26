import { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

type NavItemProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function NavItem<T extends ElementType = "a">({
  as,
  children,
  ...props
}: NavItemProps<T>) {
  const Component = as || "a";
  return <Component className="font-bold" {...props}>{children}</Component>;
}
