import { Center, Spinner } from "@chakra-ui/react"
import { useQuery } from "urql"
import { NftListingsDocument, NftListingsQuery } from "@niftory/sdk"

import AppLayout from "../../../components/AppLayout"
import { DropsGrid } from "../../../components/drops/DropsGrid"
import { UpcomingDrop } from "../../../components/drops/UpcomingDrop"
import { SectionHeader } from "../../../ui/SectionHeader"

const DropsPage = () => {
  const [nftListingsQueryResponse] = useQuery<NftListingsQuery>({
    query: NftListingsDocument,
    variables: { maxResults: "100", filter: { state: "active" } },
  })

  const nftListings = nftListingsQueryResponse.data?.nftListings?.items

  return (
    <AppLayout>
      <SectionHeader ml="16" standardText="List your drops here!" />
      {!nftListings && (
        <Center>
          <Spinner mt="16" color="white" size="lg" />
        </Center>
      )}
      <DropsGrid nftListings={nftListings} />
    </AppLayout>
  )
}

export default DropsPage
