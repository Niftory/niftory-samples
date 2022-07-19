import { NextApiHandler } from "next";
import { getClientCredentialsToken } from "../../../../lib/oauth";
import { request, gql } from "graphql-request";
import { getToken } from "next-auth/jwt";

const transferNFTToUser = gql`
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

  const token = await getClientCredentialsToken();

  const data = await request(
    process.env.NEXT_PUBLIC_API_PATH as string,
    transferNFTToUser,
    {
      nftModelId,
      userId,
    },
    {
      Authorization: `Bearer ${token}`,
      "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
    }
  );

  res.status(200).json(data);
};

export default handler;
