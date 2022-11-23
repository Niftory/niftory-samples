import { Box, Center, IconButton, Tooltip, useDisclosure } from "@chakra-ui/react"
import {
  GetNftSetsQuery,
  Nft,
  NftBlockchainState,
  NftDocument,
  NftModel,
  NftModelBlockchainState,
  NftQuery,
  NftQueryVariables,
} from "../../../generated/graphql"
import { FaEllipsisH as EllipsisIcon } from "react-icons/fa"
import { TfiReload as ReloadIcon } from "react-icons/tfi"
import { BsCheck2 as CheckIcon } from "react-icons/bs"
import { BiEdit as EditIcon } from "react-icons/bi"
import { MdOutlineErrorOutline as ErrorIcon } from "react-icons/md"
import { MenuModal, MenuModalItems } from "../Modal/MenuModal"
import { DetailModal } from "../Modal/DetailModal"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useBackendClient } from "../../graphql/backendClient"
import { useRouter } from "next/router"
import { ShareModal } from "../Modal/ShareModel"
import { useTransfer } from "../../hooks/useTransfer"
import { EmbedModal } from "../Modal/EmbedModal"
import { MediaBox } from "../MediaBox"
import { OperationContext } from "urql"
import { backOff } from "exponential-backoff"
import { getClientFromSession } from "../../graphql/getClientFromSession"
import { getReadableStateValue } from "utils/mint"

interface MasonryCardProps {
  nftModel: NftModel
  nft?: Nft
  reExecuteQuery?: (opts?: Partial<OperationContext>) => void
  hidePopUp?: boolean
}

export const IconTable = {
  UNMINTED: <EditIcon size={20} />,
  MINTING: <ReloadIcon />,
  MINTED: <CheckIcon />,
  COMPLETED: <CheckIcon />,
  TRANSFERRED: <CheckIcon />,
  ERROR: <ErrorIcon size="25" />,
}

export const MasonryCard = ({ nftModel, reExecuteQuery, hidePopUp, nft }: MasonryCardProps) => {
  const disclosure = useDisclosure()
  const detailDisclosure = useDisclosure()
  const shareDisclosure = useDisclosure()
  const embedDisclosure = useDisclosure()
  const { onOpen } = disclosure
  const { onOpen: onDetailOpen } = detailDisclosure

  const [isHovered, setIsHovered] = useState(false)

  const { session } = useAuthContext()
  const router = useRouter()
  const { transferNFTModel } = useTransfer()
  const [shareMode, setShareMode] = useState<string>("view")

  const { sets: userSets } = useBackendClient<GetNftSetsQuery>(session ? "getNFTSets" : null)

  const setIds = userSets?.map((item) => item.id)
  const isOwner = setIds?.includes(nftModel?.set?.id)

  const [mintState, setMintState] = useState(nft ? nft?.blockchainState : nftModel?.state)

  const items: MenuModalItems[] = useMemo(
    () =>
      [
        {
          title: "Share",
          onClick: () => {
            shareDisclosure.onOpen()
          },
        },
        {
          title: "Embed",
          onClick: () => {
            embedDisclosure.onOpen()
          },
        },

        nftModel?.state === "UNMINTED" && {
          title: "Transfer to Wallet",
          onClick: async () => {
            const { id } = await transferNFTModel(nftModel?.id, session)
            router.push(`/app/collection?open=${id}`)
          },
        },
      ].filter(Boolean),
    [nftModel?.id, nftModel?.state, reExecuteQuery, session, shareDisclosure, transferNFTModel]
  )

  const file = nftModel?.content?.files?.[0]
  const poster = nftModel?.content?.poster

  const handleMinting = useCallback(async () => {
    if (
      session &&
      nft &&
      [NftBlockchainState.Unminted, NftBlockchainState.Minting].includes(nft.blockchainState)
    ) {
      setMintState(NftBlockchainState.Minting)
      backOff(async () => {
        const client = await getClientFromSession(session)

        const { nft: nftResponse } = await client.request<NftQuery, NftQueryVariables>(
          NftDocument,
          {
            id: nft.id,
          }
        )
        if (
          ![NftBlockchainState.Transferred, NftBlockchainState.Minted].includes(
            nftResponse.blockchainState
          )
        ) {
          throw new Error("Not Minted")
        }
        reExecuteQuery?.({ requestPolicy: "cache-and-network" })
        setMintState(NftBlockchainState.Minted)
        return true
      })
    }
  }, [nft, session])

  useEffect(() => {
    handleMinting()
  }, [handleMinting])

  return (
    <>
      {items.length > 0 && <MenuModal disclosure={disclosure} items={items} />}

      <DetailModal
        disclosure={detailDisclosure}
        nftModel={nftModel}
        nft={nft}
        reExecuteQuery={reExecuteQuery}
        onShare={(mode) => {
          setShareMode(mode)
          shareDisclosure.onOpen()
        }}
        isOwner={isOwner}
        mintState={mintState}
      />
      <ShareModal
        isOwner={isOwner}
        disclosure={shareDisclosure}
        nftModel={nftModel}
        nft={nft}
        initialMode={shareMode}
        mode={shareMode}
        setMode={setShareMode}
      />
      <EmbedModal disclosure={embedDisclosure} nftModel={nftModel} nft={nft} />
      <Box
        key={nftModel?.id}
        rounded="2xl"
        overflow="hidden"
        position="relative"
        cursor="pointer"
        shadow="base"
        onClick={onDetailOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!hidePopUp && items.length > 0 && isHovered && (
          <IconButton
            top="8px"
            position="absolute"
            right="8px"
            rounded="full"
            shadow="md"
            background="white"
            aria-label="options"
            zIndex={1}
            icon={<EllipsisIcon />}
            onClick={(e) => {
              e.stopPropagation()
              onOpen()
            }}
          />
        )}
        {isHovered && (
          <Box
            position={"absolute"}
            top="0"
            right="0"
            bottom="0"
            left="0"
            bgColor="brand.400"
            opacity={0.2}
          />
        )}
        <MediaBox
          file={file}
          poster={poster}
          background="content.400"
          alt={nftModel?.title}
          draggable="false"
          minH="100px"
        />

        <Tooltip label={getReadableStateValue(mintState)} hasArrow placement="top">
          <Center
            rounded="full"
            position="absolute"
            bottom="8px"
            right="8px"
            bg="white"
            h="40px"
            w="40px"
          >
            {IconTable[mintState]}
          </Center>
        </Tooltip>
      </Box>
    </>
  )
}
