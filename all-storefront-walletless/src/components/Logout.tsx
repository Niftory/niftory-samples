import { Button } from "@chakra-ui/react"
import React from "react"
import { useAuthContext } from "../hooks/useAuthContext"
export function Logout() {
  const { signOut } = useAuthContext()

  return (
    <Button
      p="6"
      backgroundColor="brand.400"
      fontSize="md"
      onClick={() => {
        signOut()
      }}
    >
      Log Out
    </Button>
  )
}
