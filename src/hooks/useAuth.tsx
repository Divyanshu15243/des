import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdmin = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("user_roles" as any)
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    } catch {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await checkAdmin(session.user.id);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkAdmin(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    const attemptSignIn = () =>
      supabase.auth.signInWithPassword({ email: normalizedEmail, password });

    // Try up to 3 times with delays for network timeouts
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const { error } = await attemptSignIn();
        if (!error) return { error: null };

        const msg = error.message?.toLowerCase() ?? "";
        const isNetwork =
          msg.includes("failed to fetch") ||
          msg.includes("network") ||
          msg.includes("timed out") ||
          msg.includes("timeout");

        if (!isNetwork) return { error: error as Error };

        // Wait before retry (1s, 2s)
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, (attempt + 1) * 1000));
        } else {
          return { error: error as Error };
        }
      } catch (e: any) {
        if (attempt === 2) return { error: e as Error };
        await new Promise((r) => setTimeout(r, (attempt + 1) * 1000));
      }
    }

    return { error: new Error("Sign-in failed after multiple attempts") };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}