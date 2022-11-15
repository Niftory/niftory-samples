import { Center, SimpleGrid, Skeleton, SkeletonCircle, Spacer, Stack } from '@chakra-ui/react';
import * as React from 'react';

export const TableSkeleton = (props: { isLoading: boolean }) => {
  return props.isLoading ? (
    <Stack>
      <Spacer />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  ) : null
}

export const LoginSkeleton = () => {
  return (
    <Stack h="100vh" py="40vh" px="10" boxShadow="lg" bg="page.background">
      <Center>
        <SimpleGrid columns={3} spacing={10}>
          <SkeletonCircle size="10" maxW="xl" />
          <SkeletonCircle size="10" maxW="xl" />
          <SkeletonCircle size="10" maxW="xl" />
        </SimpleGrid>
      </Center>
    </Stack>
  )
}
