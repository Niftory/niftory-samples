import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { graphqlQueryAsync } from "../lib/api-client";
import { useGraphQLClient } from "../lib/useGraphQLClient";
import { gql } from "urql";

import { NexusGenRootTypes } from "../lib/api-types";

const API_GET_APP_USER = gql`
  query {
    appUser {
      id
      name
      email
      image
      app {
        id
      }
      wallet {
        id
        address
        state
      }
    }
  }
`;

export function useUser() {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<NexusGenRootTypes["AppUser"] | null>();
  const [error, setError] = useState<Error | null>();
  const client = useGraphQLClient();

  const sessionLoading = status === "loading";
  const userId = session?.userId;

  useEffect(() => {
    // session still loading
    if (sessionLoading) {
      return;
    }

    // session loaded, but user isn't signed in
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    graphqlQueryAsync<{ appUser: NexusGenRootTypes["AppUser"] }>(
      client,
      API_GET_APP_USER
    )
      .then((data) => {
        console.log("Got appUser: ", JSON.stringify(data));
        setUser(data?.appUser as NexusGenRootTypes["AppUser"]);
      })
      .catch((e) => {
        console.error("Error fetching user: ", e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, sessionLoading, client]);

  return { user, session, loading: loading || sessionLoading, error };
}
