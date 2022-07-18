import { useRouter } from "next/router";
import React from "react";

import { LoginSkeleton } from "components/LoginSkeleton";
import { useSession } from "next-auth/react";

type AuthComponentProps = {
  children: React.ReactNode;
  requireAuth: boolean | undefined;
};

export function AuthProvider({ children, requireAuth }: AuthComponentProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (requireAuth) {
    if (loading) {
      return <LoginSkeleton />;
    }

    if (!session) {
      // user isn't signed in, redirect to login
      router.push("/");
    }
  }

  return <>{children}</>;
}
