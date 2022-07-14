import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useUserNFTs } from "../../../hooks/useUserNFTs";

const Collection = () => {
  const { nfts, loading } = useUserNFTs();

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          <SimpleGrid>
            {nfts?.map((nft) => (
              <Box key={nft.id}>
                <Link>{nft.model?.title}</Link>
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
