import { Heading, Text, Button, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"
import AppLayout from "../../../components/AppLayout"
import { ComponentWithAuth } from "../../../components/ComponentWithAuth"
import axios from "axios"
import { useNftModelQuery, useUserWalletQuery, WalletState } from "../../../generated/graphql"
import { useGraphQLQuery } from "../../../hooks/useGraphQLQuery"
import { useCallback, useState } from "react"

import { gql } from "graphql-request"
import { useAuthContext } from "../../../hooks/useAuthContext"

gql`
  query nftModel($id: ID!) {
    nftModel(id: $id) {
      id
      blockchainId
      title
      description
      quantity
      status
      content {
        files {
          url
          contentType
        }
        poster {
          url
        }
      }
      rarity
    }
  }
`

const DropPage: ComponentWithAuth = () => {
  const router = useRouter()
  const { session, signIn, isLoading: sessionLoading } = useAuthContext()
  const nftModelId = router.query["nftModelId"] as string

  const { data: nftModelData } = useGraphQLQuery(useNftModelQuery, {
    id: nftModelId,
  })
  const { data: walletData, isFetched: walletFetched } = useGraphQLQuery(useUserWalletQuery)

  const wallet = walletData?.wallet
  const nftModel = nftModelData?.nftModel

  const [isTransferring, setIsTransferring] = useState(false)
  const [transferError, setTransferError] = useState<string>(null)

  const initiateTransfer = useCallback(() => {
    setIsTransferring(true)
    setTransferError(null)
    axios
      .post(`/api/nft/${nftModelId}/transfer`)
      .then(({ data }) => router.push(`/app/collection/${data.transfer.id}`))
      .catch((error) => {
        console.error(error)
        setTransferError(error?.response?.data || error)
      })
      .finally(() => setIsTransferring(false))
  }, [nftModelId, router])

  const buttonAction = session
    ? wallet?.state === WalletState.Ready
      ? initiateTransfer
      : () => router.push("/app/wallet")
    : signIn

  const buttonText = session
    ? wallet?.state === WalletState.Ready
      ? "Claim"
      : "Set up wallet to claim"
    : "Sign in to claim"

  return (
    <AppLayout>
      {nftModel && (
        <>
          <Image alt={nftModel.title} boxSize="30vh" src={nftModel.content?.poster?.url}></Image>
          <Heading>{nftModel.title}</Heading>
          <Text>{nftModel.description}</Text>
          <Button
            isLoading={sessionLoading || !walletFetched || isTransferring}
            onClick={buttonAction}
            colorScheme="blue"
            my="auto"
          >
            {buttonText}
          </Button>
          {transferError && (
            <Text>
              Something went wrong during transfer. The server responded with:
              <Text color="red">{transferError.toString()}</Text>
            </Text>
          )}
        </>
      )}
    </AppLayout>
  )
}

export default DropPage
