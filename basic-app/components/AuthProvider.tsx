import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import { LoginSkeleton } from "./LoginSkeleton";
import { signOutUser } from "./SignOutUser";

type AuthComponentProps = {
  children: React.ReactNode;
  requireAuth: boolean | undefined;
};

export function AuthProvider({ children, requireAuth }: AuthComponentProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (!requireAuth || loading) {
      return;
    }

    if (!session) {
      router.push("/");
      return;
    }

    if (session?.error) {
      signOutUser();
      return;
    }
  }, [requireAuth, session, router, loading]);

  if (requireAuth && loading) {
    return <LoginSkeleton />;
  }

  return <>{children}</>;
}
