import { GlassSurface } from "@/shared/ui/GlassSurface";
import Image from "next/image";
import { LogoSection } from "./logoSection";

const headerItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const Header = () => {
  return (
    <header role="banner" className="flex flex-row justify-center">
      <GlassSurface
        className="flex justify-around p-4 items-center"
        borderRadius={25}
        width='90%'
        height={60}
      >
        <LogoSection />
        <nav className="flex space-x-4">
          {headerItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
      </GlassSurface>
    </header>
  );
};
