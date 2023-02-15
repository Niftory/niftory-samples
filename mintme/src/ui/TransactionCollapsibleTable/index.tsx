import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Center,
  Flex,
  Link as ChakraLink,
  AccordionProps,
} from "@chakra-ui/react"
import { InfoPopOver } from "ui/PopOver/InfoPopOver"
import { BlockchainTransaction } from "../../../generated/graphql"

interface Props extends AccordionProps {
  transactions: BlockchainTransaction[]
  buttonPadding?: string
  contentPadding?: string
}

const TxNameTable = {
  BL_MINT_NFTS_TX: "MINT NFT",
  BL_TRANSFER_NFTS_TX: "TRANSFER NFT",
  BL_WITHDRAW_NFTS_FROM_CUSTODIAL_WALLET_TX: "WITHDRAW NFT",
}

export const TransactionCollapsibleTable = ({
  transactions,
  buttonPadding,
  contentPadding,
  ...props
}: Props) => (
  <Accordion allowToggle w="full" {...props}>
    <AccordionItem w="full" border="0" mt="-1rem">
      <AccordionButton w="full" py="1rem" p={buttonPadding}>
        <Flex
          alignItems="center"
          fontWeight="bold"
          textAlign="left"
          marginRight="auto"
          maxW={{ base: "7rem", md: "100%" }}
        >
          Blockchain Transactions
          <InfoPopOver
            placement="top"
            message="Transactions performed for this NFT in the blockchain"
          />
        </Flex>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel padding={contentPadding} bg="whitesmoke">
        <Flex py="0.5rem" flexDir="column" gap="0.5rem">
          {transactions.map((item) => (
            <Flex
              gap="0.4rem"
              as={ChakraLink}
              id="flowscan_transaction"
              p="0.1rem"
              key={item.hash}
              fontSize="0.8rem"
              href={`${process.env.NEXT_PUBLIC_FLOW_SCAN_URL}/transaction/${item.hash}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/flowscan-logo.svg" alt="flowscan" />
              {TxNameTable[item.name] ?? item.name}
            </Flex>
          ))}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
)
