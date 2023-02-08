import {
  Box,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react"
import { AiFillInfoCircle } from "react-icons/ai"

interface InfoPopOverProps {
  message: string
  placement?: PlacementWithLogical
}

export const InfoPopOver = ({ message, placement = "right" }: InfoPopOverProps) => {
  return (
    <Popover trigger="hover" placement={placement}>
      <PopoverTrigger>
        <Box cursor="pointer" pl="0.4rem">
          <AiFillInfoCircle size="20px" />
        </Box>
      </PopoverTrigger>
      <PopoverContent color="black">
        <PopoverArrow />
        <PopoverBody fontSize="sm" fontWeight="normal">
          {message}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
