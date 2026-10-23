"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { accountsEnabled, accountsError, supabase } from "./sync";

/** The signed-in session (null when signed out), kept up to date. */
export function useAccount() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sb = supabase();
    if (!sb) {
      setError(accountsError());
      setReady(true);
      return;
    }
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = sb.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  return { enabled: accountsEnabled() && !error, session, ready, error };
}
