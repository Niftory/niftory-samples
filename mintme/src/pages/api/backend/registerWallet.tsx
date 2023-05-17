import { NextApiHandler } from "next"
import { unstable_getServerSession } from "next-auth"
import { AUTH_OPTIONS } from "../auth/[...nextauth]"
import { getClientForServer } from "../../../graphql/getClientForServer"
import {
  CreateNiftoryWalletDocument,
  RegisterWalletDocument,
  RegisterWalletInput,
  RegisterWalletMutation,
  RegisterWalletMutationVariables,
} from "@niftory/sdk"
import posthog from "posthog-js"
import { getNiftoryClientForServer } from "graphql/getNiftoryClient"

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, AUTH_OPTIONS)

    if (!session.authToken || !session.userId) {
      res.status(401).send("There must be a user signed in to use this API route")
      return
    }
    const requestMethod = req.method
    const { address } = req.body

    const niftoryClient = await getNiftoryClientForServer()

    if (!address) {
      res.status(400).send("Address is required but was undefined")
      return
    }

    if (requestMethod === "POST") {
      const postData = await niftoryClient.registerWallet(address)
      res.status(200).json(postData)
    } else {
      res.status(405).end("Method not allowed, this endpoint only supports POST")
    }
  } catch (e) {
    res.status(500).json(e)
    posthog.capture("ERROR_REGISTERWALLET_API", e)
  }
}

export default handler
