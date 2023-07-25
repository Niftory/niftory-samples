import { NextApiHandler } from "next"
import { getAddressFromCookie } from "../../../../lib/cookieUtils"
import { getBackendNiftoryClient } from "../../../../lib/backendNiftoryClient"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed, this endpoint only supports POST")
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

  const checkoutResponse = await niftoryClient.checkoutWithDapperWallet({
    nftModelId,
    address,
    price: 10,
    expiry: Number.MAX_SAFE_INTEGER,
  })

  res.status(200).json(checkoutResponse)
}

export default handler
