import { BoxProps, HStack, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { SideNavItem } from "./SideNavItem"

export const SideNav = (props: BoxProps & { onChange?: () => void }) => {
  const router = useRouter()

  return (
    <VStack {...props} spacing={2} mt="1rem" alignItems="start">
      <SideNavItem
        isActive={router.pathname == "/app/collection"}
        href="/app/collection"
        label="My NFTs"
        onChange={props.onChange}
      />
      <SideNavItem
        isActive={router.pathname == "/app/collection/created"}
        href="/app/collection/created"
        label="Created By Me"
        onChange={props.onChange}
      />
    </VStack>
  )
}
