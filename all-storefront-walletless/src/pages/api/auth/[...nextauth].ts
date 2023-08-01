import NextAuth from "next-auth"
import { Provider } from "next-auth/providers"
import urljoin from "url-join"
import { refreshAuthToken, getClientCredentialsToken } from "../../../lib/oauth"
import { NextAuthOptions } from "next-auth"

const NIFTORY_AUTH_PROVIDER: Provider = {
  id: "niftory",
  name: "Niftory",
  type: "oauth",
  wellKnown: urljoin(
    process.env.NIFTORY_AUTH_ISSUER as string,
    "/.well-known/openid-configuration"
  ),

  // We request offline_access and consent prompt because we need to get a refresh token
  authorization: {
    params: { scope: "openid email profile offline_access", prompt: "consent" },
  },

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
    }
  },
  httpOptions: {
    timeout: 10000,
  },
}

export const AUTH_OPTIONS: NextAuthOptions = {
  providers: [NIFTORY_AUTH_PROVIDER],
  debug: true,
  callbacks: {
    // See also: https://next-auth.js.org/tutorials/refresh-token-rotation
    jwt: async ({ token, user, account }) => {
      // user and account are only passed in at inital sign in.
      if (account && user) {
        return {
          ...token,
          authToken: account?.id_token,
          authTokenExpiresAt: account?.expires_at * 1000,
          refreshToken: account?.refresh_token,
        }
      }

      // this isn't initial sign-in, so let's see if the token is still valid
      if (Date.now() < token.authTokenExpiresAt) {
        // token is still valid, no need to refresh it
        return token
      }

      // if we get here, the token is expired, so we need to refresh it
      try {
        const refreshed = await refreshAuthToken(token.refreshToken as string)
        return {
          ...token,
          authToken: refreshed?.id_token,
          authTokenExpiresAt: refreshed?.expires_at * 1000,
          refreshToken: refreshed?.refresh_token || token?.refresh_token,
        }
      } catch (e) {
        console.error(e)
        return { ...token, error: e }
      }
    },
    session: async ({ session, token }) => {
      session.userId = token.sub
      session.clientId = token.aud
      session.authToken = token.authToken
      session.error = token.error

      return session
    },
  },
}

export default NextAuth(AUTH_OPTIONS)
