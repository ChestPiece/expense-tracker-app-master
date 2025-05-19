"use client";

import { useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

interface UseSocialAuthResult {
  googleLoading: boolean;
  githubLoading: boolean;
  handleSocialLogin: (provider: "google" | "github") => Promise<void>;
}

export function useSocialAuth(
  supabase: SupabaseClient,
  setError: (error: string | null) => void
): UseSocialAuthResult {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const handleSocialLogin = async (provider: "google" | "github") => {
    if (provider === "google") {
      setGoogleLoading(true);
    } else {
      setGithubLoading(true);
    }
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      if (provider === "google") {
        setGoogleLoading(false);
      } else {
        setGithubLoading(false);
      }
    }
  };

  return {
    googleLoading,
    githubLoading,
    handleSocialLogin,
  };
}
