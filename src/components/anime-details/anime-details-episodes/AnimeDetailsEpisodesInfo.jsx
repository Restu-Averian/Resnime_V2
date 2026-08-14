import { Stack, Text } from "@chakra-ui/react";
import { formatDate as formatEpisodeDate } from "../../../lib/formatDate";

function AnimeDetailsEpisodesInfo({ episode }) {
  const episodeNumber = Number(episode.episode_number);

  return (
    <Stack gap="1.5" p="4">
      <Text textStyle="cardTitle" color="fg.heading">
        Episode {episodeNumber}
      </Text>
      <Text color="fg.muted" fontSize="sm">
        {formatEpisodeDate(episode.aired_at)}
      </Text>
    </Stack>
  );
}

export default AnimeDetailsEpisodesInfo;
