import { Button, Heading, Stack, Text } from "@chakra-ui/react"
import { useCallback, useState } from "react"

import { Gallery } from "ui/Content/Gallery/Gallery"
import { useAuthContext } from "hooks/useAuthContext"
import { backendClient } from "graphql/backendClient"
import { useAppUserQuery } from "@niftory/sdk/react"
import { useRouter } from "next/router"

type NFTModelDetailProps = {
  nftModelId: string
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
}


export const NFTModelDetail = ({ nftModelId, metadata }: NFTModelDetailProps) => {
  const router = useRouter()
  const { session } = useAuthContext()
  const [appUser] = useAppUserQuery()
  const userId = appUser?.data?.appUser?.id
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimError, setClaimError] = useState(null)

  const handleClaim = useCallback(async () => {
    setIsClaiming(true)
    setClaimError(null)
    backendClient("transferNFTModel", {
      nftModelId: nftModelId,
      userId: userId,
    })
    .catch((error) => {
      console.error(error)
      setClaimError(error?.message || error)
    })
    .finally(() => {
      setIsClaiming(false)
      router.push(`/app/collection/`)
    })
  }, [nftModelId, userId, router])

  const buttonText = session
  ? "Claim this NFT"
  : "Log in to claim"

  const buttonClick = session
  ? handleClaim
  : () => router.push("/login")

  const buttonColor = session
  ? "yellow"
  : "red"

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
          <Button
            isLoading={isClaiming}
            onClick={buttonClick}
            my="auto"
            p="8"
            colorScheme={buttonColor}
          >
            <Text>{buttonText}</Text>
          </Button>
          {claimError && (
            <Text color="white">
              There was an error while attempting to claim NFT:
              <Text color="red">{claimError.toString()}</Text>
            </Text>
          )}
      </Stack>
      <Gallery rootProps={{ overflow: "hidden", flex: "1" }} content={metadata.content} />
    </Stack>
  )
}
