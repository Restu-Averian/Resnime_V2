import {
  Box as ChakraBox,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import useResponsive from "../../../hooks/useResponsive";
import BgImage from "../../global/BgImage";
import formatWord from "../../../helpers/formatWord";
import { useEpisodeAnimeContext } from "./EpisodesAnimeContextProvider";

const EpisodesAnimeList = () => {
  const { sm } = useResponsive();
  const { data, openModalVideo } = useEpisodeAnimeContext();

  return (
    <Stack gap={4}>
      <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }}>
        Episodes
      </Heading>
      <SimpleGrid
        columns={{ base: 1, sm: 2, xl: 4 }}
        gap={{ base: 4, md: 5 }}
      >
        {data?.episodes?.map((episode) => {
          return (
            <ChakraBox
              key={episode?.id}
              as="button"
              type="button"
              cursor="pointer"
              textAlign="left"
              border="1px solid rgba(255,255,255,0.13)"
              borderRadius="10px"
              overflow="hidden"
              bg="rgba(255,255,255,0.035)"
              transition="180ms ease"
              _hover={{
                transform: "translateY(-2px)",
                borderColor: "rgba(255,109,143,0.45)",
                bg: "rgba(255,255,255,0.06)",
              }}
              onClick={(e) => {
                openModalVideo(e, episode?.id);
              }}
            >
              <BgImage src={episode?.image} height={sm ? 86 : 96} />
              <HStack gap={4} align="center" px={4} py={3}>
                <Text
                  color="#ff6d8f"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  lineHeight={1}
                  minW="32px"
                >
                  {episode?.number}
                </Text>
                <Stack gap={0} minW={0}>
                  <Heading
                    as="h3"
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    lineClamp={1}
                  >
                    {formatWord(episode?.title)}
                  </Heading>
                  <Text color="gray.400" fontSize="sm">
                    Episode {episode?.number}
                  </Text>
                </Stack>
              </HStack>
            </ChakraBox>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
};
export default EpisodesAnimeList;
