import { Box, Center, Container, Image, Text } from '@chakra-ui/react';

import { SectionHeader } from '../../ui/SectionHeader';

export const UpcomingDrop = () => {
  return (
    <Box bg="page.background" px={{ base: "6", md: "8" }} pb="10" position="relative" width="100%">
      <Container maxW="container.xl" p="12">
        <Center>
          <SectionHeader standardText="Placeholder text" />
        </Center>
        <Center pt="4">
          <Text size="xl" color="gray.100">
            Placeholder text
          </Text>
        </Center>
      </Container>
    </Box>
  )
}
