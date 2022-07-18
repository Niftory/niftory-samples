import { Box, Link, SimpleGrid, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useNFTModels } from "../../../hooks/useNftModels";

const Drops = () => {
  const router = useRouter();
  const [{ data }] = useNFTModels();
  const nftModels = data?.nftModels;

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          <SimpleGrid>
            {nftModels?.map(
              (nftModel) =>
                nftModel && (
                  <Box key={nftModel.id}>
                    <Link
                      onClick={() => router.push(`/app/drops/${nftModel.id}`)}
                    >
                      {nftModel.title}
                    </Link>{" "}
                  </Box>
                )
            )}
          </SimpleGrid>
        </VStack>
      </Box>
    </AppLayout>
  );
};

Drops.auth = true;
export default Drops;
