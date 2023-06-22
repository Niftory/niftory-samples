import { NextApiHandler } from "next"
import { gql } from "graphql-request"
import { getToken } from "next-auth/jwt"
import { getNiftoryClientForServer } from "../../../../lib/graphql/niftoryClient"

const handler: NextApiHandler = async (req, res) => {
  try {
    const { nftModelId } = req.query

    if (req.method !== "POST") {
      res.status(405).end()
      return
    }

    const userToken = await getToken({ req })
    if (!userToken) {
      res.status(401).send("You must be signed in to transfer NFTs")
    }

    if (!nftModelId) {
      res.status(400).send("nftModelId is required")
      return
    }

    const client = await getNiftoryClientForServer()

    // First verify that the user hasn't already claimed an NFT from this model
    const nfts = await client.getNfts({
      userId: userToken.sub,
      filter: { nftModelIds: [nftModelId as string] },
    })
    if (nfts?.items?.length > 0) {
      res.status(400).send("You already have an NFT from this model")
      return
    }

    const transferResponse = await client.transfer({
      nftModelId: nftModelId as string,
      userId: userToken.sub,
    })

    res.status(200).json(transferResponse)
  } catch (e) {
    console.error(e)
    res.status(500).json(e)
  }
}

export default handler
