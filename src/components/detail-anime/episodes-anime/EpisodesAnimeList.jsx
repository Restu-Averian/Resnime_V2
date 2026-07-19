import { Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import useResponsive from "../../../hooks/useResponsive";
import BgImage from "../../global/BgImage";
import formatWord from "../../../helpers/formatWord";
import { useEpisodeAnimeContext } from "./EpisodesAnimeContextProvider";
import CardData from "../../global/CardData";

const EpisodesAnimeList = () => {
  const { sm } = useResponsive();
  const { data, openModalVideo } = useEpisodeAnimeContext();

  return (
    <CardData useDefault header={<Heading>Episodes</Heading>}>
      <SimpleGrid columns={sm ? 2 : 3} gap={5}>
        {data?.episodes?.map((episode) => {
          return (
            <BgImage
              useOverlay
              key={episode?.id}
              cursor="pointer"
              src={episode?.image}
              onClick={(e) => {
                openModalVideo(e, episode?.id);
              }}
            >
              <Stack
                direction="column"
                spacing={2}
                bottom={5}
                left={2}
                pos="absolute"
              >
                <Heading as="h3" fontSize={sm ? 12 : "xl"}>
                  {formatWord(episode?.title)}
                </Heading>
                <Text {...(sm && { fontSize: 10 })}>
                  Episode {episode?.number}
                </Text>
              </Stack>
            </BgImage>
          );
        })}
      </SimpleGrid>
    </CardData>
  );
};
export default EpisodesAnimeList;
