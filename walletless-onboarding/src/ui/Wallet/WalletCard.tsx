import { Box, Flex, Tag, Text } from "@chakra-ui/react"
import { useFlowUser } from "hooks/userFlowUser"

import { getColorFromWalletState, getReadableWalletState } from "utils/wallet"
import { Wallet } from "../../../generated/graphql"
import { WalletSwitcherButton } from "./WalletSwitcherButton"

interface Props {
  wallet: Wallet
  onClick?: () => void
}

export const WalletCard = ({ wallet, onClick }: Props) => {
  const flowUser = useFlowUser()
  return (
    <Flex
      key={wallet.address}
      w="full"
      h="70px"
      alignItems="center"
      justifyContent="space-between"
      cursor={onClick ? "pointer" : ""}
      _hover={{ bgColor: onClick ? "gray.100" : "" }}
      fontWeight="bold"
      shadow="base"
      rounded="lg"
      borderColor="gray.200"
      p="1rem"
      onClick={onClick}
    >
      <Flex flexDir="column">
        <Flex gap="0.4rem" alignItems="center">
          {wallet?.address === flowUser?.addr && (
            <Box
              height="0.7rem"
              width="0.7rem"
              bgColor="green.400"
              rounded="full"
              title="Current Wallet"
            />
          )}
          <Text color={""}>{wallet.address} </Text>{" "}
          {wallet?.walletType === "CUSTODIAL" && (
            <Tag bgColor="purple.400" color="white">
              Niftory Wallet
            </Tag>
          )}
        </Flex>
        <Flex gap="0.2rem" fontSize="0.8rem">
          Wallet State:{" "}
          {
            <Tag
              size="sm"
              fontSize="0.7rem"
              bgColor={getColorFromWalletState(wallet.state)}
              color="white"
            >
              {getReadableWalletState(wallet.state)}
            </Tag>
          }
        </Flex>
      </Flex>
      <WalletSwitcherButton wallet={wallet} />
    </Flex>
  )
}
