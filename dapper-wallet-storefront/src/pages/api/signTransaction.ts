import { NextApiHandler } from "next"
import { gql } from "graphql-request"
import { getBackendGraphQLClient } from "../../lib/BackendGraphQLClient"
import { getAddressFromCookie } from "../../lib/cookieUtils"
import { getBackendNiftoryClient } from "../../lib/backendNiftoryClient"

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405).send("Method not allowed, this endpoint only supports POST")
      return
    }

    const address = getAddressFromCookie(req, res)
    if (!address) {
      res.status(401).send("Must be signed in to purchase NFTs.")
      return
    }

    const input = req.body

    if (input?.transaction == null) {
      res.status(400).send("'transaction' isn't specified in the request body")
      return
    }

    const niftoryClient = await getBackendNiftoryClient()

    const checkoutResponse = await niftoryClient.signTransactionForDapperWallet({
      transaction: input.transaction,
    })

    res.status(200).json(checkoutResponse)
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
}

export default handler
