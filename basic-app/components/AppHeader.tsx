import {
  VStack,
  Heading,
  Button,
  Text,
  HStack,
  useClipboard,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { signOutUser } from "./SignOutUser";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export function AppHeader() {
  const [value, setValue] = React.useState("");
  const { onCopy } = useClipboard(value);
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    setValue(session?.authToken?.toString());
  }, [session.authToken]);

  return (
    <VStack textColor="white" mb="3vh">
      <Heading>Sample App: Logged In</Heading>
      <Text>
        User: {session?.user?.name} ({session?.user?.email})
      </Text>
      <Text> X-Niftory-API-Key: </Text>
      <Text noOfLines={3} maxW="lg">
        {process.env.NEXT_PUBLIC_API_KEY}
      </Text>
      <HStack>
        <Text>Authorization</Text>
        <Button colorScheme="gray" color="black" onClick={onCopy} size="sm">
          Copy Value
        </Button>
      </HStack>

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
