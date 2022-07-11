import { Box, Heading, Text, VStack } from "@chakra-ui/react";

import AppLayout from "../../../components/AppLayout";
import { useUser } from "../../../hooks/useUser";

const Collectibles = () => {
  const { user, session, loading, error } = useUser();

  console.log(JSON.stringify(user));

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <Heading>Sample App: Logged In</Heading>
          <Text> Name: {session?.user?.name} </Text>
          <Text> Email: {session?.user?.email} </Text>
        </VStack>
      </Box>
    </AppLayout>
  );
};

export default Collectibles;
