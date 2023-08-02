import { Box, Center, Container, Image, Text } from '@chakra-ui/react';
import * as React from 'react';

import { SectionHeader } from '../../ui/SectionHeader';

export const UpcomingDrop = () => {
  return (
    <Box bg="page.background" px={{ base: "6", md: "8" }} pb="10" position="relative" width="100%">
      <Container maxW="container.xl" p="12">
        <Center>
          <SectionHeader standardText="Support Your Favorite Teams and Players" />
        </Center>
        <Center pt="4">
          <Text size="xl" color="gray.100">
            Stay tuned - more Teams and Players are Coming Your Way!
          </Text>
        </Center>
        <Center pt="10">
          <Image
            alt="nextname_hero"
            style={{
              height: "100%",
              width: "50%",
            }}
            src="/nextname_hero.png"
          ></Image>
        </Center>
      </Container>
    </Box>
  )
}
