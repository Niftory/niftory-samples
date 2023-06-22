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
  const { nftModelId } = req.query

  if (!nftModelId) {
    res.status(400).send("transactionId is required")
    return
  }

  const input = req.body

  if (input?.nftDatabaseId == null || input?.transactionId == null) {
    res
      .status(400)
      .end(
        "Required params 'nftDatabaseId' or 'transactionId' aren't specified in the request body."
      )
  }

  const niftoryClient = await getBackendNiftoryClient()

  const completeCheckoutResponse = await niftoryClient.completeCheckoutWithDapperWallet({
    transactionId: input.transactionId,
    nftDatabaseId: input.nftDatabaseId,
  })

  res.status(200).json(completeCheckoutResponse)
}

export default handler
