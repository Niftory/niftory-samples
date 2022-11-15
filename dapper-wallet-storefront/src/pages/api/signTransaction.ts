import { NextApiHandler } from "next"
import { gql } from "graphql-request"
import { getBackendGraphQLClient } from "../../lib/BackendGraphQLClient"
import { getAddressFromCookie } from "../../lib/cookieUtils"

const SignTransactionForDapperWallet = gql`
  mutation SignTransactionForDapperWallet($transaction: String) {
    signTransactionForDapperWallet(transaction: $transaction)
  }
`

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

  const input = req.body

  if (input?.transaction == null) {
    res.status(400).end("'transaction' isn't specified in the request body")
    return
  }

  const backendGQLClient = await getBackendGraphQLClient()

  try {
    const checkoutResponse = await backendGQLClient.request(SignTransactionForDapperWallet, {
      transaction: input.transaction,
    })

    res.status(200).json(checkoutResponse)
  } catch (e) {
    console.log(e)
    res.status(500).end("Next API Error: ")
  }
}

export default handler
