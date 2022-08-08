import { NextApiHandler } from "next"
import { gql } from "graphql-request"
import { getToken } from "next-auth/jwt"
import { getBackendGraphQLClient } from "../../../../lib/graphql/backendClient"
import { getSdk } from "../../../../generated/graphql"

gql`
  query userNftsByUser($userId: ID!, $nftModelId: ID!) {
    nfts(userId: $userId, filter: { nftModelIds: [$nftModelId] }) {
      items {
        id
      }
      cursor
    }
  }
`

gql`
  mutation transferNFTToUser($nftModelId: ID!, $userId: ID!) {
    transfer(nftModelId: $nftModelId, userId: $userId) {
      id
    }
  }
`

const handler: NextApiHandler = async (req, res) => {
  const { nftModelId } = req.query

  if (req.method !== "POST") {
    res.status(405).end()
    return
  }

  const userToken = await getToken({ req })
  if (!userToken) {
    res.status(401).send("You must be signed in to transfer NFTs")
  }

  if (!nftModelId) {
    res.status(400).send("nftModelId is required")
    return
  }

  const client = await getBackendGraphQLClient()
  const sdk = getSdk(client)

  // First verify that the user hasn't already claimed an NFT from this model
  const userNftsResponse = await sdk.userNftsByUser({
    userId: userToken.sub,
    nftModelId: nftModelId as string,
  })

  if (userNftsResponse.nfts?.items?.length > 0) {
    res.status(400).send("You already have an NFT from this model")
    return
  }

  const transferResponse = await sdk.transferNFTToUser({
    nftModelId: nftModelId as string,
    userId: userToken.sub,
  })

  res.status(200).json(transferResponse)
}

export default handler
