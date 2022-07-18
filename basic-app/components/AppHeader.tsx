import { VStack, Heading, Button, Text, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { signOutUser } from "./SignOutUser";
import { useAuthContext } from "../hooks/useAuthContext";

export function AppHeader() {
  const { user } = useAuthContext();
  const router = useRouter();

  return (
    <VStack textColor="white" mb = '3vh'>
      <Heading>Sample App: Logged In</Heading>
      <Text> Name: {user?.name} </Text>
      <Text> Email: {user?.email} </Text>
      <HStack>
        <Button
          colorScheme="blue"
          onClick={() => router.push("/app/collection")}
        >
          Collection
        </Button>
        <Button colorScheme="blue" onClick={() => router.push("/app/drops")}>
          Drops
        </Button>
        <Button colorScheme="blue" onClick={() => router.push("/app/wallet")}>
          Wallet
        </Button>
        <Button colorScheme="blue" onClick={() => signOutUser()}>
          Sign Out
        </Button>
      </HStack>
    </VStack>
  );
}
