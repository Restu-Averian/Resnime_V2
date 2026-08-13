import { Stack, Text } from "@chakra-ui/react";
import { ANIME_DETAILS_DATE_FORMATTER } from "../../../constants/anime-details";

const formatEpisodeDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : ANIME_DETAILS_DATE_FORMATTER.format(date);
};

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
