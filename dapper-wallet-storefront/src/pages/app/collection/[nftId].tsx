import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { useQuery } from "urql"

import { Nft, NftDocument, NftQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { NFTDetail } from "../../../components/collection/NFTDetail"
import { Subset } from "../../../lib/types"
import { LoginSkeleton } from "../../../ui/Skeleton"

export const NFTDetailPage = () => {
  const router = useRouter()
  const nftId: string = router.query["nftId"]?.toString()

  const [nftResponse] = useQuery<NftQuery>({ query: NftDocument, variables: { id: nftId } })
  const nft: Subset<Nft> = nftResponse.data?.nft

  if (!nftId || nftResponse.fetching) {
    return <LoginSkeleton />
  }

  return (
    <AppLayout>
      <Box maxW="7xl" mx="auto" mt="12">
        {nft && <NFTDetail nft={nft} />}
      </Box>
    </AppLayout>
  )
}

export default NFTDetailPage
