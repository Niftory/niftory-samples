import { Box, Center, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import * as React from 'react';

export interface IFooterLink {
  label?: string
  href?: string
}

export interface IFooterProps {
  links?: IFooterLink[]
}

export const Footer: React.FunctionComponent<IFooterProps> = ({ links = [] }) => (
  <Box as="footer" bg="footer.background" color="footer.text" py="6" width="100%">
    <Center width="100%">
      <Flex
        direction={{ base: "column-reverse", lg: "row" }}
        justify="space-between"
        fontSize="sm"
        fontWeight="300"
        mx="15px"
      >
        <Wrap id="bottom" spacing={{ base: "4", md: "8", lg: "12" }} justify="center">
          {links.map((link, idx) => (
            <WrapItem key={idx}>
              <Box color="footer.text" as="a" href={link.href}>
                {link.label}
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </Center>
  </Box>
)
