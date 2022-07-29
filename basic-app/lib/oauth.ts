import { BaseClient, Issuer, TokenSet, custom } from "openid-client"

let client: BaseClient
let token: TokenSet

custom.setHttpOptionsDefaults({ timeout: 30000 })

async function getOAuthClient() {
  if (
    !process.env.NEXT_PUBLIC_CLIENT_ID ||
    !process.env.CLIENT_SECRET ||
    !process.env.NIFTORY_AUTH_ISSUER
  ) {
    throw new Error("NIFTORY_AUTH_ISSUER, NEXT_PUBLIC_CLIENT_ID, and CLIENT_SECRET must be set")
  }

  if (!client) {
    const issuer = await Issuer.discover(process.env.NIFTORY_AUTH_ISSUER)
    client = new issuer.Client({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    })
  }

  return client
}

/**
 * Gets a client credentials token.
 * @returns The client credentials token that represents the client itself.
 */
export async function getClientCredentialsToken() {
  const client = await getOAuthClient()

  if (!token || token.expired()) {
    token = await client.grant({ grant_type: "client_credentials" })
  }

  return token.access_token
}

/**
 * Refreshes an auth token.
 * @param refreshToken The refresh token to use to refresh the auth token
 * @returns A refreshed token set
 */
export async function refreshAuthToken(refreshToken: string) {
  const client = await getOAuthClient()

  return await client.refresh(refreshToken)
}
