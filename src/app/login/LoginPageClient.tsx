"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { LoginForm } from "./LoginForm";
import { Suspense } from "react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export function LoginPageClient() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Suspense fallback={<div>Loading form...</div>}>
        {showForgotPassword ? (
          <ForgotPasswordForm onCancel={() => setShowForgotPassword(false)} />
        ) : (
          <LoginForm
            onForgotPasswordClick={() => setShowForgotPassword(true)}
          />
        )}
      </Suspense>
    </div>
  );
}
