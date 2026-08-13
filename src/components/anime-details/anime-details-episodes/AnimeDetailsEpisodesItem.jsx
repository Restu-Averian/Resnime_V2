import { Box } from "@chakra-ui/react";
import AnimeDetailsEpisodesThumbnail from "./AnimeDetailsEpisodesThumbnail";
import AnimeDetailsEpisodesInfo from "./AnimeDetailsEpisodesInfo";

function AnimeDetailsEpisodesItem({ episode }) {
  return (
    <Box
      as="article"
      flex="0 0 214px"
      layerStyle="interactiveSurface"
      overflow="hidden"
      boxShadow="media"
    >
      <AnimeDetailsEpisodesThumbnail episode={episode} />

      <AnimeDetailsEpisodesInfo episode={episode} />
    </Box>
  );
}

export default AnimeDetailsEpisodesItem;
