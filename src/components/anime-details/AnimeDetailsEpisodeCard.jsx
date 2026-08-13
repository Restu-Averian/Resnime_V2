import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { ANIME_DETAILS_DATE_FORMATTER } from "../../constants/anime-details";

const formatEpisodeDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : ANIME_DETAILS_DATE_FORMATTER.format(date);
};

function AnimeDetailsEpisodeCard({ episode }) {
  const episodeNumber = Number(episode.episode_number);
  const fallbackLabel = `EP ${String(episodeNumber).padStart(2, "0")}`;

  return (
    <Box
      as="article"
      flex="0 0 214px"
      layerStyle="interactiveSurface"
      overflow="hidden"
      boxShadow="media"
    >
      <Box aspectRatio="16 / 9" overflow="hidden" bg="bg.subtle">
        {episode.thumbnail_url ? (
          <Image
            src={episode.thumbnail_url}
            alt={`Episode ${episodeNumber}`}
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="center"
          />
        ) : (
          <Box
            display="grid"
            placeItems="center"
            w="full"
            h="full"
            bg="bg.panel"
            color="fg.heading"
            fontFamily="heading"
            fontSize="3xl"
            borderBottom="1px solid"
            borderColor="border.subtle"
          >
            {fallbackLabel}
          </Box>
        )}
      </Box>

      <Stack gap="1.5" p="4">
        <Text textStyle="cardTitle" color="fg.heading">
          Episode {episodeNumber}
        </Text>
        <Text color="fg.muted" fontSize="sm">
          {formatEpisodeDate(episode.aired_at)}
        </Text>
      </Stack>
    </Box>
  );
}

export default AnimeDetailsEpisodeCard;
