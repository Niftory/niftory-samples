import { BaseClient, Issuer, TokenSet } from "openid-client";

let client: BaseClient;
let token: TokenSet;

async function getOAuthClient() {
  if (
    !process.env.NEXT_PUBLIC_CLIENT_ID ||
    !process.env.CLIENT_SECRET ||
    !process.env.NIFTORY_AUTH_ISSUER
  ) {
    throw new Error(
      "NIFTORY_AUTH_ISSUER, NEXT_PUBLIC_CLIENT_ID, and CLIENT_SECRET must be set"
    );
  }

  if (!client) {
    const issuer = await Issuer.discover(process.env.NIFTORY_AUTH_ISSUER);
    client = new issuer.Client({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });
  }

  return client;
}

export async function getClientCredentialsToken() {
  const client = await getOAuthClient();

  if (!token || token.expired()) {
    token = await client.grant({ grant_type: "client_credentials" });
  }

  return token.access_token;
}
