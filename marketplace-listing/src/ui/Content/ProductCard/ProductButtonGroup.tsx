import { ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import * as React from 'react';
import { FiCreditCard } from 'react-icons/fi';

const options = [
  {
    icon: FiCreditCard,
    label: "Buy with Card",
  },
  /*{
    icon: FiEye,
    label: "Quick View",
  },*/
]

export const DropButtonGroup = () => {
  const iconColor = "gray.500"
  return (
    <ButtonGroup variant="ghost" colorScheme="blue" width="full" size="sm" spacing="1">
      {options.map((option) => (
        <IconButton
          key={option.label}
          rounded="sm"
          sx={{ ":not(:hover)": { color: iconColor } }}
          _focus={{ boxShadow: "none" }}
          _focusVisible={{ boxShadow: "outline" }}
          width="full"
          aria-label={option.label}
          icon={<Icon as={option.icon} boxSize="5" />}
        />
      ))}
    </ButtonGroup>
  )
}
