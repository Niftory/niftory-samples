import { Box, Link, SimpleGrid, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useUserNFTs } from "../../../hooks/useUserNFTs";

const Collection = () => {
  const router = useRouter();
  const { nfts, loading } = useUserNFTs();

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          <SimpleGrid>
            {nfts?.map((nft) => (
              <Box key={nft.id}>
                <Link onClick={() => router.push(`/app/collection/${nft.id}`)}>
                  {nft.model?.title}
                </Link>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </AppLayout>
  );
};

Collection.auth = true;
export default Collection;
