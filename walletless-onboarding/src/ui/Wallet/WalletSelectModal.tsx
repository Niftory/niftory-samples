import { Flex, Heading, Modal, ModalContent, ModalOverlay, VStack } from "@chakra-ui/react"
import { useMemo } from "react"

import { WalletCard } from "ui/Wallet/WalletCard"
import { Wallet, WalletState, useAppUserQuery } from "@niftory/sdk"

export interface MenuModalItems {
  title: string
  onClick?: () => void
}

interface MenuModalProps {
  disclosure: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
  onWalletSelect: (wallet: Wallet) => void
}

export const WalletSelectModal = ({ disclosure, onWalletSelect }: MenuModalProps) => {
  const { isOpen, onClose } = disclosure

  const [{ data }] = useAppUserQuery()

  const appUser = data?.appUser

  //  Filter out wallets that are not ready and sort to make wallets consistent order
  const wallets = useMemo(
    () =>
      appUser?.wallets
        ?.filter((wallet) => wallet.state === WalletState.Ready && wallet.walletType === "EXTERNAL")
        .sort((a, b) => {
          return a.address > b.address ? 1 : -1
        }),
    [appUser?.wallets]
  )

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent overflow="hidden" rounded="2xl" m="1rem" p="1.4rem">
        <Flex justifyContent="space-between">
          <Heading fontSize="1.4rem">Select Wallet</Heading>
        </Flex>
        <VStack spacing="0.2rem" mt="1rem">
          {wallets?.map((wallet) => (
            <WalletCard
              wallet={wallet as Wallet}
              key={wallet.address}
              onClick={() => {
                onClose()
                onWalletSelect(wallet as Wallet)
              }}
            />
          ))}
        </VStack>
      </ModalContent>
    </Modal>
  )
}
