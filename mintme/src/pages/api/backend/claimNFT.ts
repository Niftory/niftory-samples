import { NextApiHandler } from "next"
import { unstable_getServerSession } from "next-auth"
import { AUTH_OPTIONS } from "../auth/[...nextauth]"
import * as jose from "jose"
import posthog from "posthog-js"
import { getNiftoryClientForServer } from "graphql/getNiftoryClient"

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, AUTH_OPTIONS)

    if (!session.authToken || !session.userId) {
      res.status(401).send("There must be a user signed in to use this API route")
    }
    const requestMethod = req.method
    const userId = session.userId as string
    const variables = req.body

    if (requestMethod === "POST") {
      if (!variables.token) {
        res.status(401).send("There must be a token to claim this nft")
        return
      }
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET as string)

      const { payload } = await jose.jwtVerify(variables.token, secret)

      const nftModelId = payload.nftModelId.toString()

      const niftoryClient = getNiftoryClientForServer()

      const nfts = await niftoryClient.getNfts({ userId })

      const hasNFT = nfts?.items?.some((item) => item.model.id === nftModelId)
      if (hasNFT) {
        res.status(400).send("NFT has already been claimed")
        return
      }

      const transferData = await niftoryClient.transfer({
        nftModelId,
        userId,
      })
      res.status(200).json(transferData)
    } else {
      res.status(405).end("Method not allowed, this endpoint only supports POST")
    }
  } catch (e) {
    res.status(500).json(e)
    posthog.capture("ERROR_CLAIMNFT_API", e)
  }
}

export default handler
