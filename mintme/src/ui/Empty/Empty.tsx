import { Text, Center, Button } from "@chakra-ui/react"
import { BsExclamationCircleFill as InfoIcon } from "react-icons/bs"

interface Props {
  message?: string
  actionText?: string
  onAction?: () => void
}
export const Empty: React.FC<Props> = ({ message = "No data found", actionText, onAction }) => {
  return (
    <Center w="full" minH="calc(80vh - 100px)">
      <Center flexDir="column" gap="1rem">
        <Text fontSize="lg">{message}</Text>
        {onAction && <Button onClick={onAction}>{actionText}</Button>}
      </Center>
    </Center>
  )
}
