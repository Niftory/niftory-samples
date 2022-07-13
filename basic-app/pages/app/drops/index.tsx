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

const Drops = () => {
  const { user } = useAuthContext();

  console.log(nfts);
  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <Heading>Sample App: Logged In</Heading>
          <Text> Name: {user?.name} </Text>
          <Text> Email: {user?.email} </Text>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </VStack>
        <SimpleGrid></SimpleGrid>
      </Box>
    </AppLayout>
  );
};

Drops.auth = true;
export default Drops;
