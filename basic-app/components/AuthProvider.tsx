import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import * as fcl from "@onflow/fcl";
import { LoginSkeleton } from "./LoginSkeleton";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { Session } from "next-auth";

type AuthComponentProps = {
  children: React.ReactNode;
  requireAuth: boolean | undefined;
};

type AuthContextType = {
  session: Session;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(null);

export function AuthProvider({ children, requireAuth }: AuthComponentProps) {
  const router = useRouter();

  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";

  const [isSigningOut, setIsSigningOut] = useState(false);
  const isLoading = sessionLoading || isSigningOut;

  const signOut = useCallback(async () => {
    setIsSigningOut(true);
    fcl.unauthenticate();
    const { url } = await nextAuthSignOut({ redirect: false });
    await router.push(url);
    setIsSigningOut(false);
  }, [router]);

  useEffect(() => {
    if (!requireAuth || isLoading) {
      return;
    }

    if (session?.error) {
      console.error(session.error);
      signOut();
      return;
    }

    if (!session) {
      router.push("/");
      return;
    }
  }, [requireAuth, session, router, isLoading, signOut]);

  return (
    <AuthContext.Provider value={{ session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
