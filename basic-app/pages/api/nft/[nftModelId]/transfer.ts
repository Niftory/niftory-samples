import { NextApiHandler } from "next";
import { gql } from "graphql-request";
import { getToken } from "next-auth/jwt";
import { getBackendGraphQLClient } from "../../../../lib/graphql/backendClient";
import { getSdk } from "../../../../generated/graphql";

gql`
  mutation transferNFTToUser($nftModelId: ID!, $userId: ID!) {
    transfer(nftModelId: $nftModelId, userId: $userId) {
      id
    }
  }
`;

const handler: NextApiHandler = async (req, res) => {
  const { nftModelId, userId } = req.query;

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const signedIn = !!getToken({ req });
  if (!signedIn) {
    res.status(401).send("You must be signed in to transfer NFTs");
  }

  if (!nftModelId) {
    res.status(400).send("nftModelId is required");
    return;
  }

  const client = await getBackendGraphQLClient();
  const sdk = getSdk(client);

  const data = await sdk.transferNFTToUser({
    nftModelId: nftModelId as string,
    userId: userId as string,
  });

  res.status(200).json(data);
};

export default handler;
