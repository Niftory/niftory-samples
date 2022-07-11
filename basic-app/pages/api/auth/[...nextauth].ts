import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { OAuthConfig } from "next-auth/providers";
import urljoin from "url-join";

export type NextAuthParams = {
  clientId: string;
  clientSecret?: string;
  authSecret?: string;
};

type OAuthProfile = {
  sub: string;
  name: string;
  email: string;
  picture: string;
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await getNextAuth(req, res, {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    authSecret: process.env.AUTH_SECRET as string,
  });
}

export const getNextAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { clientId, clientSecret, authSecret }: NextAuthParams
) => {
  const providers: OAuthConfig<OAuthProfile>[] = [
    {
      id: "niftory",
      name: "Niftory",
      type: "oauth",
      wellKnown: urljoin(
        process.env.AUTH_SERVICE as string,
        "/.well-known/openid-configuration"
      ),
      authorization: { params: { scope: "openid email profile" } },
      clientId,
      clientSecret,
      checks: ["pkce", "state"],
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      httpOptions: {
        timeout: 10000,
      },
    },
  ];

  return await NextAuth(req, res, {
    providers,
    secret: authSecret,

    pages: {
      error: "/error",
    },
    callbacks: {
      // Seealso: https://next-auth.js.org/configuration/callbacks
      jwt: async ({ token, user, account }) => {
        // user is only passed in at inital signIn.
        // Add authTime to token on signIn
        if (user) {
          token.authTime = Math.floor(Date.now() / 1000);
        }

        if (account?.id_token) {
          token.id_token = account.id_token;
        }

        token.clientId = clientId;

        return token;
      },
      session: async ({ session, token }) => {
        session.clientId = token.aud;
        session.userId = token.sub;
        session.encodedJwt = token.id_token;

        return session;
      },
    },
  });
};
