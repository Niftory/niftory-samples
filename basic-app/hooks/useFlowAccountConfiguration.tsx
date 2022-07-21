import { useCallback, useEffect, useState } from "react";
import { useFlowUser } from "./useFlowUser";
import * as fcl from "@onflow/fcl";
import {
  isConfiguredScript,
  configureAccountTransaction,
} from "../lib/flow-scripts";

type FlowAccountConfiguration = {
  /**
   * Whether the Flow account is initialized.
   */
  configured: boolean;

  /**
   * A function to initialize the Flow account.
   */
  configure: () => Promise<void>;
};

export function useFlowAccountConfiguration(): FlowAccountConfiguration {
  const flowUser = useFlowUser();

  const [configured, setConfigured] = useState(false);
  const [configuring, setConfiguring] = useState(false);

  // A callback that runs a transaction against the user account to initialize it
  const configure = useCallback(async () => {
    try {
      setConfiguring(true);
      const txId = await fcl.mutate({
        cadence: configureAccountTransaction,
        limit: 9999,
      });

      await fcl.tx(txId).onceSealed();
    } finally {
      setConfiguring(false);
    }
  }, [setConfiguring]);

  // When configuration script completes, check if the account is initialized
  useEffect(() => {
    (async function () {
      if (configuring || !flowUser?.addr) {
        return;
      }

      const result = await fcl.query({
        cadence: isConfiguredScript,
        args: (arg, t) => [arg(flowUser?.addr, t.Address)],
      });

      setConfigured(result);
    })();
  }, [flowUser?.addr, configuring]);

  return {
    configured,
    configure,
  };
}
