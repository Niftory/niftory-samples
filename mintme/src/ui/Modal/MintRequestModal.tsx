import { Button, Flex, Modal, ModalContent, ModalOverlay, Text, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"
import posthog from "posthog-js"

interface NftModalProps {
  disclosure: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
}

export const MintRequestModal = ({ disclosure }: NftModalProps) => {
  const { isOpen, onClose } = disclosure
  const router = useRouter()
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="2rem" m="1rem">
        <Flex gap="0.5rem" flexDirection="column" alignItems="center" w="full">
          <Image src="/popper.png" alt="celebrate" height="5rem" />
          <Text
            w="full"
            textAlign="center"
            fontWeight="bold"
            whiteSpace="pre"
            fontSize="lg"
          >{`Congratulations on claiming your first NFT!\n Want to create your own free NFT?`}</Text>
          <Flex mt="0.2rem" justifyContent="center" w="full">
            <Button
              size="sm"
              autoFocus
              onClick={() => {
                router.push("/app/new-item")
                posthog.capture("CLAIM_USER_CREATES_NFT", {
                  posthogEventDetail: "User who claimed NFT creates an NFT of their own",
                })
                onClose()
              }}
            >
              Yes
            </Button>
            <Button
              ml="1rem"
              size="sm"
              onClick={() => {
                router.push("/app/collection")
                onClose()
              }}
            >
              Maybe Later
            </Button>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
