import { NextApiHandler } from "next"

import { getAddressFromCookie } from "../../lib/cookieUtils"
import { getBackendNiftoryClient } from "../../lib/backendNiftoryClient"

const handler: NextApiHandler = async (req, res) => {
  const niftoryClient = await getBackendNiftoryClient()

  if (req.method !== "POST") {
    res.status(405).send("Method not allowed, this endpoint only supports POST")
    return
  }

  const address = getAddressFromCookie(req, res)
  if (!address) {
    res.status(401).send("Must be signed in to ready wallet.")
  }

  const response = await niftoryClient.readyWallet(address)
  res.status(200).json(response)
}

export default handler
