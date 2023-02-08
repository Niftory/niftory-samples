import React from "react"
import { Text, Button, Link as ChakraLink } from "@chakra-ui/react"
import { useAuthContext } from "../../hooks/useAuthContext"

export const LoginText = () => {
  const { session, signIn } = useAuthContext()
  if (session) {
    return null
  }
  return (
    <Text mt={{ base: "5" }} textAlign="center">
      Already have a mintme wallet?{" "}
      <ChakraLink fontWeight="bold" onClick={() => signIn("/app/collection")}>
        Log in
      </ChakraLink>
    </Text>
  )
}
