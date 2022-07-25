import { Box, Link, SimpleGrid, VStack,Image,Spinner ,Text} from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { ComponentWithAuth } from "../../../components/ComponentWithAuth";
import { gql } from "graphql-request";
import { useUserNftsQuery } from "../../../generated/graphql";
import { useGraphQLClient } from "../../../hooks/useGraphQLClient";

gql`
  query userNfts {
    nfts {
      id
      model {
        id
        title
      }
    }
  }
`;

const Collection: ComponentWithAuth = () => {
  const router = useRouter();

  const client = useGraphQLClient();
  const { data } = useUserNftsQuery(client);
  const nfts = data?.nfts;

  return (
    <AppLayout>
      <Box mx="auto" color="white">
        <VStack>
          <AppHeader />
          <SimpleGrid>
            {nfts ? (
              nfts.map((nft) => {
                const imageUrl = nft.model?.content?.poster?.url;
                return (
                  <Link
                    key={nft.id}
                    onClick={() => router.push(`/app/collection/${nft.id}`)}
                  >
                    <VStack key={nft.id} spacing="1vh" mb="3vh">
                      <Image
                        alt={nft.model?.id}
                        src={imageUrl}
                        boxSize="20vh"
                      ></Image>
                      <Text>{nft.model?.title}</Text>
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

Collection.requireAuth = true;
export default Collection;
