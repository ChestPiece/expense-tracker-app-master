import type { Viewport } from "next";
import { Navbar } from "@/components/navbar";
import { LoginForm } from "./LoginForm";
import { Suspense } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Suspense fallback={<div>Loading form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
