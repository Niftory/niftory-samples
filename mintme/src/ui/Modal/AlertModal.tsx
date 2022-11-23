import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react"
import React, { useState } from "react"

interface Props {
  acceptText: string
  message: string
  title: string
  disclosure: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
  onAccept: () => void
}

export const AlertModal = ({ acceptText = "Ok", onAccept, message, title, disclosure }: Props) => {
  const { isOpen, onOpen, onClose } = disclosure
  const cancelRef = React.useRef()
  const [isLoading, setLoading] = useState(false)

  const handleAccept = async () => {
    setLoading(true)
    await onAccept?.()
    setLoading(false)
    onClose()
  }

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{message}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleAccept} isLoading={isLoading} ml={3}>
                {acceptText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
