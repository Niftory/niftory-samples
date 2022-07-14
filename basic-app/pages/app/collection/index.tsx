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
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useUserNFTs } from "../../../hooks/useUserNFTs";

const Collection = () => {
  const { user } = useAuthContext();
  const { nfts } = useUserNFTs();

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <Heading>Sample App: Logged In</Heading>
          <Text> Name: {user?.name} </Text>
          <Text> Email: {user?.email} </Text>
          <Button onClick={() => signOut()}>Sign Out</Button>
          <SimpleGrid>
            {nfts?.map((nft) => (
              <Box key={nft.id}>
                <Text>{nft.id}</Text>
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
