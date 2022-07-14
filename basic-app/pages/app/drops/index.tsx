import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useNFTModels } from "../../../hooks/useNftModels";

const Drops = () => {
  const { nftModels } = useNFTModels();

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          <SimpleGrid>
            {nftModels?.map((nftModel) => (
              <Box key={nftModel.id}>
                <Text>{nftModel.title}</Text>
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
