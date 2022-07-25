import { Box, Flex } from "@chakra-ui/layout";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <Flex direction="column" minHeight="100vh" minW="320">
      <Box bg="gray.800" flexGrow={1}>
        <Box w="100%" mt="5vh">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
