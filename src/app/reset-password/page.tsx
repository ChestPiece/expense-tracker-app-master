"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // You might need to handle the access token from the URL here
  // Supabase typically handles this within the updateUser method if called on the correct page

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Supabase's updateUser will use the context from the reset password URL
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setMessage(
        "Your password has been reset successfully. You can now log in with your new password."
      );
      // Redirect to login page after a delay or on button click
      // router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="pixel-text text-2xl sm:text-3xl font-bold text-[#ff4500] mb-2">
            Reset Password
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Enter your new password
          </p>
          {message && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-500 text-sm">{message}</p>
              {/* Optional: Add a button to redirect to login */}
              {!loading && (
                <Button
                  variant="outline"
                  className="cyber-button pixel-text mt-4"
                  onClick={() => router.push("/login")}
                >
                  Go to Login
                </Button>
              )}
            </div>
          )}
          {error && (
            <div className="pixel-text text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg">
              {error}
            </div>
          )}
        </div>
        {!message && (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="pixel-text text-sm text-gray-400 block mb-1"
              >
                New Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cyber-input pixel-text w-full px-4 py-2 rounded-lg"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="pixel-text text-sm text-gray-400 block mb-1"
              >
                Confirm New Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <span>Resetting Password...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
