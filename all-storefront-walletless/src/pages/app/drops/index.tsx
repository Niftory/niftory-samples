import { Center, Spinner } from "@chakra-ui/react"
import React from "react"
import { useQuery } from "urql"
import { NftListingsDocument, NftListingsQuery } from "@niftory/sdk"

import AppLayout from "../../../components/AppLayout"
import { DropsGrid } from "../../../components/drops/DropsGrid"
import { UpcomingDrop } from "../../../ui/marketing"
import { SectionHeader } from "../../../ui/SectionHeader"

const DropsPage = () => {
  const [nftListingsQueryResponse] = useQuery<NftListingsQuery>({
    query: NftListingsDocument,
    variables: { maxResults: "100", filter: { state: "active" } },
  })

  const nftListings = nftListingsQueryResponse.data?.nftListings?.items

  return (
    <AppLayout>
      <SectionHeader standardText="Get A Drop" />
      {!nftListings && (
        <Center>
          <Spinner mt="16" color="white" size="lg" />
        </Center>
      )}
      <DropsGrid nftListings={nftListings} /> <UpcomingDrop />
    </AppLayout>
  )
}

export default DropsPage
