import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import { getGraphQLClient } from "./api-client";

export const useGraphQLClient = () => {
  const { data: session } = useSession();
  const isSignedIn = !!session;

  const getAuthState = useCallback(async () => {
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
  }, [isSignedIn, getAuthState]);
};
