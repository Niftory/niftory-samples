import { Box } from "@chakra-ui/react"

import AppLayout from "components/AppLayout"
import { NFTModelDetail } from "components/drops/NFTModelDetail"
import { useNftModelQuery } from "@niftory/sdk/react"
import { useRouter } from "next/router"

const DropDetailPage = () => {
  const router = useRouter()
  const nftModelId = router.query["nftModelId"]?.toString()

  const [modelResponse, _] = useNftModelQuery({variables: {id: nftModelId }})
  const nftModel = modelResponse.data.nftModel
  
  return (
    <AppLayout>
      <Box bg="page.background" pos="relative" width="100%" height="80px"></Box>
      <NFTModelDetail id={nftModel.id}  metadata={nftModel.metadata} />
    </AppLayout>
  )
}

export default DropDetailPage
