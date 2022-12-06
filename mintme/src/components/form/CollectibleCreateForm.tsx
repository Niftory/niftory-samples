import toast from "react-hot-toast"
import { Button, Flex, Stack, StackProps } from "@chakra-ui/react"
import { useAuthContext } from "../../hooks/useAuthContext"
import {
  CreateNftModelMutation,
  CreateNftModelMutationVariables,
  CreateNftSetMutation,
  GetNftSetsQuery,
  GetNftSetsQueryVariables,
  NftModel,
  NftModelCreateInput,
} from "../../../generated/graphql"
import { backendClient, useBackendClient } from "../../graphql/backendClient"
import { Form, Formik } from "formik"
import React, { useState, useRef, useEffect } from "react"
import { collectibleFormValidation } from "../../lib/collectibleFormValidation"
import { CollectibleForm } from "./CollectibleForm"
import { metadataToJson } from "./MetadataForm"
import { useRouter } from "next/router"
import { useTransfer } from "../../hooks/useTransfer"
import posthog from "posthog-js"

const createNFTModel = async (setId: string, nftModelData: NftModelCreateInput) => {
  let toastId
  try {
    toastId = toast.loading("Creating your NFTs...")
    const { createNFTModel } = await backendClient<
      CreateNftModelMutation,
      CreateNftModelMutationVariables
    >("createNFTModel", {
      setId: setId,
      data: nftModelData,
    })
    toast.success("NFT template created", { id: toastId })
    return createNFTModel as NftModel
  } catch (e) {
    toast.error("Uh Oh, there was an error creating your NFT template", { id: toastId })
    throw new Error("Unable to create NFTModel")
  }
}

export const CollectibleCreateForm = (props: StackProps) => {
  const { session, isLoading } = useAuthContext()
  const [buttonText, setButtonText] = useState("Mint")
  const bottomScrollRef = useRef(null)
  const router = useRouter()

  const initialMetadata = [{ key: "", value: "" }]

  const [isFileLoading, setIsFileLoading] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(null)
  const [isDraft, setIsDraft] = useState(false)
  const [currentNFTModel, setNFTModel] = useState<NftModel>(null)

  const fetching = isSubmitting || isFileLoading || isLoading

  const { signIn } = useAuthContext()

  const { sets: userSets, error } = useBackendClient<GetNftSetsQuery, GetNftSetsQueryVariables>(
    session ? "getNFTSets" : null,
    {
      filter: { tags: [session?.userId as string] },
    }
  )
  const { transferNFTModel } = useTransfer()

  useEffect(() => {
    if (!session && !isLoading) {
      setButtonText("Sign in to continue")
    }
  }, [session, isLoading])

  const handleSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true)
      setIsSubmitting(true)
      const { errors } = collectibleFormValidation({
        values,
      })

      actions.setErrors(errors)
      if (Object.keys(errors).length !== 0) {
        actions.setSubmitting(false)
        setIsSubmitting(false)
        return
      }

      // Reset form dirty state so confirm prompt is not shown
      actions.resetForm({ values })

      const collectibleData = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        quantity: +values.numEntities,
        contentId: values.contentId,
        status: "DRAFT" as any,
        metadata: metadataToJson(values.metadata.filter((item) => item.key && item.val)),
      }

      if (!session) {
        localStorage.setItem("COLLECTIBLE_CREATE_DATA", JSON.stringify(values))
        signIn("/app/new-item?fromRedirect=true")
        return
      }

      let createNFTModelData = currentNFTModel

      if (!createNFTModelData) {
        let currentSet = userSets?.[0]
        if (!currentSet) {
          const { createNFTSet: createNFTSetData } = await backendClient<CreateNftSetMutation>(
            "createNFTSet"
          )
          currentSet = createNFTSetData
        }

        createNFTModelData = await createNFTModel(currentSet?.id, collectibleData)
      }

      if (createNFTModelData.id != null && !isDraft) {
        try {
          await backendClient("updateNFTModel", {
            data: collectibleData,
            updateNftModelId: createNFTModelData.id,
          })
          await transferNFTModel(createNFTModelData.id, session)
        } catch (e) {
          // Route to account as wallet state is creation failed
          router.push("/app/account")
          return
        }
      }

      router.push(`/app/collection${isDraft ? "/created" : ""}`)
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
      setIsSubmitting(false)
    }
  }

  const onRedirect = async (values) => {
    const collectibleData = {
      title: values.title,
      subtitle: values.subtitle,
      description: values.description,
      quantity: +values.numEntities,
      contentId: values.contentId,
      status: "DRAFT" as any,
      metadata: metadataToJson(values.metadata.filter((item) => item.key && item.val)),
    }
    let currentSet = userSets?.[0]
    if (!currentSet) {
      const { createNFTSet: createNFTSetData } = await backendClient<CreateNftSetMutation>(
        "createNFTSet"
      )
      currentSet = createNFTSetData
    }

    const response = await createNFTModel(currentSet?.id, collectibleData)
    setNFTModel(response)
  }

  return (
    <Stack as="section" spacing="6" {...props} width="100%">
      <Formik
        initialValues={{
          title: "",
          subtitle: "",
          description: "",
          state: "CREATED",
          userWorkflow: "DRAFT",
          artists: [],
          tags: [],
          content: null,
          contentId: null,
          numEntities: undefined,
          metadata: initialMetadata,
        }}
        onSubmit={async (values, actions) => handleSubmit(values, actions)}
      >
        {({ values }) => {
          return (
            <Stack w="100%" maxW={"1000px"} bgColor="white" shadow="base" rounded="lg">
              <Form>
                <CollectibleForm
                  isSetLoading={!userSets && !error}
                  isFileLoading={isFileLoading}
                  setIsFileLoading={setIsFileLoading}
                  onRedirect={onRedirect}
                />

                {values.contentId && (
                  <Flex justifyContent="space-between" px="4" pb="4">
                    {session && !currentNFTModel && (
                      <Button
                        isLoading={fetching && isDraft}
                        disabled={fetching && !isDraft}
                        type="submit"
                        boxSizing="border-box"
                        w="full"
                        mr="1rem"
                        onClick={() => {
                          setIsDraft(true)
                          posthog.capture("FORM_SAVE_AS_DRAFT", {
                            posthogEventDetail:
                              "React-dropzone used for file upload (before sign-in)",
                            values,
                          })
                        }}
                      >
                        Save As Draft
                      </Button>
                    )}
                    <Button
                      ref={bottomScrollRef}
                      isLoading={fetching && !isDraft}
                      disabled={fetching && isDraft}
                      type="submit"
                      w="full"
                      boxSizing="border-box"
                      onClick={() => {
                        setIsDraft(false)
                        if (!session) {
                          posthog.capture("FORM_SIGN_IN_TO_MINT", {
                            posthogEventDetail: "Sign in to Mint (from creation form)",
                            values,
                          })
                        } else {
                          posthog.capture("FORM_MINT_NFT", {
                            posthogEventDetail: "Mint (from initial form)",
                            values,
                          })
                        }
                      }}
                    >
                      {buttonText}
                    </Button>
                  </Flex>
                )}
              </Form>
            </Stack>
          )
        }}
      </Formik>
    </Stack>
  )
}
