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
import { useFlowUser } from "@niftory/sdk/react"
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
}

export const WalletSwitcherModal = ({ disclosure }: MenuModalProps) => {
  const { isOpen, onClose } = disclosure

  const [response, reExecuteQuery] = useAppUserQuery()

  const appUser = response?.data?.appUser
  const wallets = useMemo(
    () =>
      appUser?.wallets.sort((a, b) => {
        if (a.walletType === WalletType.Niftory) return -1
        if (b.walletType === WalletType.Niftory) return 1
        return a.address > b.address ? 1 : -1
      }),
    [appUser?.wallets]
  )

  const flowUser = useFlowUser()

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
