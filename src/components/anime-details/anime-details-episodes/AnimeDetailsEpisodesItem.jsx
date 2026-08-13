import { Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AnimeDetailsEpisodesThumbnail from "./AnimeDetailsEpisodesThumbnail";
import AnimeDetailsEpisodesInfo from "./AnimeDetailsEpisodesInfo";

function AnimeDetailsEpisodesItem({ malId, episode }) {
  const episodeNumber = Number(episode.episode_number);

  return (
    <Box
      as={RouterLink}
      to={`/anime/${malId}/episode/${episodeNumber}`}
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
