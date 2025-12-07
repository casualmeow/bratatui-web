"use client";

import { Button } from "@/shared/ui";
import { unauthorized } from "next/navigation";
export default function LoginPage() {
  const handleLogin = () => {
    console.log("test");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold">Login</h1>
        <form className="flex flex-col gap-4 mt-8">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
          <div>
            Don`t have password? <a href="/sign-up">Sign up</a>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="mt-4 flex flex-row w-8/10 bg-[#18CCFC]/70 h-10 hover:bg-[#18CCFC]/90 items-center justify-center rounded-md px-4 text-accent font-medium shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
