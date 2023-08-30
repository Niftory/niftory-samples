import { getBackendNiftoryClient } from "graphql/getBackendNiftoryClient";
import { NextApiHandler } from "next";
import { getToken } from "next-auth/jwt";
import { unstable_getServerSession } from "next-auth";

const handler: NextApiHandler = async (req, res) => {
    const { nftModelId, userId, walletId } = req.body;
  
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
  
    const client = await getBackendNiftoryClient()
  
    const data = await client.transfer({
      nftModelId: nftModelId as string,
      userId: userId as string
    });
  
    res.status(200).json(data);
  };

  export default handler