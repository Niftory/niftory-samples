import { useCallback, useEffect, useState } from "react"

import * as fcl from "@onflow/fcl"
import { useFlowUser } from "./userFlowUser"
import { useContractCadence } from "./useContractCadence"

type FlowAccountConfiguration = {
  /**
   * Whether the Flow account is initialized.
   */
  configured: boolean

  /**
   * A function to initialize the Flow account.
   */
  configure: () => Promise<void>

  /**
   * True if the contract data is still loading.
   */
  isLoading: boolean
}

export function useFlowAccountConfiguration(): FlowAccountConfiguration {
  const flowUser = useFlowUser()

  const [configured, setConfigured] = useState(false)
  const [isConfiguring, setIsConfiguring] = useState(false)

  const {
    isAccountConfigured_script,
    configureAccount_transaction,
    isLoading: isContractLoading,
  } = useContractCadence()

  // A callback that runs a transaction against the user account to initialize it
  const configure = useCallback(async () => {
    try {
      setIsConfiguring(true)
      const txId = await fcl.mutate({
        cadence: configureAccount_transaction,
        limit: 9999,
      })

      await fcl.tx(txId).onceSealed()
    } finally {
      setIsConfiguring(false)
    }
  }, [configureAccount_transaction])

  // When configuration transaction completes, check if the account is configured
  useEffect(() => {
    ;(async function () {
      if (isConfiguring || !flowUser?.addr || !isAccountConfigured_script) {
        return
      }

      const result = await fcl.query({
        cadence: isAccountConfigured_script,
        args: (arg, t) => [arg(flowUser.addr, t.Address)],
      })

      setConfigured(result)
    })()
  }, [flowUser?.addr, isConfiguring, isAccountConfigured_script])

  const isLoading = isContractLoading || isConfiguring

  return {
    configured,
    configure,
    isLoading,
  }
}
