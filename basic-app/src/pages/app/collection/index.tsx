import { Box, Link, SimpleGrid, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "components/AppLayout";
import { AppHeader } from "components/AppHeader";
import { useUserNFTs } from "hooks/useUserNFTs";
import { ComponentWithAuth } from "components/ComponentWithAuth";

const Collection: ComponentWithAuth = () => {
  const router = useRouter();
  const { nfts } = useUserNFTs();

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          <SimpleGrid>
            {nfts?.map(
              (nft) =>
                nft && (
                  <Box key={nft.id}>
                    <Link
                      onClick={() => router.push(`/app/collection/${nft.id}`)}
                    >
                      {nft.model?.title}
                    </Link>
                  </Box>
                )
            )}
          </SimpleGrid>
        </VStack>
      </Box>
    </AppLayout>
  );
};

Collection.requireAuth = true;
export default Collection;
