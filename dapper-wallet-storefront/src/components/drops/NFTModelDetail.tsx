import { Button, Heading, Stack, Text } from "@chakra-ui/react"
import * as React from "react"
import * as fcl from "@onflow/fcl"
import { useCallback, useState } from "react"
import { useWalletContext } from "../../hooks/useWalletContext"

import { Gallery } from "../../ui/Content/Gallery/Gallery"
import axios from "axios"
import { useRouter } from "next/router"

type NFTModelDetailProps = {
  id: string
  metadata: {
    title: string
    description: string
    amount: number
    content: {
      contentType: string
      contentUrl: string
      thumbnailUrl: string
      alt: string
    }[]
  }
  attributes: any
}

const checkoutStatusMessages = [
  "",
  "Starting checkout...",
  "Waiting for transaction approval...",
  "Waiting for transaction completion...",
  "Completing checkout...",
  "Purchase complete! Redirecting...",
]

export const NFTModelDetail = ({ id, metadata, attributes }: NFTModelDetailProps) => {
  const router = useRouter()
  const [checkoutStatusIndex, setCheckoutStatusIndex] = useState(0)
  const claimable = attributes?.claimable ?? false

  const { currentUser } = useWalletContext()

  const signTransaction = useCallback(async (transaction: string) => {
    const response = await axios.post("/api/signTransaction", { transaction })
    return response.data.signTransactionForDapperWallet
  }, [])

  const handleCheckout = useCallback(async () => {
    try {
      setCheckoutStatusIndex(1)
      const initiateCheckoutResponse = await axios.post(`/api/nftModel/${id}/initiateCheckout`)
      const {
        cadence,
        registryAddress,
        brand,
        nftId,
        nftDatabaseId,
        nftTypeRef,
        setId,
        templateId,
        price,
        expiry,
        signerKeyId,
        signerAddress,
      } = initiateCheckoutResponse.data

      setCheckoutStatusIndex(2)
      const tx = await fcl.mutate({
        cadence,
        args: (arg, t) => [
          arg(process.env.NEXT_PUBLIC_MERCHANT_ACCOUNT_ADDRESS, t.Address),
          arg(registryAddress, t.Address),
          arg(brand, t.String),
          arg(nftId, t.Optional(t.UInt64)),
          arg(nftTypeRef, t.String),
          arg(setId, t.Optional(t.Int)),
          arg(templateId, t.Optional(t.Int)),
          arg(price, t.UFix64),
          arg(expiry, t.UInt64),
        ],
        authorizations: [
          async (account) => ({
            ...account,
            addr: signerAddress,
            tempId: `${signerAddress}-${signerKeyId}`,
            keyId: signerKeyId,
            signingFunction: async (signable) => {
              return {
                keyId: signerKeyId,
                addr: signerAddress,
                signature: await signTransaction(signable.message),
              }
            },
          }),
          fcl.authz,
        ],
        limit: 9999,
      })

      setCheckoutStatusIndex(3)
      await fcl.tx(tx).onceSealed()

      setCheckoutStatusIndex(4)
      const completeCheckoutResponse = await axios.post(`/api/nftModel/${id}/completeCheckout`, {
        transactionId: tx,
        nftDatabaseId,
      })

      setCheckoutStatusIndex(5)
      const nft = completeCheckoutResponse.data

      await router.push(`/app/collection/${nft.id}`)
    } finally {
      setCheckoutStatusIndex(0)
    }
  }, [id, router, signTransaction])

  const handleClaim = useCallback(async () => {

    setCheckoutStatusIndex(4)
    axios
      .post(`/api/nftModel/${id}/claim`)
      .then(({ data }) => router.push(`/app/collection/${data.transfer.id}`))
      .catch((error) => {
        console.error(error)
      })
      .finally(() => setCheckoutStatusIndex(5))
  }, [id, router])


  return (
    <Stack direction={{ base: "column-reverse", lg: "row" }}>
      <Stack
        p="8"
        borderRadius="4"
        minW={{ lg: "sm" }}
        maxW={{ lg: "sm" }}
        justify="center"
        backgroundColor="gray.800"
      >
        <Stack>
          <Stack>
            <Heading size="lg" fontWeight="medium" color="page.accent">
              {metadata.title}
            </Heading>
          </Stack>

          <Text color="page.text">{metadata.description}</Text>
          <Text color="page.text">{metadata.amount} Total Available </Text>
        </Stack>
        {!claimable && <Button
          isLoading={!currentUser?.addr || checkoutStatusIndex > 0}
          loadingText={checkoutStatusMessages[checkoutStatusIndex]}
          onClick={handleCheckout}
          my="auto"
          p="8"
        >
          <Text>Checkout</Text>
        </Button>}

        {claimable &&
          <Button
            isLoading={!currentUser?.addr || checkoutStatusIndex > 0}
            loadingText={checkoutStatusMessages[checkoutStatusIndex]}
            onClick={handleClaim}
            my="auto"
            p="8"
          >
            <Text>Claim This NFT</Text>
          </Button>}
      </Stack>
      <Gallery rootProps={{ overflow: "hidden", flex: "1" }} content={metadata.content} />
    </Stack>
  )
}
