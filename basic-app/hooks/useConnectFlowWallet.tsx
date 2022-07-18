import * as fcl from "@onflow/fcl";
import { useCallback, useEffect, useState } from "react";
import { gql, useMutation } from "urql";
import {
  ReadyWalletDocument,
  RegisterWalletDocument,
  VerifyWalletDocument,
} from "../generated/graphql";
import {
  isInitializedScript,
  resetAccountTx,
  setupAccountTx,
} from "../lib/flow-scripts";
import { useFlowUser } from "./useFlowUser";

import { useWallet } from "./useWallet";

//#region Public APIs
gql`
  mutation registerWallet($address: String!) {
    registerWallet(address: $address) {
      id
      address
      verificationCode
      state
    }
  }
`;

gql`
  mutation verifyWallet($address: String!, $signedVerificationCode: JSON!) {
    verifyWallet(
      address: $address
      signedVerificationCode: $signedVerificationCode
    ) {
      id
      address
      state
    }
  }
`;

gql`
  mutation readyWallet($address: String!) {
    readyWallet(address: $address) {
      id
      address
      state
    }
  }
`;
//#endregion

export const useConnectFlowWallet = () => {
  const { flowUser, loading: flowUserLoading } = useFlowUser();

  const {
    wallet,
    refetch: refetchWallet,
    fetching: fetchingWallet,
    error: errorFetchingWallet,
  } = useWallet();

  const [initializingFlowAccount, setInitializingFlowAccount] = useState(false);
  const [updatingDatabase, setUpdatingDatabase] = useState(false);
  const [error, setError] = useState<Error | undefined>(errorFetchingWallet);

  const isLoading =
    flowUserLoading ||
    fetchingWallet ||
    initializingFlowAccount ||
    updatingDatabase;

  const [, executeCreateWalletMutation] = useMutation(RegisterWalletDocument);

  const createWallet = useCallback(
    async () => {
      console.log("registerWallet");
      try {
        return await executeCreateWalletMutation({
          address: flowUser?.addr as string,
        });
      } catch (e) {
        setError(e as Error);
        fcl.unauthenticate();
      }
    },
    // Don't add executeCreateWalletMutation here, it refreshes super often. Yes, it's fine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [flowUser]
  );

  // Create a callback used to check if the user's flow account has been initialized
  const isFlowAccountInitialized = useCallback(async () => {
    if (!flowUser?.loggedIn) {
      return false;
    }

    try {
      const result = await fcl.query({
        cadence: isInitializedScript,
        args: (arg, t) => [fcl.arg(flowUser.addr, t.Address)],
      });

      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      return false;
    }
  }, [flowUser?.addr, flowUser?.loggedIn]);

  // Create a callback that marks the current wallet as initialized
  const [, markWalletInitializedMutation] = useMutation(ReadyWalletDocument);

  const markWalletInitialized = useCallback(async () => {
    console.log("readyWallet");
    if (!wallet?.id) {
      throw Error("Wallet not created yet");
    }

    return await markWalletInitializedMutation({ address: wallet.address });
    // Don't add markWalletInitializedMutation here, it refreshes super often. Yes, it's fine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.id]);

  // Create a callback that verifies current wallet by signing the verification code
  const [, verifyWalletMutation] = useMutation(VerifyWalletDocument);

  const verifyWallet = useCallback(async () => {
    console.log("verifyWallet", wallet);
    if (!wallet?.id) {
      throw Error("Wallet not created yet");
    }

    if (!wallet.verificationCode) {
      throw Error("Verification code not available");
    }

    const signature = await fcl.currentUser.signUserMessage(
      wallet.verificationCode
    );
    console.log(signature);

    return await verifyWalletMutation({
      address: wallet.address,
      signedVerificationCode: signature,
    });
    // Don't add verifyWalletMutation here, it refreshes super often. Yes, it's fine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.id, wallet?.verificationCode]);

  // Create a callback that initalizes the current user's flow account, and logs them in if necessary
  const initializeFlowAccount = useCallback(async () => {
    console.log("initializeFlowAccount");
    setInitializingFlowAccount(true);
    try {
      if (!flowUser?.loggedIn || !wallet) {
        fcl.logIn();
        return;
      }

      if (wallet.state === "UNVERIFIED") {
        await verifyWallet();
        return;
      }

      const txId = await fcl.mutate({
        cadence: setupAccountTx,
        limit: 9999,
      });
      console.log(`waiting for transaction ${txId} to be sealed`);

      await fcl.tx(txId).onceSealed();
      console.log(`transaction ${txId} sealed`);
    } finally {
      setInitializingFlowAccount(false);
    }
    // we don't need the full wallet here, just !wallet, which is covered by wallet?.state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowUser?.loggedIn, verifyWallet, wallet?.state]);

  /* Create a callback that resets the current user's flow account, and logs them in if necessary */
  const resetFlowAccount = useCallback(async () => {
    console.log("resetFlowAccount");
    setInitializingFlowAccount(true);
    try {
      if (!flowUser?.loggedIn) {
        return;
      }

      const txId = await fcl.mutate({
        cadence: resetAccountTx,
        limit: 9999,
      });
      console.log(`waiting for transaction ${txId} to be sealed`);
      await fcl.tx(txId).onceSealed();
      console.log(`transaction ${txId} sealed`);

      fcl.unauthenticate();
    } finally {
      setInitializingFlowAccount(false);
    }
  }, [flowUser?.loggedIn]);

  // Responds to updates from flow
  useEffect(() => {
    async function fetchData() {
      console.log("fetchData");
      if (initializingFlowAccount) {
        return;
      }

      if (!wallet?.address) {
        if (flowUser?.loggedIn) {
          setUpdatingDatabase(true);
          await createWallet();
          setUpdatingDatabase(false);
        }
      } else if (wallet.state === "VERIFIED") {
        if (await isFlowAccountInitialized()) {
          setUpdatingDatabase(true);
          await markWalletInitialized();
          setUpdatingDatabase(false);
        }
      }
    }

    fetchData();
  }, [
    wallet,
    createWallet,
    isFlowAccountInitialized,
    markWalletInitialized,
    flowUser?.loggedIn,
    initializingFlowAccount,
  ]);

  // Respond to database updates
  useEffect(() => {
    if (updatingDatabase) {
      return;
    }

    refetchWallet({ requestPolicy: "network-only" });
  }, [updatingDatabase, flowUser, refetchWallet]);

  return {
    wallet,
    error,
    isLoading,
    initializeFlowAccount,
    resetFlowAccount,
  };
};
