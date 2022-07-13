import { Box, Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

import AppLayout from "../components/AppLayout";
import { LoginSkeleton } from "../components/LoginSkeleton";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const signInOrRedirect = async () => {
    // If the user is already signed in, redirect to the signed in home page
    if (session) {
      router.push("app/drops");
    } else {
      // Otherwise, sign in the user
      await signIn("niftory");
    }
  };

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
            onClick={() => signInOrRedirect()}
            isLoading={status === "loading"}
          >
            Start Exploring!
          </Button>
        </VStack>
      </Box>
    </AppLayout>
  );
};

export default Login;
