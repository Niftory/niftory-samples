import { NextApiHandler } from "next"
import { unstable_getServerSession } from "next-auth"
import { AUTH_OPTIONS } from "../auth/[...nextauth]"
import { getClientForServer } from "../../../graphql/getClientForServer"
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

    const niftoryClient = await getNiftoryClientForServer()

    if (requestMethod === "POST") {
      const nftModelId = variables?.nftModelId
      if (!nftModelId) {
        res.status(400).send("There must an nft model id to share")
        return
      }

      const sets = await niftoryClient.getSets({ filter: { tags: [session.userId as string] } })

      const modelsId = sets
        ?.map((item) => item.models)
        .flat()
        .map((item) => item.id)

      if (!modelsId.includes(nftModelId)) {
        res.status(400).send("NFTModel doesn't belong to user")
        return
      }

      const nfts = await niftoryClient.getNfts({
        filter: {
          ids: [userId],
        },
      })
      const hasNFT = nfts?.items?.some((item) => item.model.id === nftModelId)

      if (hasNFT) {
        res.status(400).send("User wallet already has the NFT")
        return
      }

      const transferData = await niftoryClient.transfer({
        nftModelId: variables.nftModelId,
        userId,
      })

      res.status(200).json(transferData)
    } else {
      res.status(405).end("Method not allowed, this endpoint only supports POST")
    }
  } catch (e) {
    posthog.capture("ERROR_TRANSFERNFTMODEL_API", e)
    console.error(e)
    res.status(500).json(e)
  }
}

export default handler
