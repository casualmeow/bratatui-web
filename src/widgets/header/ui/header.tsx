import { HeaderLayout } from "@/shared/layouts";
import { LogoSection } from "./logoSection";
import { SearchPanel } from "./searchPanel";

const headerItems = [
  {
    label: "Install",
    href: "/installation",
  },
  {
    label: "Support Us",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const Header = () => {
  return (
    <HeaderLayout>
      <header role="banner" className="flex flex-row justify-center">
        <div className="flex items-center w-full justify-around">
          <LogoSection />
          <nav className="flex space-x-4">
            {headerItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:underline">
                {item.label}
              </a>
            ))}
          </nav>
          {/* <SearchPanel /> */}
        </div>
      </header>
    </HeaderLayout>
  );
};
