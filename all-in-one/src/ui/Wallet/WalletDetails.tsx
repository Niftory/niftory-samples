import React from "react"
import {
  SimpleGrid,
  Spinner,
  Button,
  Tooltip,
  Box,
  Center,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import {
  FiTool as WalletStatusIcon,
  FiPackage as WalletItemsIcon,
  FiAlertCircle as WalletDetailsIcon,
  FiUserCheck as WalletOwnerIcon,
} from "react-icons/fi"
import { backendClient } from "../../graphql/backendClient"
import { WalletGridBox } from "./WalletGridBox"
import { WalletSwitcherModal } from "./WalletSwitcherModal"
import { WalletState } from "@niftory/sdk/react"
export interface WalletDetailsProps {
  walletAddress: string
  walletStatus: string
  walletItems: number
  isLoading: boolean
  walletOwnerEmail: string
}

export const WalletDetails = (props: WalletDetailsProps) => {
  const { walletItems, walletAddress, walletStatus, walletOwnerEmail, isLoading } = props
  const disclosure = useDisclosure()

  return (
    <>
      {isLoading ? (
        <Center w="full">
          <Spinner size="lg" />
        </Center>
      ) : (
        <>
          <WalletSwitcherModal
            disclosure={disclosure}
            
          />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4" minW={"280px"} p="1rem">
            <Tooltip label="View wallet on flowview" hasArrow placement="top">
              <Box cursor="pointer">
                <WalletGridBox
                  description={walletAddress}
                  icon={WalletDetailsIcon}
                  title={"Primary Wallet Address"}
                  onClick={() => {
                    const url = `${process.env.NEXT_PUBLIC_FLOW_VIEW_URL}/${walletAddress}/collection/`
                    window.open(url)
                  }}
                />
              </Box>
            </Tooltip>
            <WalletGridBox description={walletStatus} icon={WalletStatusIcon} title={"Status"} />
            <Tooltip label="Number of NFTs you own in this Wallet" hasArrow placement="top">
              <Box>
                <WalletGridBox
                  description={walletItems ?? "0"}
                  icon={WalletItemsIcon}
                  title={"Number of Items"}
                />
              </Box>
            </Tooltip>

            <WalletGridBox
              description={walletOwnerEmail}
              icon={WalletOwnerIcon}
              title={"Wallet Owner"}
              showTooltop
            />
          </SimpleGrid>
          <VStack>
            <Button
              backgroundColor="brand.400"
              onClick={() => {
                disclosure.onOpen()
              }}
            >
              Switch or Add Wallet
            </Button>
            {walletStatus != WalletState.Ready ? (
              <Button
                p="6"
                backgroundColor="brand.400"
                fontSize="md"
                onClick={() => backendClient("createWallet")}
              >
                Retry Wallet Creation
              </Button>
            ) : null}
          </VStack>
        </>
      )}
    </>
  )
}
