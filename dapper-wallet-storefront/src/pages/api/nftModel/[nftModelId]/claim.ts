import { NextApiHandler } from "next"
import { gql } from "graphql-request"
import { getBackendGraphQLClient } from "../../../../lib/BackendGraphQLClient"
import { NftModelDocument, TransferNftToWalletDocument } from "../../../../../generated/graphql"
import { getAddressFromCookie } from "../../../../lib/cookieUtils"

gql`
  query nftModel($id: ID!, $nftModelId: ID!) {
    nfts(id: $id) {
      items {
        id
      }
      cursor
    }
  }
`

gql`
  mutation transferNFTToUser($nftModelId: ID!, $address: String!) {
    transfer(nftModelId: $nftModelId, address: $address) {
      id
    }
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


  const { nftModelId } = req.query

  if (!nftModelId) {
    res.status(400).send("nftModelId is required")
    return
  }

  const backendGQLClient = await getBackendGraphQLClient()
  const nftModelResponse = await backendGQLClient.request(NftModelDocument, { id: nftModelId })

  if (!nftModelResponse?.nftModel?.attributes?.claimable) {
    res.status(400).end("NFT is not claimable")
  }

  const transferResponse = await backendGQLClient.request(TransferNftToWalletDocument, 
    {nftModelId: nftModelId, address})

  res.status(200).json(transferResponse)
}

export default handler