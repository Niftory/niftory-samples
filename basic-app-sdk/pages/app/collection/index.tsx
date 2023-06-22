import { Box, Link, SimpleGrid } from "@chakra-ui/react"
import { useRouter } from "next/router"

import AppLayout from "../../../components/AppLayout"
import { ComponentWithAuth } from "../../../components/ComponentWithAuth"
import { useAuthContext } from "../../../hooks/useAuthContext"
import { useNftsQuery } from "@niftory/sdk"

const CollectionPage: ComponentWithAuth = () => {
  const router = useRouter()
  const { session } = useAuthContext()
  const _userId: string = session?.userId as string
  const [{ data }] = useNftsQuery({ variables: { userId: _userId } })
  const nfts = data?.nfts?.items

  return (
    <AppLayout>
      <SimpleGrid>
        {nfts?.map(
          (nft) =>
            nft && (
              <Box key={nft.id}>
                <Link onClick={() => router.push(`/app/collection/${nft.id}`)}>
                  {nft.model?.title}
                </Link>
              </Box>
            )
        )}
      </SimpleGrid>
    </AppLayout>
  )
}

CollectionPage.requireAuth = true
export default CollectionPage
