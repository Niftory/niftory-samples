import { NextApiHandler } from "next"
import { getAddressFromCookie } from "../../../../lib/cookieUtils"
import { getBackendNiftoryClient } from "../../../../lib/backendNiftoryClient"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end("Method not allowed, this endpoint only supports POST")
    return
  }

  const address = getAddressFromCookie(req, res)
  if (!address) {
    res.status(401).send("Must be signed in to purchase NFTs.")
    return
  }

  const { nftModelId } = req.query as { nftModelId: string }

  if (!nftModelId) {
    res.status(400).send("nftModelId is required")
    return
  }

  const niftoryClient = await getBackendNiftoryClient()
  const nftModel = await niftoryClient.getNftModel(nftModelId)

  if (!nftModel?.attributes?.claimable) {
    res.status(400).end("NFT is not claimable")
  }

  const transferResponse = await niftoryClient.transfer({
    nftModelId: nftModelId,
    address,
  })

  res.status(200).json(transferResponse)
}

export default handler
