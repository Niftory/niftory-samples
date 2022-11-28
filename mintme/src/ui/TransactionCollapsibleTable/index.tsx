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
  BoxProps,
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
  BL_MINT_NFTS_TX: "Mint NFT",
  BL_TRANSFER_NFTS_TX: "Transfer NFT",
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
        <Flex fontWeight="bold" flex="1">
          Blockchain Transactions
          <InfoPopOver
            placement="top"
            message="Transactions performed for this NFT in the blockchain"
          />
        </Flex>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel padding={contentPadding}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th pl="0">Transaction Name</Th>
                <Th pr="0">View on Flowscan</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((item) => (
                <Tr key={item.blockchainTxId} fontSize="0.9rem" borderBottom={0}>
                  <Td pl="0">{TxNameTable[item.blockchainTxName]}</Td>
                  <Td>
                    <Center
                      as="a"
                      id="flowscan_transaction"
                      href={`
                        ${process.env.NEXT_PUBLIC_FLOW_SCAN_URL}/transaction/${item.blockchainTxId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image src="/flowscan-logo.svg" alt="flowscan" />
                    </Center>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
)
