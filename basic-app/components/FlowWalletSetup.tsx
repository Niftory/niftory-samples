import { Box, Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { useConnectFlowWallet } from "../hooks/useConnectFlowWallet";

export function FlowWalletSetup() {
  const { wallet, isLoading, error, initializeFlowAccount, resetFlowAccount } =
    useConnectFlowWallet();
  const router = useRouter();

  if (isLoading) {
    return (
      <>
        <Box>Loading...</Box>
        <Spinner />
      </>
    );
  }
  if (error) {
    console.error(error);
    return <Box>Something went wrong. Please try again later!</Box>;
  }

  let boxText: string;
  let buttonText: string;
  let onClick = initializeFlowAccount;
  let done = false;

  if (!wallet?.address) {
    // User doesn't have a wallet yet
    boxText =
      "First, we need to create or connect to a Flow wallet. Hit the button below and follow the prompts.";
    buttonText = "Link or create your wallet";
  } else {
    switch (wallet.state) {
      case "UNVERIFIED":
        // User doesn't have a wallet yet
        boxText =
          "Step 2 is proving that the wallet is yours. Click the button below to send a secure message signed by your wallet.";
        buttonText = "Verify wallet";
        break;
      case "VERIFIED":
        boxText = `You're almost there. Now we need to configure your wallet to receive NFTs. This is the last step!`;
        buttonText = "Configure wallet";
        break;
      default:
        boxText = `You're all set up! Your wallet address is ${wallet.address}`;
        buttonText = "Go To Drops";
        onClick = async () => {
          router.push("/app/drops");
        };
        done = true;
    }
  }
  return (
    <>
      <Box maxW="xl">{boxText}</Box>
      <Button onClick={onClick} colorScheme="blue">
        {buttonText}
      </Button>
      {process.env.NODE_ENV == "development" ? (
        <Button onClick={resetFlowAccount} colorScheme="blue">
          [DEV ONLY] RESET WALLET
        </Button>
      ) : null}
    </>
  );
}
