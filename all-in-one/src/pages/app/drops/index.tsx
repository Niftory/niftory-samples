import { Box, Center, Spinner } from "@chakra-ui/react"
import { useNftModelsQuery, useNftModelQuery } from "@niftory/sdk/react"

import AppLayout from "../../../components/AppLayout"
import { SectionHeader } from "../../../ui/SectionHeader"
import { NFTModelsGrid } from "@components/drops/NFTModelsGrid"

const DropsPage = () => {

  const [{data, fetching: isFetching}] = useNftModelsQuery()

  const nftModelList = data?.nftModels.items

  return (
    <AppLayout>
      <SectionHeader ml="16" standardText="List your drops here!"/>
      {isFetching && (
        <Center>
          <Spinner mt="16" color="white" size="lg" />
        </Center>
      )}
      {nftModelList.length !== 0
        ? (<NFTModelsGrid nftModels={nftModelList} />)
        : (<Box textColor="white" >{"No collectibles available"}</Box>)
      }
    </AppLayout>
  )
}

export default DropsPage
