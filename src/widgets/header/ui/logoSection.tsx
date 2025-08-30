import Logo from "@/shared/ui/logo";

export function LogoSection() {
  return (
    <div className="flex items-center space-x-4">
      <Logo />
      <span className="text-xl font-bold">Bratatui</span>
    </div>
  );
}
