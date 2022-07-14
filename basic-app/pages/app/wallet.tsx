import { Box, Text, VStack } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

import AppLayout from "../../components/AppLayout";
import { AppHeader } from "../../components/AppHeader";
import { useWallet } from "../../hooks/useWallet";

const Drops = () => {
  const { wallet } = useWallet();

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          {wallet && (
            <>
              <Text>Wallet Address: {wallet.address}</Text>
              <Text>Wallet State: {wallet.state} </Text>
            </>
          )}

          {!wallet && <Text>First, Setup Your Wallet!</Text>}
        </VStack>
      </Box>
    </AppLayout>
  );
};

Drops.auth = true;
export default Drops;
