import {
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
  useClipboard,
} from "@chakra-ui/react"
import { Nft, NftModel } from "../../../generated/graphql"
import { FiLink as LinkIcon } from "react-icons/fi"
import { CheckIcon } from "@chakra-ui/icons"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { backendClient } from "../../graphql/backendClient"
import posthog from "posthog-js"
interface NftModalProps {
  disclosure: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
  nftModel: NftModel
  nft?: Nft
  initialMode: string
  isOwner: boolean
  mode: string
  setMode: (mode: string) => void
}

export const ModeTable = {
  VIEW: "view",
  CLAIM: "claim",
}

const getBaseUrl = () => {
  const { protocol, hostname, port } = window.location ?? {}
  return `${protocol}//${hostname}${port ? `:${port}` : ""}/app/collection`
}

export const ShareModal = ({
  nftModel,
  nft,
  disclosure,
  mode,
  setMode,
  isOwner,
}: NftModalProps) => {
  const { isOpen, onClose } = disclosure

  const [shareUrl, setStateShareUrl] = useState<string>()

  const [currentToken, setCurrentToken] = useState<string>()
  const [loading, setLoading] = useState(false)

  const { onCopy, setValue, hasCopied } = useClipboard(shareUrl)

  const setShareUrl = (url) => {
    setStateShareUrl(url)
    setValue(url)
  }

  const handleModeChange = useCallback(
    async (mode) => {
      const baseUrl = `${getBaseUrl()}/${nftModel.id}`

      switch (mode) {
        case ModeTable.VIEW:
          const viewURL = `${baseUrl}${nft ? `?nftId=${nft.id}` : ""}`
          setShareUrl(viewURL)
          setMode(ModeTable.VIEW)
          break
        case ModeTable.CLAIM:
          if (!currentToken) {
            setLoading(true)
            const { token } = await backendClient("generateShareToken", { id: nftModel?.id })
            setCurrentToken(token as string)
            setShareUrl(`${baseUrl}?token=${token}`)
            setLoading(false)
          } else {
            setShareUrl(`${baseUrl}?token=${currentToken}`)
          }

          setMode(ModeTable.CLAIM)
          break
      }
    },
    [currentToken, nftModel.id]
  )

  useEffect(() => {
    handleModeChange(mode)
  }, [handleModeChange, mode])

  const handleCopy = () => {
    onCopy()
    if (loading) return
    if (mode === ModeTable.CLAIM) {
      backendClient("updateNFTModel", {
        data: {
          attributes: {
            claimable: true,
          },
        },
        updateNftModelId: nftModel.id,
      })
      posthog.capture("NFT_SHARE_CLAIM_LINK", {
        posthogEventDetail: "Share claim link",
        nftModel: nftModel,
      })
      return
    }
    posthog.capture("NFT_SHARE_VIEW_LINK", {
      posthogEventDetail: "Share view link",
      nftModel: nftModel,
    })
  }

  return (
    <Modal onClose={onClose} size="2xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent overflow="hidden" p={{ base: "1rem", md: "2rem" }} m="1rem">
        <Flex gap="0.5rem" flexDirection="column" alignItems="flex-start" w="full">
          <Heading fontSize="22px">Share</Heading>
          <Flex gap="1rem" w="full">
            <InputGroup>
              <Input value={shareUrl} readOnly />
              <InputRightAddon onClick={handleCopy} cursor="pointer">
                {hasCopied ? <CheckIcon /> : <LinkIcon />}
              </InputRightAddon>
            </InputGroup>
          </Flex>
          <Flex justifyContent="space-between" w="full">
            <Flex alignItems="center" gap="0.5rem">
              <Text display="inline-flex" pl="2" fontSize="15px" lineHeight="1">
                Any one with the link can
              </Text>
              <Select
                disabled={!isOwner}
                width="fit-content"
                size="sm"
                rounded="lg"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value={ModeTable.VIEW}>View</option>
                <option value={ModeTable.CLAIM}>Claim NFT</option>
              </Select>
            </Flex>
            <Button
              variant="solid"
              onClick={handleCopy}
              size={{ base: "sm", md: "md" }}
              ml={{ base: "0.3rem" }}
              isLoading={loading}
            >
              {hasCopied ? "Copied" : "Copy Link"}
            </Button>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
