import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useClipboard,
  VStack,
} from "@chakra-ui/react"
import { Nft, NftModel } from "../../../generated/graphql"
import { FiLink as LinkIcon } from "react-icons/fi"
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { backendClient } from "../../graphql/backendClient"

interface NftModalProps {
  disclosure: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
  nftModel: NftModel
  nft?: Nft
}

export const EmbedModal = ({ nftModel, nft, disclosure }: NftModalProps) => {
  // Set protocol from client side since its not available on server
  let protocol = "https:"
  if (typeof window !== "undefined") {
    protocol = window.location.protocol
  }

  const value = `<iframe src="${protocol}//${
    process.env.NEXT_PUBLIC_VERCEL_URL
  }/app/collection/embed/${nftModel.id}${
    nft ? `?nftId=${nft.id}` : ""
  }" title="NFT powered by MintMe" height="350px" width="300px"/>`
  const { isOpen, onClose } = disclosure
  const { onCopy, hasCopied } = useClipboard(value)
  const [isPreviewVisible, setPreviewVisible] = useState(false)

  return (
    <Modal onClose={onClose} size="4xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent p={{ base: "1rem", md: "2rem" }} m="1rem">
        <VStack>
          <Heading fontSize="1.5rem">Embed NFT to your site</Heading>
          <Textarea readOnly value={value}></Textarea>

          <Accordion w="full" allowToggle p="0">
            <AccordionItem border="none">
              <AccordionButton
                onClick={() => setPreviewVisible(!isPreviewVisible)}
                display="flex"
                justifyContent="space-between"
              >
                <Heading size="sm" alignSelf={"flex-start"}>
                  {isPreviewVisible ? "Hide Preview" : "Show Preview"}
                </Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={{ sm: "none" }}>
                <Box
                  h="350px"
                  w="full"
                  as="iframe"
                  src={`${protocol}//${process.env.NEXT_PUBLIC_VERCEL_URL}/app/collection/embed/${
                    nftModel.id
                  }${nft ? `?nftId=${nft.id}` : ""}`}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Button onClick={onCopy}>{hasCopied ? "Copied" : "Copy Embed Code"}</Button>
        </VStack>
      </ModalContent>
    </Modal>
  )
}
