import {
  VStack,
  Link,
  SimpleGrid,
  Spinner,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useUserNFTs } from "../../../hooks/useUserNFTs";

const Collection = () => {
  const router = useRouter();
  const { nfts, loading } = useUserNFTs();
  return (
    <AppLayout>
      <Box mx="auto" color="white">
        <VStack>
          <AppHeader />
          <SimpleGrid>
            {nfts ? (
              nfts.map((nft) => {
                const imageUrl = nft.model?.content?.poster?.url;
                return (
                  <Link
                    key={nft.id}
                    onClick={() => router.push(`/app/collection/${nft.id}`)}
                  >
                    <VStack key={nft.id} spacing="1vh" mb="3vh">
                      <Image
                        alt={nft.model?.id}
                        src={imageUrl}
                        boxSize="20vh"
                      ></Image>
                      <Text>{nft.model?.title}</Text>
                    </VStack>
                  </Link>
                );
              })
            ) : (
              <Spinner size="lg"></Spinner>
            )}
          </SimpleGrid>
        </VStack>
      </Box>
    </AppLayout>
  );
};

Collection.auth = true;
export default Collection;
