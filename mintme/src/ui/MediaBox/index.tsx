import { BoxProps, Image, Box } from "@chakra-ui/react"
import { NftFile, SimpleFile } from "../../../generated/graphql"

interface Props extends BoxProps {
  file: Partial<NftFile>
  poster?: Partial<SimpleFile>
  alt: string
  controls?: boolean
}

export const MediaBox = ({ file, poster, ...props }: Props) => {
  if (file?.contentType?.startsWith("video") || !file?.contentType) {
    if (poster) {
      return <Image src={poster?.url} alt="nft" w="full" h="full" objectFit="contain" {...props} />
    }
    return <Box as="video" src={file?.url} w="full" h="full" objectFit="contain" {...props} />
  }

  return <Image src={file?.url} alt="nft" w="full" h="full" objectFit="contain" {...props} />
}
