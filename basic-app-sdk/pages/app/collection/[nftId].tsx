import { Heading, Text, Image } from "@chakra-ui/react"
import { useNftQuery } from "@niftory/sdk/react"
import { useRouter } from "next/router"

import AppLayout from "../../../components/AppLayout"
import { ComponentWithAuth } from "../../../components/ComponentWithAuth"

const NftPage: ComponentWithAuth = () => {
  const router = useRouter()
  const nftId = router.query["nftId"]?.toString()

  const [{ data }] = useNftQuery({ variables: { id: nftId } })

  const nft = data?.nft
  const model = nft?.model

  return (
    <AppLayout>
      {model && (
        <>
          <Image
            alt={nft.model?.title}
            src={nft.model?.content?.poster?.url}
            boxSize="20vh"
          ></Image>
          <Heading>{model.title}</Heading>
          <Text>{model.description}</Text>
          <Text>
            {nft.blockchainId == null
              ? "Blockchain State: Not yet minted."
              : `Blockchain State: ID=${nft.blockchainId}, Serial=${nft.serialNumber}`}
          </Text>
        </>
      )}
    </AppLayout>
  )
}

NftPage.requireAuth = true
export default NftPage
