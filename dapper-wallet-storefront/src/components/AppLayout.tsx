import { Box, Flex } from '@chakra-ui/layout';

import { Footer } from '../ui/Footer';
import { Navbar } from '../ui/Navbar/Nav';

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <Flex direction="column" minH="100vh" minW="320">
      <Navbar />
      <Box bg="page.background" flexGrow={1}>
        <Box w="100%" py="12">
          {children}
        </Box>
      </Box>
      <Footer
        links={[
          {
            label: "Start Building @ niftory.com",
            href: "https://niftory.com",
          },
          {
            label: "Built on Flow",
            href: "https://flow.com/",
          },
          {
            label: "Terms of Service",
            href: "https://admin.niftory.com/tos",
          },
          {
            label: "Privacy Policy",
            href: "https://admin.niftory.com/privacy",
          },
        ]}
      />
    </Flex>
  )
}
