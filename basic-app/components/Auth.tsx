import { useRouter } from "next/router";
import { Session } from "next-auth";
import React, { createContext, useEffect, useContext } from "react";

import { LoginSkeleton } from "./LoginSkeleton";
import { useUser } from "../hooks/useUser";
import { NexusGenRootTypes } from "../lib/api-types";
import { signOut } from "next-auth/react";

export interface IAuthContext {
  session: Session | null;
  user: NexusGenRootTypes["AppUser"];
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function Auth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, session, loading, error } = useUser();

  useEffect(() => {
    if (loading) {
      // still loading, do nothing
      return;
    }

    if (error) {
      // redirect to error page
      router.push("/error");
      return;
    }

    if (!user) {
      // user isn't signed in or wasn't found, redirect to login
      router.push("/");
      return;
    }
  }, [error, loading, router, user]);

  if (!user) {
    return <LoginSkeleton />;
  }

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
}
