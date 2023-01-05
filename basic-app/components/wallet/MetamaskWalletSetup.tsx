import { Button, HStack, Spinner, Text } from "@chakra-ui/react"
import { useMetaMask } from "metamask-react"
import router from "next/router"
import { useRegisterWalletMutation } from "../../generated/graphql"
import { useWalletMutation } from "../../hooks/useWalletMutation"
import { WalletSetupBox } from "./WalletSetupBox"

export const MetamaskWalletSetupBox = () => {
  const { status, connect, account, chainId, ethereum } = useMetaMask()
  const { mutate: registerWallet, error, isLoading } = useWalletMutation(useRegisterWalletMutation)

  switch (status) {
    case "initializing":
      return <div>Initializing wallet...</div>
    case "unavailable":
      return (
        <Text>
          MetaMask not available{" "}
          <Button
            as="a"
            href="https://metamask.io/download/"
            target="_blank"
            colorScheme="blue"
            variant="link"
            fontSize="1.1rem"
          >
            Download
          </Button>
        </Text>
      )
    case "connecting":
      return (
        <HStack>
          <Spinner />
          <Text>Connecting to MetaMask...</Text>
        </HStack>
      )
    case "notConnected":
      return (
        <Button
          onClick={async () => {
            const wallets = await connect()
            if (wallets.length > 0) {
              registerWallet({ address: wallets[0] })
            }
          }}
          colorScheme="blue"
        >
          Connect to MetaMask
        </Button>
      )

    case "connected":
      return (
        <WalletSetupBox
          text={`You're all set up! Your wallet address is ${account}`}
          buttonText="Go to Drops"
          isLoading={false}
          error={null}
          onClick={() => router.push("/app/drops")}
        />
      )
  }

  return null
}
