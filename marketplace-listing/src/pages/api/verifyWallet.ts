import { NextApiHandler } from "next"
import { getAddressFromCookie } from "../../lib/cookieUtils"
import { getBackendNiftoryClient } from "../../lib/backendNiftoryClient"

const handler: NextApiHandler = async (req, res) => {
  const niftoryClient = await getBackendNiftoryClient()

  if (req.method !== "POST") {
    res.status(405).end("Method not allowed, this endpoint only supports POST")
  }

  const address = getAddressFromCookie(req, res)
  if (!address) {
    res.status(401).send("Must be signed in to verify wallet.")
  }

  const signedVerificationCode = req.body?.signedVerificationCode
  if (!signedVerificationCode) {
    res.status(400).send('"signedVerificationCode" is required.')
  }

  const postData = await niftoryClient.verifyWallet({
    address,
    signedVerificationCode,
  })
  res.status(200).json(postData)
}

export default handler
