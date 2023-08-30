import { Button, Heading, Stack, Text } from "@chakra-ui/react"
import { useCallback, useState } from "react"

import { Gallery } from "ui/Content/Gallery/Gallery"
import { useAuthContext } from "hooks/useAuthContext"
import { useTransferMutation } from "@niftory/sdk/react"
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
}


export const NFTModelDetail = ({ id, metadata }: NFTModelDetailProps) => {
  const router = useRouter()
  const { session } = useAuthContext()
  const [_, transferMutation] = useTransferMutation()
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimError, setClaimError] = useState(null)

  const handleClaim = useCallback(() => {
    setIsClaiming(true)
    setClaimError(null)
    transferMutation(
      {
        nftModelId: id
    }).then((res) => router.push(`/app/collection/${res.data.transfer.id}`))
    .catch((error) => {
      console.error(error)
      setClaimError(error?.response?.data || error)
    })
    .finally(() => setIsClaiming(false))
  }, [transferMutation, id, router])

  const buttonText = session
  ? "Claim this NFT"
  : "Log in to claim"

  const buttonClick = session
  ? handleClaim
  : () => router.push("/app/login")

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
            <Text>
              There was an error while attempting to claim NFT:
              <Text color="red">{claimError}</Text>
            </Text>
          )}
      </Stack>
      <Gallery rootProps={{ overflow: "hidden", flex: "1" }} content={metadata.content} />
    </Stack>
  )
}
