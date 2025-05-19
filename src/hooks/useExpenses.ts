"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface Expense {
  id: string;
  title: string;
  amount: number;
  created_at: string;
  category_id?: string;
}

interface UseExpensesResult {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  fetchExpenses: () => Promise<void>; // Expose fetchExpenses to allow re-fetching
}

export function useExpenses(userId: string | null): UseExpensesResult {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchExpenses = useCallback(async () => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      setExpenses([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setExpenses(data || []);
    } catch (err) {
      setError("Failed to load expenses");
      console.error("Error loading expenses:", err);
      console.error("Full error object:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, supabase, setLoading, setExpenses, setError]);

  useEffect(() => {
    fetchExpenses();
  }, [userId, supabase, fetchExpenses]);

  return {
    expenses,
    loading,
    error,
    fetchExpenses, // Return fetchExpenses to allow manual re-fetching if needed
  };
}
