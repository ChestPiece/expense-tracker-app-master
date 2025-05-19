"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/loading-spinner";

interface ForgotPasswordFormProps {
  onCancel: () => void;
}

export function ForgotPasswordForm({ onCancel }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage("Password reset link sent to your email.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="pixel-text text-2xl sm:text-3xl font-bold text-[#ff4500] mb-2">
          Forgot Password
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Enter your email to receive a password reset link
        </p>
        {message && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-500 text-sm">{message}</p>
          </div>
        )}
        {error && (
          <div className="pixel-text text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg">
            {error}
          </div>
        )}
      </div>
      <div className="mt-8 space-y-6">
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="pixel-text text-sm text-gray-400 block mb-1"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cyber-input pixel-text w-full px-4 py-2 rounded-lg"
              required
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="cyber-button pixel-text w-full py-2 text-sm sm:text-base relative"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner className="w-5 h-5" />
                <span>Sending Link...</span>
              </div>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
        <div className="text-center">
          <Button
            variant="link"
            className="pixel-text text-[#ff4500] hover:underline px-0"
            onClick={onCancel}
            disabled={loading}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
