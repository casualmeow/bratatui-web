import { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const NavItemVariants = cva(
  "max-h-10",
  {
    variants: {
      variant: {
        logo: "flex items-center space-x-2",
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type NavItemProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T> & VariantProps<typeof NavItemVariants>;

export function NavItem<T extends ElementType = "a">({
  as,
  children,
  variant,
  ...props
}: NavItemProps<T>) {
  const Component = as || "a";
  return <Component className={cn(NavItemVariants({ variant }))} {...props}>{children}</Component>;
}
