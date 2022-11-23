import { Center, Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useRef } from "react"
import {
  NftModel,
  NftModelBlockchainState,
  NftSetBlockchainState,
} from "../../../generated/graphql"
import { MasonryCard } from "../Card/MasonryCard"

import { BsChevronDown as ChevronDownIcon } from "react-icons/bs"

const mockNFTModels: NftModel[] = [
  {
    id: "31fe2089-b750-4ec7-86cc-4b886f1cc9a1",
    title: "X nft",
    description: "New X nft",
    quantity: 1,
    metadata: {
      Name: "X nft",
    },
    content: {
      id: "",
      files: [
        {
          contentType: "image",
          url: "/icon.png",
        } as any,
      ],
    },
    createdAt: "",
    state: NftModelBlockchainState.Minted,
    set: {
      id: "a7cae031-29bf-4b98-85c6-c10b82b3045a",
      title: "Set for Usercl9psc3kc00003rz5nrjm3eev",
      state: NftSetBlockchainState.Minted,
      createdAt: "",
    },
  },
  {
    id: "31fe2089-b750-4ec7-86cc-4b886f1cc9a2",
    title: "X nft",
    description: "New X nft",
    quantity: 12,
    metadata: {
      Name: "X nft",
    },
    createdAt: "",
    content: {
      id: "",
      files: [
        {
          contentType: "image",
          url: "/icon.png",
        } as any,
      ],
    },
    state: NftModelBlockchainState.Minted,
    set: {
      id: "a7cae031-29bf-4b98-85c6-c10b82b3045a",
      title: "Set for Usercl9psc3kc00003rz5nrjm3eev",
      state: NftSetBlockchainState.Minted,
      createdAt: "",
    },
  },
  {
    id: "31fe2089-b750-4ec7-86cc-4b886f1cc9a3",
    title: "X nft",
    description: "New X nft",

    quantity: 12,
    metadata: {
      Name: "X nft",
    },
    createdAt: "",
    content: {
      id: "",
      files: [
        {
          contentType: "image",
          url: "/icon.png",
        } as any,
      ],
    },
    state: NftModelBlockchainState.Minted,
    set: {
      id: "a7cae031-29bf-4b98-85c6-c10b82b3045a",
      title: "Set for Usercl9psc3kc00003rz5nrjm3eev",
      state: NftSetBlockchainState.Minted,
      createdAt: "",
    },
  },
]

export const Showcase = () => {
  const gridRef = useRef<HTMLDivElement>()
  return (
    <Flex flexDir="column" my={{ base: "2rem", md: "6rem" }} px="1rem">
      <Heading fontSize={{ base: "4xl", md: "5xl" }} textAlign="center" pb="1rem">
        Created With MintMe
      </Heading>
      <SimpleGrid
        minChildWidth={{ base: "full", md: "120px" }}
        spacing="2rem"
        maxW="1000px"
        mt={{ base: "1rem", md: "2rem" }}
        ref={gridRef}
      >
        {mockNFTModels.map((nftModel) => (
          <MasonryCard key={nftModel.id} nftModel={nftModel} hidePopUp />
        ))}
      </SimpleGrid>
    </Flex>
  )
}
