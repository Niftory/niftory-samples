import { Box, Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

import AppLayout from "../components/AppLayout";
import { signOutUser } from "../components/SignOutUser";
import { useCallback } from "react";

const Login = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
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
          <Button colorScheme="blue" onClick={() => signOutUser()}>
            Sign Out
          </Button>
        </VStack>
      </Box>
    </AppLayout>
  );
};

export default Login;
