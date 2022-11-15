import { Button } from "@chakra-ui/react"
import { useWalletContext } from "../hooks/useWalletContext"

export function LogOut() {
  const { signOut } = useWalletContext()
  return <Button onClick={signOut}>Log Out</Button>
}
