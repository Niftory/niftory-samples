import {
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
  Text,
  HStack,
  Box,
  Center,
  IconButton,
  Input,
  Textarea,
  Button,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react"
import {
  ContractDocument,
  ContractQuery,
  ContractQueryVariables,
  Nft,
  NftBlockchainState,
  NftModel,
  NftModelBlockchainState,
} from "../../../generated/graphql"
import { TbSend as SendIcon, TbShare as ShareIcon } from "react-icons/tb"
import { BsFileEarmarkCode as ContractIcon } from "react-icons/bs"
import { IconTable } from "../Card/MasonryCard"
import { CheckIcon, EditIcon } from "@chakra-ui/icons"
import { Field, FieldArray, Form, Formik } from "formik"
import { backendClient } from "../../graphql/backendClient"
import { MetadataForm, metadataToJson } from "../../components/form/MetadataForm"
import { useEffect, useMemo, useState } from "react"
import { InfoPopOver } from "../PopOver/InfoPopOver"
import { useTransfer } from "../../hooks/useTransfer"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useRouter } from "next/router"
import { FileType, FileUploadField } from "../../components/form/FileUploadField"
import { OperationContext } from "urql"
import { AlertModal } from "./AlertModal"
import { useGraphQLQuery } from "../../graphql/useGraphQLQuery"
import { Step, Steps } from "intro.js-react"
import { getContractUrl } from "../../utils/contract"
import posthog from "posthog-js"
import { TransactionCollapsibleTable } from "ui/TransactionCollapsibleTable"

type Disclosure = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
interface DetailModalProps {
  disclosure: Disclosure

  nftModel: NftModel
  nft?: Nft
  reExecuteQuery?: (opts?: Partial<OperationContext>) => void
  onShare?: (type: string) => void
  isOwner: boolean
  mintState: NftModelBlockchainState | NftBlockchainState
}

