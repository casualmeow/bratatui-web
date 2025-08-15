import Image from "next/image";
import Logo from "assets/logo.svg";

export function LogoSection() {
  return (
    <div className="flex items-center space-x-4">
      <Logo className="w-10 h-10 fill-white rounded-full" />
      <span className="text-xl font-bold">Bratatui</span>
    </div>
  );
}
