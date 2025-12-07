"use client";

import { useState } from "react";
import { Button } from "@/shared/ui";

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("Signup result:", data);

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      // success
      alert("Account created!");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="flex flex-col items-center justify-center min-h-screen"
        onSubmit={handleSubmit}
      >
        <h1>Sign Up</h1>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="secondary"
          className="mt-4 flex flex-row w-8/10 bg-[#18CCFC]/70 h-10 hover:bg-[#18CCFC]/90 items-center justify-center rounded-md px-4 text-accent font-medium shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
