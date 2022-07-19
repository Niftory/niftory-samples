import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import urljoin from "url-join";

const NIFTORY_AUTH_PROVIDER: Provider = {
  id: "niftory",
  name: "Niftory",
  type: "oauth",
  wellKnown: urljoin(
    process.env.NIFTORY_AUTH_ISSUER as string,
    "/.well-known/openid-configuration"
  ),
  authorization: { params: { scope: "openid email profile" } },
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
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
};

export default NextAuth({
  providers: [NIFTORY_AUTH_PROVIDER],
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

      return token;
    },
    session: async ({ session, token }) => {
      session.clientId = token.aud;
      session.userId = token.sub;
      session.authToken = token.id_token;

      return session;
    },
  },
});
