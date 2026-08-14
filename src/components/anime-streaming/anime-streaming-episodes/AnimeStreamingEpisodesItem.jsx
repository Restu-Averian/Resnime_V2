import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { formatDate as formatEpisodeDate } from "../../../lib/formatDate";

function AnimeStreamingEpisodesItem({ episode, isActive }) {
  const { mal_id: malId } = useParams();
  const episodeNumber = Number(episode.episode_number);

  return (
    <Box
      as={RouterLink}
      to={`/anime/${malId}/episode/${episodeNumber}`}
      layerStyle="interactiveSurface"
      overflow="hidden"
      borderColor={isActive ? "border.interactive" : "border.default"}
      boxShadow={isActive ? "media" : "none"}
    >
      <Box aspectRatio="16 / 9" overflow="hidden" bg="bg.subtle">
        {episode.thumbnail_url ? (
          <Image
            src={episode.thumbnail_url}
            alt={`Episode ${episodeNumber}`}
            w="full"
            h="full"
            objectFit="cover"
          />
        ) : (
          <Box
            display="grid"
            placeItems="center"
            w="full"
            h="full"
            bg="bg.panel"
            color="accent.warmMuted"
            fontFamily="heading"
            fontSize="3xl"
            borderBottom="1px solid"
            borderColor="border.subtle"
          >
            EP {String(episodeNumber).padStart(2, "0")}
          </Box>
        )}
      </Box>

      <Stack gap="1" p="4">
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

export default AnimeStreamingEpisodesItem;