export const DetailModal = ({
  nftModel,
  nft,
  disclosure,
  reExecuteQuery,
  onShare,
  isOwner,
  mintState,
}: DetailModalProps) => {
  const { isOpen, onClose, onOpen } = disclosure
  const alertDisclosure = useDisclosure()

  const [editMode, setEditMode] = useState(false)
  const [propertiesEditMode, setPropertiesEditMode] = useState(false)
  const [supplyEditMode, setSupplyEditMode] = useState(false)
  const [currentNFTModel, setCurrentNftModel] = useState(nftModel)
  const [showIntro, setShowIntro] = useState(true)
  const metaDataList = Object.keys(nftModel.metadata ?? {})

  const isEditable = mintState === NftModelBlockchainState.Unminted && isOwner

  const { transferNFTModel, isLoading: isTransferLoading } = useTransfer()
  const { session } = useAuthContext()
  const router = useRouter()

  const { contract } = useGraphQLQuery<ContractQuery, ContractQueryVariables>({
    query: ContractDocument,
  })

  const handleMint = async () => {
    const { id } = await transferNFTModel(nftModel.id, session)
    posthog.capture("NFT_MINT_FROM_DRAFT", {
      posthogEventDetail: "Mint (from Draft)",
      nftModel: nftModel,
      nftId: id,
    })
    router.push(`/app/collection?open=${id}`)
  }
  const handleDelete = async () => {
    await backendClient("deleteNFTModel", { id: nftModel.id })
    reExecuteQuery?.()
  }

  const getBaseUrl = (url) => {
    if (!url?.trim()) return
    const baseUrl = new URL(url)
    baseUrl.hash = ""
    baseUrl.search = ""
    return baseUrl.toString()
  }

  const file = currentNFTModel.content?.files?.[0]
  if (!mintState) {
    mintState = nftModel.state
  }

  useEffect(() => {
    if (
      router?.query?.open &&
      (router?.query?.open === nftModel?.id || router.query.open === nft?.id)
    ) {
      onOpen()
      router.replace(router.pathname, undefined, { shallow: true })
    }
  }, [nft?.id, nftModel?.id, onOpen, router?.query?.open])

  useEffect(() => {
    const seenShareIntro = localStorage.getItem("SEEN_SHARE_INTRO")
    const isMinted =
      mintState === NftModelBlockchainState.Minted || mintState === NftBlockchainState.Transferred
    setShowIntro(!seenShareIntro && isOpen && isMinted)
  }, [isEditable, isOpen, isOwner, mintState])

  const steps: Step[] = [
    isOwner && {
      element: "#claim",
      intro: <Text>Click here to share your NFT with a claimable link</Text>,
    },
    {
      element: "#view",
      intro: <Text>Click here to share your NFT with a view only link</Text>,
    },
    // TODO: use after nft resolvers
    // {
    //   intro: <Text>Click here to view your NFT mint transaction on flowscan</Text>,
    //   element: "#flowscan_transaction",
    // },
    {
      intro: <Text>Click here to view your NFT contract on flowscan</Text>,
      element: "#flowscan_contract",
    },
  ].filter(Boolean)

  const handleExit = () => {
    setShowIntro(false)
    localStorage.setItem("SEEN_SHARE_INTRO", "true")
  }

  return (
    <Modal onClose={onClose} size="4xl" isOpen={isOpen} isCentered>
      <Steps
        enabled={showIntro}
        steps={steps}
        initialStep={0}
        onComplete={handleExit}
        options={{ hideNext: false, showBullets: false, tooltipClass: "intro-tooltip" }}
        onExit={handleExit}
      />
      <ModalOverlay />
      <ModalContent overflow="hidden" rounded="none" m="1rem">
        <AlertModal
          disclosure={alertDisclosure}
          title="Delete Template?"
          message="Are you sure you want to delete this template?"
          acceptText="Delete"
          onAccept={handleDelete}
        />
        <Formik
          initialValues={{
            title: currentNFTModel?.title,
            description: currentNFTModel?.description,
            metadata:
              metaDataList?.map((item) => {
                return {
                  key: item,
                  val: currentNFTModel?.metadata[item],
                }
              }) ?? [],
            quantity: currentNFTModel?.quantity,
          }}
          enableReinitialize
          onSubmit={async (data, actions) => {
            actions.setSubmitting(true)
            const updateData = { ...data }

            updateData.metadata = metadataToJson(
              data.metadata.filter((item) => item.key && item.val)
            )
            await backendClient("updateNFTModel", {
              data: updateData,
              updateNftModelId: currentNFTModel.id,
            })

            posthog.capture("NFT_EDIT_METADATA", {
              posthogEventDetail: "Edited NFT metadata",
              updateData,
            })

            setEditMode(false)
            setPropertiesEditMode(false)
            setSupplyEditMode(false)
            actions.setSubmitting(false)
            reExecuteQuery?.({ requestPolicy: "cache-and-network" })
          }}
        >
          {({ values, submitForm, isSubmitting, setFieldValue }) => (
            <Form>
              <Flex direction={{ base: "column", md: "row" }} minH="500px">
                <Box width={{ base: "100%", md: "50%" }} position="relative" bgColor="content.400">
                  <FileUploadField
                    initialFilePreview={{
                      type: file?.contentType?.split("/")?.[0] as FileType,
                      url: file?.url,
                    }}
                    setLoading={() => {}}
                    onUpload={(content) => {
                      setFieldValue("contentId", content.id)
                      content.files[0].url = getBaseUrl(content.files[0].url)
                      setCurrentNftModel({
                        ...currentNFTModel,
                        content: content,
                      })
                      // submit next frame
                      setTimeout(() => submitForm(), 100)
                    }}
                    accept={{
                      "image/png": [],
                      "image/jpg": [],
                      "image/jpeg": [],
                      "image/heif": [],
                      "image/webp": [],
                      "video/*": [],
                    }}
                    h="100%"
                    disabled={!isEditable}
                    bgColor="content.400"
                  >
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
                  </FileUploadField>
                </Box>
                <VStack
                  spacing="1rem"
                  width={{ base: "100%", md: "50%" }}
                  maxH="500px"
                  overflow="auto"
                  alignItems="flex-start"
                  mb="1rem"
                >
                  <>
                    <VStack
                      p="3rem 3rem 1rem 3rem"
                      borderBottom={"2px"}
                      borderColor={"brand.300"}
                      alignItems="flex-start"
                      w="full"
                      fontSize="16px"
                    >
                      <HStack alignItems="center" justifyContent="space-between" w="full">
                        <Flex fontWeight="bold" fontSize="16px">
                          <Field name="title">
                            {({ form, field }) => (
                              <>
                                {editMode ? (
                                  <>
                                    <Input size="sm" name="title" placeholder="Title" {...field} />
                                    <IconButton
                                      aria-label="save"
                                      ml="0.5rem"
                                      size="sm"
                                      type="submit"
                                      onClick={() => {
                                        form.submitForm()
                                      }}
                                      icon={<CheckIcon />}
                                      isLoading={form.isSubmitting}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Text mt="0.3rem">{field.value}</Text>
                                    {isEditable && (
                                      <IconButton
                                        aria-label="edit"
                                        ml="0.5rem"
                                        size="sm"
                                        type="button"
                                        onClick={(e) => {
                                          setEditMode(true)
                                          e.stopPropagation()
                                          e.preventDefault()
                                        }}
                                        icon={<EditIcon />}
                                      />
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </Field>
                        </Flex>

                        <HStack minW="fit-content" color="content.400">
                          {nftModel.state === NftModelBlockchainState.Minted && (
                            <>
                              {isOwner && (
                                <Tooltip label="Share Claim URL" hasArrow placement="top">
                                  <span>
                                    <SendIcon
                                      id="claim"
                                      cursor="pointer"
                                      size="20px"
                                      onClick={() => onShare("claim")}
                                    />
                                  </span>
                                </Tooltip>
                              )}

                              <Tooltip label="Share View URL" hasArrow placement="top">
                                <span>
                                  <ShareIcon
                                    id="view"
                                    cursor="pointer"
                                    size="20px"
                                    onClick={() => onShare("view")}
                                  />
                                </span>
                              </Tooltip>

                              {contract && (
                                <Tooltip label="View Contract" hasArrow placement="top">
                                  <a
                                    id="flowscan_contract"
                                    href={getContractUrl(contract)}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() =>
                                      posthog.capture("NFT_VIEW_CONTRACT", {
                                        posthogEventDetail: "View Contract called",
                                        url: getContractUrl(contract),
                                      })
                                    }
                                  >
                                    <ContractIcon size="20px" />
                                  </a>
                                </Tooltip>
                              )}
                            </>
                          )}
                        </HStack>
                      </HStack>
                      <Text m="0" w="full" whiteSpace={"pre-wrap"}>
                        <Field name="description">
                          {({ field }) => (
                            <>
                              {editMode ? (
                                <Textarea name="description" placeholder="Description" {...field} />
                              ) : (
                                <Text>{field.value}</Text>
                              )}
                            </>
                          )}
                        </Field>
                      </Text>
                    </VStack>

                    {(values?.metadata?.length > 0 || isEditable) && (
                      <Flex
                        direction="column"
                        p="0rem 0 1rem 3rem"
                        borderBottom={"2px"}
                        borderColor={"brand.300"}
                        alignItems="flex-start"
                        w="full"
                      >
                        <Flex alignItems="center" mb="0.4rem">
                          <Text fontWeight="bold" fontSize="16px">
                            Properties
                            {propertiesEditMode ? (
                              <IconButton
                                aria-label="edit"
                                ml="0.5rem"
                                size="sm"
                                type="submit"
                                onClick={() => {
                                  submitForm()
                                }}
                                icon={<CheckIcon />}
                                isLoading={isSubmitting}
                              />
                            ) : (
                              isEditable && (
                                <IconButton
                                  aria-label="edit"
                                  ml="0.5rem"
                                  size="sm"
                                  type="reset"
                                  onClick={(e) => {
                                    setPropertiesEditMode(true)
                                    e.stopPropagation()
                                    e.preventDefault()
                                  }}
                                  icon={<EditIcon />}
                                />
                              )
                            )}
                          </Text>
                          <InfoPopOver
                            placement="top"
                            message="Properties that will be added to the blockchain for any minted NFTs."
                          />
                        </Flex>

                        {propertiesEditMode ? (
                          <VStack w="full" pr="3rem">
                            <FieldArray name="metadata">
                              {(arrayHelpers) => (
                                <MetadataForm arrayHelpers={arrayHelpers} values={values} />
                              )}
                            </FieldArray>
                          </VStack>
                        ) : (
                          <VStack w="full" pr="3rem">
                            {values.metadata.map(({ key, val }) => (
                              <Flex key={key} justifyContent="space-between" w="full">
                                <Box>{key}</Box>
                                <Box>{val}</Box>
                              </Flex>
                            ))}
                          </VStack>
                        )}
                      </Flex>
                    )}

                    {!nft && (
                      <Flex
                        p="0rem 3rem 1rem 3rem"
                        borderBottom={"2px"}
                        borderColor={"brand.300"}
                        justifyContent="space-between"
                        w="full"
                      >
                        <Flex alignItems="center" mb="0.4rem">
                          <Text fontWeight="bold" fontSize="16px">
                            Supply
                          </Text>
                          <InfoPopOver
                            placement="top"
                            message="Number of NFTs that can be minted from this template"
                          />
                        </Flex>
                        <Field name="quantity">
                          {({ form, field }) => (
                            <Flex maxW="120px">
                              {supplyEditMode ? (
                                <>
                                  <Input
                                    size="sm"
                                    name="quantity"
                                    placeholder="Quantity"
                                    {...field}
                                  />
                                  <IconButton
                                    aria-label="edit"
                                    ml="0.5rem"
                                    size="sm"
                                    type="submit"
                                    onClick={() => {
                                      form.submitForm()
                                    }}
                                    icon={<CheckIcon />}
                                    isLoading={form.isSubmitting}
                                  />
                                </>
                              ) : (
                                <>
                                  <Text mt="0.3rem">{field.value}</Text>
                                  {isEditable && (
                                    <IconButton
                                      aria-label="edit"
                                      ml="0.5rem"
                                      size="sm"
                                      type="reset"
                                      onClick={(e) => {
                                        setSupplyEditMode(true)
                                        e.stopPropagation()
                                        e.preventDefault()
                                      }}
                                      icon={<EditIcon />}
                                    />
                                  )}
                                </>
                              )}
                            </Flex>
                          )}
                        </Field>
                      </Flex>
                    )}
                    {nftModel?.attributes && (
                      <Flex
                        direction="column"
                        p="0rem 3rem 1rem 3rem"
                        borderBottom={"2px"}
                        borderColor={"brand.300"}
                        alignItems="flex-start"
                        w="full"
                      >
                        <Flex alignItems="center" mb="0.4rem">
                          <Text fontWeight="bold" fontSize="16px">
                            Attributes
                          </Text>
                          <InfoPopOver
                            placement="top"
                            message="General attributes for the NFT that will be not added to the blockchain."
                          />
                        </Flex>

                        <VStack w="full">
                          {Object.keys(nftModel.attributes ?? {})?.map((item) => (
                            <Flex key={item} justifyContent="space-between" w="full">
                              <Box>{item}</Box>
                              <Box>{nftModel.attributes[item]?.toString()}</Box>
                            </Flex>
                          ))}
                        </VStack>
                      </Flex>
                    )}
                    {nft?.serialNumber && (
                      <Flex
                        p="0rem 3rem 1rem 3rem"
                        borderBottom={"2px"}
                        borderColor={"brand.300"}
                        alignItems="center"
                        justifyContent="space-between"
                        w="full"
                        mb="0.4rem"
                      >
                        <Flex alignItems="center">
                          <Text fontWeight="bold" fontSize="16px">
                            Serial Number
                          </Text>
                          <InfoPopOver
                            placement="top"
                            message="A unique identification number corresponding to the order in which the NFT was minted."
                          />
                        </Flex>

                        <Text>{nft?.serialNumber} </Text>
                      </Flex>
                    )}
                    {nft?.blockchainId && (
                      <Flex
                        p="0rem 3rem 1rem 3rem"
                        borderBottom={"2px"}
                        borderColor={"brand.300"}
                        alignItems="center"
                        justifyContent="space-between"
                        w="full"
                        mb="0.4rem"
                      >
                        <Flex alignItems="center">
                          <Text fontWeight="bold" fontSize="16px">
                            Blockchain Id
                          </Text>
                          <InfoPopOver
                            placement="top"
                            message="The ID of this resource on the blockchain."
                          />
                        </Flex>

                        <Text>{nft?.blockchainId} </Text>
                      </Flex>
                    )}
                    {nft?.transactions?.length > 0 && (
                      <Flex
                        borderBottom={"2px"}
                        borderColor={"brand.300"}
                        alignItems="center"
                        justifyContent="space-between"
                        w="full"
                        mt="-1rem"
                      >
                        <TransactionCollapsibleTable
                          transactions={nft?.transactions}
                          buttonPadding="1rem 3rem"
                          contentPadding="0rem 3rem"
                        />
                      </Flex>
                    )}

                    {isEditable && (
                      <Flex
                        p="0rem 3rem 1rem 3rem"
                        alignItems="center"
                        justifyContent="center"
                        w="full"
                        gap="1rem"
                      >
                        <Button w="full" isLoading={isTransferLoading} onClick={handleMint}>
                          Mint
                        </Button>
                        <Button
                          w="full"
                          disabled={isTransferLoading}
                          onClick={() => alertDisclosure.onOpen()}
                          color="red"
                        >
                          Delete
                        </Button>
                      </Flex>
                    )}
                  </>
                </VStack>
              </Flex>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}
