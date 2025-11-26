import Logo from "assets/logo.svg";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const LogoVariants = cva("w-8 h-8", {
  variants: {
    variant: {
      default: "w-8 h-8",
      small: "w-6 h-6",
      large: "w-10 h-10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type LogoProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof LogoVariants>;

export default function logo({ variant, ...props }: LogoProps) {
  return <Logo className={cn(LogoVariants({ variant }))} {...props} />;
}
