import { Box, Center, Spinner } from "@chakra-ui/react"
import { useNftModelsQuery, useNftModelQuery } from "@niftory/sdk/react"

import AppLayout from "../../../components/AppLayout"
import { DropsGrid } from "../../../components/drops/DropsGrid"
import { UpcomingDrop } from "../../../components/drops/UpcomingDrop"
import { SectionHeader } from "../../../ui/SectionHeader"

const DropsPage = () => {

  const [{data, fetching: isFetching}] = useNftModelsQuery()

  const nftModelList = data?.nftModels.items
  const nftModelIds = nftModelList.map((nftModel) => {nftModel.id})

  return (
    <AppLayout>
      <SectionHeader ml="16" standardText="List your drops here!"/>
      {isFetching && (
        <Center>
          <Spinner mt="16" color="white" size="lg" />
        </Center>
      )}
      {nftModelIds.length !== 0
        ? (<DropsGrid modelIds={nftModelIds} />)
        : (<Box textColor="white" >{"No collectibles available"}</Box>)
      }
    </AppLayout>
  )
}

export default DropsPage
