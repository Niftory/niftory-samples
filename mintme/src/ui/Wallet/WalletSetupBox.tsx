import { Box, Button, Spinner, VStack } from "@chakra-ui/react"
import { useMemo } from "react"

type WalletSetupBoxProps = {
  text: string
  buttonText: string
  isLoading: boolean 
  error: Error
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
    return <Spinner size='lg' />
  }

  if (error) {
    return <Box>Something went wrong. Please try again later!</Box>
  }

  return (
    <>
      <Box fontSize="xl" fontWeight="medium" maxW="xl" textColor="black">
        {text}
      </Box>
      <Button px="12" py="8" size="lg" onClick={onClick}>
        {buttonText}
      </Button>
    </>
  )
}
