import { Box, Center, Spinner } from "@chakra-ui/react"
import { useNftModelsQuery, useNftModelQuery } from "@niftory/sdk/react"

import AppLayout from "../../../components/AppLayout"
import { DropsGrid } from "../../../components/drops/DropsGrid"
import { UpcomingDrop } from "../../../components/drops/UpcomingDrop"
import { SectionHeader } from "../../../ui/SectionHeader"

const DropsPage = () => {
  // const [nftListingsQueryResponse] = useQuery<NftListingsQuery>({
  //   query: NftListingsDocument,
  //   variables: { maxResults: "100", filter: { state: "active" } },
  // })

  const [{data, fetching: isFetching}] = useNftModelsQuery()

  const collectibles = data?.nftModels.items
  const modelIds = []
  collectibles?.forEach((currentModel) => {
    modelIds.push(currentModel.id)
  })

  return (
    <AppLayout>
      <SectionHeader ml="16" standardText="List your drops here!"/>
      {isFetching && (
        <Center>
          <Spinner mt="16" color="white" size="lg" />
        </Center>
      )}
      {modelIds.length !== 0
        ? (<DropsGrid nftListings={modelIds} />)
        : (<Box textColor="white" >{modelIds}</Box>)
      }
    </AppLayout>
  )
}

export default DropsPage
