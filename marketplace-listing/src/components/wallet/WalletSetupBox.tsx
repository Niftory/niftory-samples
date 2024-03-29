import { Box, Button, Center, Spinner } from "@chakra-ui/react"
import { useMemo } from "react"

type WalletSetupBoxProps = {
  text: string
  buttonText: string
  isLoading: boolean
  error?: Error
  onClick: () => void
}
export const WalletSetupBox = ({
  text,
  buttonText,
  isLoading,
  error,
  onClick,
}: WalletSetupBoxProps) => {
  useMemo(() => error && console.error(error), [error])

  if (isLoading) {
    return (
      <Center minH="10rem">
        <Spinner color="white" size="xl" />
      </Center>
    )
  }

  if (error) {
    return <Box>Something went wrong. Please try again later!</Box>
  }

  return (
    <>
      <Box fontSize="xl" maxW="xl" textColor="page.text" py="8">
        {text}
      </Box>
      <Button p="8" onClick={onClick}>
        {buttonText}
      </Button>
    </>
  )
}
