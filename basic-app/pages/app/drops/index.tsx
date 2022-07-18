import {
  Link,
  SimpleGrid,
  VStack,
  Image,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useNFTModels } from "../../../hooks/useNFTModels";

const Drops = () => {
  const router = useRouter();
  const { nftModels } = useNFTModels();
  return (
    <AppLayout>
      <Box mx="auto" color="white">
        <VStack>
          <AppHeader />
          <SimpleGrid>
            {nftModels ? (
              nftModels.map((nftModel) => {
                const nftModelImageUrl = nftModel.content?.poster?.url;
                return (
                  <Link
                    key={nftModel.id}
                    onClick={() => router.push(`/app/drops/${nftModel.id}`)}
                  >
                    <VStack spacing="2vh">
                      <Image
                        alt={nftModel.title}
                        boxSize="20vh"
                        src={nftModelImageUrl}
                      ></Image>
                      <Text>{nftModel.title}</Text>
                    </VStack>
                  </Link>
                );
              })
            ) : (
              <Spinner size="lg"></Spinner>
            )}
          </SimpleGrid>
        </VStack>
      </Box>
    </AppLayout>
  );
};

Drops.auth = true;
export default Drops;
