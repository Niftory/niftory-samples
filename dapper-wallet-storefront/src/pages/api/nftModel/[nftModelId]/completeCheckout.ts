import { NextApiHandler } from "next"
import { gql } from "graphql-request"
import { getBackendGraphQLClient } from "../../../../lib/BackendGraphQLClient"
import { getAddressFromCookie } from "../../../../lib/cookieUtils"

const CompleteCheckoutWithDapperWallet = gql`
  mutation CompleteCheckoutWithDapperWallet($transactionId: String!, $nftDatabaseId: String) {
    completeCheckoutWithDapperWallet(transactionId: $transactionId, nftDatabaseId: $nftDatabaseId) {
      id
      blockchainId
      serialNumber
      saleState
      blockchainState
    }
  }
`

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

  const backendGQLClient = await getBackendGraphQLClient()

  const completeCheckoutResponse = await backendGQLClient.request(
    CompleteCheckoutWithDapperWallet,
    {
      transactionId: input.transactionId,
      nftDatabaseId: input.nftDatabaseId,
    }
  )

  res.status(200).json(completeCheckoutResponse.completeCheckoutWithDapperWallet)
}

export default handler
