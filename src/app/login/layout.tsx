import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AdminHeader } from "@/widgets/adminHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bratatui - Login",
  description: "Bratatui Admin Login page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
    >
      <AdminHeader />
      {children}
    </div>
  );
}
