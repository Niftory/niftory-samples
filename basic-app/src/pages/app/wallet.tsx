import { Box, VStack } from "@chakra-ui/react";

import AppLayout from "components/AppLayout";
import { AppHeader } from "components/AppHeader";
import { FlowWalletSetup } from "components/FlowWalletSetup";
import { ComponentWithAuth } from "components/ComponentWithAuth";

const Drops: ComponentWithAuth = () => (
  <AppLayout>
    <Box mx="auto" color="white" mt="5vh">
      <VStack>
        <AppHeader />
        <FlowWalletSetup />
      </VStack>
    </Box>
  </AppLayout>
);

Drops.requireAuth = true;
export default Drops;
