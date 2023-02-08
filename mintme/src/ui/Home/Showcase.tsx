import { Box, Center, Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useRef } from "react"

const LinkTable = {
  test: [
    {
      url: "https://mint.test.niftory.com/app/collection/6872680e-4746-45bf-99fb-4a01b6987eb8?nftId=1381e6aa-17b4-4c1b-8436-6c92efb0751d",
      image: "/images/ai_conference.png",
    },
    {
      url: "https://mint.test.niftory.com/app/collection/5f1e2545-0db1-453c-a6cc-63029916f043?nftId=46692d08-9564-43b8-9be0-6691d4fded6d",
      image: "/images/robotica.png",
    },

    {
      url: "https://mint.test.niftory.com/app/collection/d2856642-ef50-4708-9019-e8f0b86004c9?nftId=edb23981-8ee4-431c-9403-de049afa7efe",
      image: "/images/painting.png",
    },
  ],
  development: [
    {
      url: "https://mint.test.niftory.com/app/collection/6872680e-4746-45bf-99fb-4a01b6987eb8?nftId=1381e6aa-17b4-4c1b-8436-6c92efb0751d",
      image: "/images/ai_conference.png",
    },
    {
      url: "https://mint.test.niftory.com/app/collection/5f1e2545-0db1-453c-a6cc-63029916f043?nftId=46692d08-9564-43b8-9be0-6691d4fded6d",
      image: "/images/robotica.png",
    },

    {
      url: "https://mint.test.niftory.com/app/collection/d2856642-ef50-4708-9019-e8f0b86004c9?nftId=edb23981-8ee4-431c-9403-de049afa7efe",
      image: "/images/painting.png",
    },
  ],

  production: [
    {
      url: "https://mint.test.niftory.com/app/collection/6872680e-4746-45bf-99fb-4a01b6987eb8?nftId=1381e6aa-17b4-4c1b-8436-6c92efb0751d",
      image: "/images/ai_conference.png",
    },
    {
      url: "https://mint.test.niftory.com/app/collection/5f1e2545-0db1-453c-a6cc-63029916f043?nftId=46692d08-9564-43b8-9be0-6691d4fded6d",
      image: "/images/robotica.png",
    },
    {
      url: "https://mint.test.niftory.com/app/collection/d2856642-ef50-4708-9019-e8f0b86004c9?nftId=edb23981-8ee4-431c-9403-de049afa7efe",
      image: "/images/painting.png",
    },
  ],
}

export const Showcase = () => {
  const gridRef = useRef<HTMLDivElement>()
  return (
    <Flex flexDir="column" my={{ base: "2rem", md: "6rem" }} px="1rem">
      <Heading fontSize={{ base: "4xl", md: "5xl" }} textAlign="center" pb="1rem">
        Created With MintMe
      </Heading>
      <SimpleGrid
        minChildWidth={{ base: "full", md: "320px" }}
        spacing="2rem"
        maxW="1600px"
        mt={{ base: "1rem", md: "2rem" }}
        ref={gridRef}
      >
        {LinkTable[process.env.NEXT_PUBLIC_ENV ?? "test"].map((item) => (
          <Box
            as="a"
            href={item.url}
            target="_blank"
            key={item.url}
            background={`url("${item.image}")`}
            flex="1"
            h="320px"
            rounded="lg"
            shadow="base"
            backgroundSize="contain"
            bgColor="content.400"
            p="1rem"
            bgRepeat="no-repeat"
            bgPos="center"
            cursor="pointer"
            transition="0.3s"
            _hover={{ transform: "scale(1.01)" }}
          ></Box>
        ))}
      </SimpleGrid>
    </Flex>
  )
}
