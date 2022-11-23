import {
  Box,
  Image,
  VStack,
  Button,
  Center,
  Progress,
  Spinner,
  CenterProps,
} from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { Accept, useDropzone } from "react-dropzone"
import { AiOutlineCloudUpload as UploadIcon } from "react-icons/ai"
import axios from "axios"
import {
  UploadNftContentMutation,
  UploadNftContentMutationVariables,
} from "../../../generated/graphql"
import { backendClient } from "../../graphql/backendClient"
import captureVideoFrame from "capture-video-frame"
import toast from "react-hot-toast"

export type FileType = "image" | "video"

interface IFilePreview {
  type: FileType
  url: string
}

interface FileUploadFieldProps extends CenterProps {
  initialFilePreview?: IFilePreview
  onUpload: (data: any) => void
  setLoading?: (isLoading: boolean) => void
  maxFiles?: number
  accept?: Accept
  disabled?: boolean
}

export const FileUploadField = ({
  initialFilePreview,
  onUpload,
  setLoading,
  maxFiles = 1,
  accept,
  disabled,
  ...props
}: FileUploadFieldProps) => {
  const [filePreview, setFilePreview] = useState<IFilePreview>(null)
  const [isUploading, setIsUploading] = useState(false)

  const [posterProgress, setPosterProgress] = useState(0)
  const [contentProgress, setContentProgress] = useState(0)

  // If initialFilePreview changes sync current preview
  useEffect(() => {
    if (initialFilePreview) setFilePreview(initialFilePreview)
  }, [initialFilePreview])

  const getFileType = (file: File): FileType => {
    return file.type.split("/")?.[0] as FileType
  }

  const onDrop = useCallback(
    async (acceptedFiles) => {
      try {
        if (!acceptedFiles.length) return
        const file = acceptedFiles[0]
        setFilePreview({ type: getFileType(file), url: URL.createObjectURL(file) })
        setIsUploading(true)
        setLoading(true)

        const { uploadNFTContent } = await backendClient<
          UploadNftContentMutation,
          UploadNftContentMutationVariables
        >("fileUpload", {
          name: file.name,
          description: "Created using Mintme by Niftory",
          contentType: file.type,
          posterContentType: file.type,
        })
        const content = uploadNFTContent?.files[0]
        content.contentType = file.type.split("/")[0]
        const poster = uploadNFTContent?.poster

        await axios.put(content?.url, file, {
          onUploadProgress({ loaded, total }) {
            setContentProgress(Math.round((loaded * 100) / total))
          },
          headers: {
            "Content-Type": file.type,
          },
        })

        let posterFile = file
        if (content.contentType === "video") {
          posterFile = captureVideoFrame("upload-video", "png").blob
        }

        await axios.put(poster?.url, posterFile, {
          onUploadProgress({ loaded, total }) {
            setPosterProgress(Math.round((loaded * 100) / total))
          },
          headers: {
            "Content-Type": file.type,
          },
        })

        await onUpload(uploadNFTContent)
      } catch {
        setFilePreview(null)
        toast.error("Uh Oh, there was an error uploading your media")
      }
      setPosterProgress(0)
      setContentProgress(0)
      setIsUploading(false)
      setLoading(false)
    },
    [onUpload, setLoading]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept,
    disabled: disabled,
  })

  return (
    <Center
      {...getRootProps()}
      minH="250px"
      overflow="hidden"
      border={isDragActive ? "2px dashed grey" : ""}
      bg="white"
      rounded="md"
      {...props}
    >
      <input {...getInputProps()} disabled={disabled} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <VStack cursor="pointer" width="100%">
          {filePreview ? (
            <Box
              position="relative"
              bgColor="#222"
              width="100%"
              rounded="md"
              overflow="hidden"
              boxSizing="border-box"
            >
              {isUploading && (
                <>
                  <Center
                    position={"absolute"}
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bgColor="rgba(0,0,0,0.4)"
                    flexDirection="column"
                    color="white"
                    gap="0.4rem"
                  >
                    <Spinner size="md" thickness="2px" color="white" top="10px" left="10px" />
                    Uploading
                  </Center>
                </>
              )}
              {filePreview.type === "image" && (
                <Image
                  src={filePreview.url}
                  alt="uploaded image"
                  w="100%"
                  maxH={"300px"}
                  objectFit="contain"
                  rounded="sm"
                />
              )}
              {filePreview.type === "video" && (
                <Box
                  controls={disabled}
                  id="upload-video"
                  as="video"
                  src={filePreview.url}
                  w="100%"
                  maxH={"300px"}
                  objectFit="contain"
                  rounded="sm"
                />
              )}
              {isUploading && (
                <Progress
                  value={(posterProgress + contentProgress) / 2}
                  max={100}
                  size="xs"
                  colorScheme="gray"
                />
              )}
            </Box>
          ) : (
            <>
              <Image src="/folder-icon.svg" alt="upload" />
              <Button
                alignItems="center"
                borderRadius="0.6rem"
                colorScheme="white"
                bgColor="content.400"
                padding="0.5rem 2rem"
                fontWeight="bold"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              >
                <UploadIcon size="25" />
                &nbsp; CHOOSE FILE
              </Button>
              <span> or drag file here</span>
            </>
          )}
        </VStack>
      )}
      {props.children}
    </Center>
  )
}
