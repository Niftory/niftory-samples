import { Box, Skeleton } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { useQuery } from "urql"

import { NftModelDocument, NftModelQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { NFTModelDetail } from "../../../components/drops/NFTModelDetail"

const NFTModelDetailPage = () => {
  const router = useRouter()
  const nftModelId = router.query["nftModelId"]?.toString()

  const [nftModelResponse] = useQuery<NftModelQuery>({
    query: NftModelDocument,
    variables: { id: nftModelId },
  })

  const nftModel = nftModelResponse?.data?.nftModel
  const metadata = {
    title: nftModel?.title,
    description: nftModel?.description,
    amount: nftModel?.quantity,
    content: [
      {
        contentType: nftModel?.content?.files[0]?.contentType,
        contentUrl: nftModel?.content?.files[0]?.url,
        thumbnailUrl: nftModel?.content?.poster?.url,
        alt: nftModel?.title,
      },
    ],
  }
  

  const attributes = nftModel?.attributes

  return (
    <AppLayout>
      <Skeleton isLoaded={!nftModelResponse.fetching}>
        <Box maxW="7xl" mx="auto" mt="12">
          <NFTModelDetail id={nftModelId} metadata={metadata} attributes={attributes} />
        </Box>
      </Skeleton>
    </AppLayout>
  )
}

NFTModelDetailPage.requireWallet = true
export default NFTModelDetailPage
