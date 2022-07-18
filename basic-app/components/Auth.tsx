import { useRouter } from "next/router";
import { Session } from "next-auth";
import React, { createContext, useEffect } from "react";

import { LoginSkeleton } from "./LoginSkeleton";
import { useUser } from "../hooks/useUser";
import { useSession } from "next-auth/react";
import { AppUser } from "../generated/graphql";

export interface IAuthContext {
  session: Session | null;
  user: AppUser;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function Auth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [{ data, fetching, error }] = useUser();
  const user = data?.appUser;

  useEffect(() => {
    if (fetching) {
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
  }, [error, fetching, router, user]);

  if (!user) {
    return <LoginSkeleton />;
  }

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
}
