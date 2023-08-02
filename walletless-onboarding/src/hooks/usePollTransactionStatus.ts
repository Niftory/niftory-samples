import { BlockchainTransaction, BlockchainTransactionState, NiftoryClient } from "@niftory/sdk"
import { useEffect, useState } from "react"

const POLL_INTERVAL = 1000 // ms
const MAX_RETRIES = 10

export const usePollTransactionStatus = (
  niftoryClient: NiftoryClient,
  maxRetries = MAX_RETRIES
) => {
  const [transaction, setTransaction] = useState<BlockchainTransaction>(null)
  const [attemptNumber, setAttemptNumber] = useState(0)

  useEffect(() => {
    const getTransaction = async () => {
      if (!transaction) {
        return
      }
      const _transaction = await niftoryClient.getBlockchainTransaction(transaction)
      setAttemptNumber((prevAttemptNumber) => prevAttemptNumber + 1)
      setTransaction(_transaction)
    }

    const pollInterval = setInterval(getTransaction, POLL_INTERVAL)
    if (transaction?.result === BlockchainTransactionState.Sealed) {
      console.log(`${transaction?.name} Sealed`)
      clearInterval(pollInterval)
    }

    if (attemptNumber > maxRetries) {
      console.log(`${transaction?.name} Staled`)
      clearInterval(pollInterval)
    }
    return () => clearInterval(pollInterval)
  }, [transaction, niftoryClient, attemptNumber, maxRetries])

  const transactionState =
    transaction?.state !== BlockchainTransactionState.Sealed && attemptNumber > maxRetries
      ? "STALED"
      : transaction?.state

  return { pollTransaction: setTransaction, transactionState }
}
