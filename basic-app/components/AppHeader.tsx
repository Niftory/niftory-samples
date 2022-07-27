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

export function AppHeader() {
  const { data: session } = useSession();
  const { onCopy } = useClipboard(session?.authToken as string);
  const router = useRouter();

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
