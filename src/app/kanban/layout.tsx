import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../../src/app/globals.css";
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
  title: "Bratatui - Kanban",
  description: "Kanban for admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg[] min-h-screen bg-background`}
      >
        <div className="flex container mx-auto justify-center flex-col">
          <AdminHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
