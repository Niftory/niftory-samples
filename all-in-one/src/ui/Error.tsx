import { Box, Button, Center, Stack, VStack } from "@chakra-ui/react"
import { ErrorProps } from "next/error"
import Link from "next/link"

import { SectionHeader } from "./SectionHeader"
import { useAuthContext } from "../hooks/useAuthContext"

function Error({ statusCode }: ErrorProps) {
  const authContext = useAuthContext()

  return (
    <>
      <Box
        as="section"
        bg="page.background"
        bgSize="cover"
        paddingTop="10%"
        position="relative"
        w="100%"
      >
        <VStack>
          <Center>
            <SectionHeader
              standardText="Uh oh."
              highlightedText={
                statusCode == 404 ? "We couldn't find that page." : "Something went wrong."
              }
            />
          </Center>
          <Center>
            <Stack direction={["column", "row"]}>
              <Link href="/" passHref>
                <Button px="12" py="8" fontSize="md" borderRadius="0">
                  Go Home
                </Button>
              </Link>
              {authContext?.session && (
                <Button px="12" py="8" fontSize="md" borderRadius="0" onClick={authContext.signOut}>
                  Log Out
                </Button>
              )}
            </Stack>
          </Center>
        </VStack>
      </Box>
    </>
  )
}
export default Error
