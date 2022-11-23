import { Box, BoxProps } from "@chakra-ui/react"
import * as React from "react"

import { CardContent } from "./CardContent"
import { CardStats } from "./CardStats"
import { CardWithAvatar } from "./CardWithAvatar"

export function CardBacking(rarity: string) {
  let path = "url('/rare_west_bg.jpeg')"

  if (rarity == "COMMON" || rarity == "Common") {
    path = "url('/common_bg.jpeg')"
  } else if (rarity == "RARE" || rarity == "Rare") {
    path = "url('/exotic.gif')"
  }

  return path
}

export interface CardProps extends BoxProps {
  name: string
  bgRarity: string
  poster: string
  text: string
  set: string
  src: string
  serial: string
  rarity: string
  shader: string
  preview?: boolean
  updatedAt?: Date
}

// TODO: fix src file extraction logic
export const Card = (props: CardProps) => {
  const { name, bgRarity, poster, text, set, src, serial, rarity, shader, preview, updatedAt } =
    props

  return (
    <Box maxW={{ base: "xs", md: "4xl" }} display={{ base: "none", md: "flex" }}>
      <CardWithAvatar
        background="black"
        key={name}
        avatarProps={{ src: src, name: name }}
        bgRarity={bgRarity}
        poster={poster}
        preview={preview}
        rounded="md"
      >
        <CardContent name={name} set={set} text={text} />
        <CardStats serial={serial} shader={shader} rarity={rarity} updatedAt={updatedAt} />
      </CardWithAvatar>
    </Box>
  )
}
