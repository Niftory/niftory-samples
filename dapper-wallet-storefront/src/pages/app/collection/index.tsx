import { Box } from "@chakra-ui/react"
import { useQuery } from "urql"

import AppLayout from "../../../components/AppLayout"
import { Nft, NftsByWalletDocument, NftsByWalletQuery } from "../../../../generated/graphql"
import { CollectionGrid } from "../../../components/collection/CollectionGrid"
import { Subset } from "../../../lib/types"
import { SectionHeader } from "../../../ui/SectionHeader"
import { useWalletContext } from "../../../hooks/useWalletContext"

const CollectionPage = () => {
  const { currentUser } = useWalletContext()

  const [nftsByWalletResponse] = useQuery<NftsByWalletQuery>({
    query: NftsByWalletDocument,
    variables: { address: currentUser?.addr },
    pause: !currentUser?.addr,

    // refetch in the background in case the user has purchased something
    requestPolicy: "cache-and-network",
  })

  const nfts: Subset<Nft>[] = nftsByWalletResponse?.data?.nftsByWallet?.items

  return (
    <AppLayout>
      <Box maxW="7xl" mx="auto">
        <SectionHeader text="My Collection" />
        <CollectionGrid nfts={nfts} isLoading={nftsByWalletResponse.fetching} />
      </Box>
    </AppLayout>
  )
}

CollectionPage.requireWallet = true
export default CollectionPage
