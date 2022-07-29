import { Box, Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import AppLayout from "../components/AppLayout";
import { useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const { session, isLoading, signOut } = useAuthContext();
  const router = useRouter();

  const signInOrRedirect = useCallback(async () => {
    // If the user is already signed in, redirect to the signed in home page
    if (session) {
      await router.push("app/collection");
    } else {
      // Otherwise, sign in the user
      await signIn("niftory");
    }
  }, [session, router]);

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="30vh">
        <VStack>
          <Heading textAlign="center">Welcome to your Sample App</Heading>
          <Text textAlign="center" pt="8">
            Built with Niftory. Login to explore.
          </Text>
          <Button
            colorScheme="blue"
            onClick={signInOrRedirect}
            isLoading={isLoading}
          >
            Start Exploring!
          </Button>
          <Button colorScheme="blue" onClick={signOut}>
            Sign Out
          </Button>
        </VStack>
      </Box>
    </AppLayout>
  );
};

export default Login;
