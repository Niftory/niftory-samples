import { Box, Skeleton } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { useNftModelQuery } from "@niftory/sdk/react"
import AppLayout from "components/AppLayout"
import { NFTModelDetail } from "components/drops/NFTModelDetail"

const DropDetailPage = () => {
  const router = useRouter()
  const nftModelId = router.query["nftModelId"]?.toString()

  const [nftModelResponse] = useNftModelQuery({
    variables: { id: nftModelId },
  })

  const nftModel = nftModelResponse?.data?.nftModel
  let metadata = {
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

  return (
    <AppLayout>
      <Skeleton isLoaded={!nftModelResponse.fetching}>
        <Box maxW="7xl" mx="auto" mt="12">
          <NFTModelDetail id={nftModelId} metadata={metadata} />
        </Box>
      </Skeleton>
    </AppLayout>
  )
}

export default DropDetailPage
