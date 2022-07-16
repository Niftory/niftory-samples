import { Box, Link, SimpleGrid, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useNFTModels } from "../../../hooks/useNFTModels";

const Drops = () => {
  const router = useRouter();
  const { nftModels } = useNFTModels();

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          <SimpleGrid>
            {nftModels?.map((nftModel) => (
              <Box key={nftModel.id}>
                <Link onClick={() => router.push(`/app/drops/${nftModel.id}`)}>
                  {nftModel.title}
                </Link>{" "}
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </AppLayout>
  );
};

Drops.auth = true;
export default Drops;
