import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import { AuthState, getGraphQLClient } from "./api-client";

export const useGraphQLClient = () => {
  const { data: session } = useSession();

  const getAuthState = useCallback(async (): Promise<AuthState | null> => {
    if (!session) {
      return null;
    }

    return {
      authToken: session.encodedJwt as string,
      authTokenExpiration: Date.parse(session.expires),
    };
  }, [session]);

  return useMemo(() => {
    const client = getGraphQLClient(getAuthState);

    return client;
    // We want to recreate the client whenever the signin state changes
  }, [getAuthState]);
};
