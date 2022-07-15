import { Box, Text, VStack } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

import AppLayout from "../../components/AppLayout";
import { AppHeader } from "../../components/AppHeader";
import { useWallet } from "../../hooks/useWallet";
import { FlowWalletSetup } from "../../components/FlowWalletSetup";

const Drops = () => {
  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          <FlowWalletSetup />
        </VStack>
      </Box>
    </AppLayout>
  );
};

Drops.auth = true;
export default Drops;
