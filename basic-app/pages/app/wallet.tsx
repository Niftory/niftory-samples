import { Box, VStack } from "@chakra-ui/react";

import AppLayout from "../../components/AppLayout";
import { AppHeader } from "../../components/AppHeader";
import { WalletSetupWrapper } from "../../components/wallet/WalletSetup";
import { ComponentWithAuth } from "../../components/ComponentWithAuth";

const Drops: ComponentWithAuth = () => (
  <AppLayout>
    <Box mx="auto" color="white" mt="5vh">
      <VStack>
        <AppHeader />
        <WalletSetupWrapper />
      </VStack>
    </Box>
  </AppLayout>
);

Drops.requireAuth = true;
export default Drops;
