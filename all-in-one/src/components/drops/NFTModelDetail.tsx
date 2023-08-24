import { Button, Heading, Stack, Text } from "@chakra-ui/react"
import { useAppUserQuery } from "@niftory/sdk/react"
import { useCallback, useState } from "react"

import { Gallery } from "ui/Content/Gallery/Gallery"
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

export const NFTModelDetail = ({ id, metadata }: NFTModelDetailProps) => {
  const router = useRouter()
  const [checkoutStatusIndex, setCheckoutStatusIndex] = useState(0)

  const handleClaim = useCallback(async () => {
    setCheckoutStatusIndex(4)
    axios
      .post(`/api/nftModel/${id}/claim`)
      .then(({ data }) => router.push(`/app/collection/${data.id}`))
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
          <Button
            isLoading={checkoutStatusIndex > 0}
            loadingText={checkoutStatusMessages[checkoutStatusIndex]}
            onClick={handleClaim}
            my="auto"
            p="8"
          >
            <Text>Claim This NFT</Text>
          </Button>
      </Stack>
      <Gallery rootProps={{ overflow: "hidden", flex: "1" }} content={metadata.content} />
    </Stack>
  )
}
