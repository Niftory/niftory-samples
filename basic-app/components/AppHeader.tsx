import { VStack, Heading, Button, Text, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { signOutUser } from "./SignOutUser";
import { useSession } from "next-auth/react";

export function AppHeader() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <VStack textColor="white" mb = '3vh'>
      <Heading>Sample App: Logged In</Heading>
      <Text> Name: {session?.user?.name} </Text>
      <Text> Email: {session?.user?.email} </Text>
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
