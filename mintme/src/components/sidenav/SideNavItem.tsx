import { Box } from "@chakra-ui/react"
import Link from "next/link"

interface SideNavItemProps {
  isActive: boolean
  label: string
  href: string
  onChange: () => void
}

export const SideNavItem = (props: SideNavItemProps) => {
  const { isActive, label, href } = props
  return (
    <Link href={href}>
      <Box
        width={"80%"}
        backgroundColor={isActive ? "content.400" : "transparent"}
        p="0.6rem 2rem"
        borderEndEndRadius="5rem"
        borderTopEndRadius="5rem"
        cursor="pointer"
        color={isActive ? "white" : "black"}
        onClick={props.onChange}
      >
        {label}
      </Box>
    </Link>
  )
}
