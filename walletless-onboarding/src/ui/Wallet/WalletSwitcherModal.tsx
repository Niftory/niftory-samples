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
import { Wallet, WalletType, useAppUserQuery } from "@niftory/sdk"

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
}

export const WalletSwitcherModal = ({ disclosure }: MenuModalProps) => {
  const { isOpen, onClose } = disclosure

  const [{ data, fetching: fetchingWallets, error }, reExecuteQuery] = useAppUserQuery()

  const appUser = data?.appUser

  const wallets = useMemo(
    () =>
      appUser?.wallets.sort((a, b) => {
        if (a.walletType === WalletType.Custodial) return -1
        if (b.walletType === WalletType.Custodial) return 1
        return a.address > b.address ? 1 : -1
      }),
    [appUser?.wallets]
  )

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent overflow="hidden" rounded="2xl" m="1rem" p="2rem">
        <Flex justifyContent="space-between">
          <Heading fontSize="1.4rem">Wallets</Heading>
        </Flex>
        <VStack spacing="0.2rem" mt="1rem">
          {wallets?.map((wallet) => (
            <WalletCard wallet={wallet as Wallet} key={wallet.address} />
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
              Cancel
            </Button>
          </ButtonGroup>
        </VStack>
      </ModalContent>
    </Modal>
  )
}
