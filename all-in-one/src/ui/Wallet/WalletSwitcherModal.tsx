import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
  ButtonGroup,
} from "@chakra-ui/react"
import { RegisterWallet } from "ui/Wallet/RegisterWallet"
import { useMemo } from "react"

import { WalletCard } from "ui/Wallet/WalletCard"
import { Wallet, WalletType, useAppUserQuery } from "@niftory/sdk/react"

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
  onWalletSelect?: (walletAddress) => void
}

export const WalletSwitcherModal = (props: MenuModalProps) => {
  const { isOpen, onClose } = props.disclosure

  const [{ data, fetching: fetchingWallets, error }, reExecuteQuery] = useAppUserQuery()

  const appUser = data?.appUser

  const wallets = useMemo(
    () =>
      appUser?.wallets.sort((a, b) => {
        if (a.walletType === WalletType.Niftory) return -1
        if (b.walletType === WalletType.Niftory) return 1
        return a.address > b.address ? 1 : -1
      }),
    [appUser?.wallets]
  )

  const niftoryWallet = 
    wallets?.find(wallet => wallet.walletType === WalletType.Niftory)

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent overflow="hidden" rounded="2xl" m="1rem" p="2rem">
        <Flex justifyContent="space-between">
          <Heading fontSize="1.4rem">Select Primary Wallet</Heading>
        </Flex>
        <VStack spacing="0.2rem" mt="1rem">
          {wallets?.map((wallet) => (
            <WalletCard
              wallet={wallet as Wallet} 
              niftoryWalletAddress={niftoryWallet.address}
              key={wallet.address}
              primaryWalletAddress={appUser.primaryWallet.address}
            />
          ))}
          <ButtonGroup pt="1rem">
            <RegisterWallet onRegister={() => reExecuteQuery({ requestPolicy: "network-only" })} />
            <Button
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              fontWeight="bold"
              onClick={onClose}
              color="red"
            >
              Close
            </Button>
          </ButtonGroup>
        </VStack>
      </ModalContent>
    </Modal>
  )
}
