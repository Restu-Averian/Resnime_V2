import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { ANIME_STREAMING_DATE_FORMATTER } from "../../constants/anime-streaming";

const formatEpisodeDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : ANIME_STREAMING_DATE_FORMATTER.format(date);
};

function AnimeStreamingEpisodeNavigation({ malId, episode }) {
  const previousEpisodeNumber = episode.previous_episode_number;
  const nextEpisodeNumber = episode.next_episode_number;

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
      alignItems="center"
      gap={{ base: "4", md: "6" }}
      py={{ base: "4", md: "5" }}
    >
      <HStack justify={{ base: "center", md: "start" }}>
        {previousEpisodeNumber ? (
          <HStack
            as={RouterLink}
            to={`/anime/${malId}/episode/${previousEpisodeNumber}`}
            color="fg.heading"
            gap="2"
            _hover={{ color: "accent.primary" }}
          >
            <ArrowLeft size={18} />
            <Text fontFamily="heading" fontSize="xl">
              Episode {previousEpisodeNumber}
            </Text>
          </HStack>
        ) : (
          <Box />
        )}
      </HStack>

      <Stack
        align="center"
        gap="0.5"
        borderX={{ base: "0", md: "1px solid" }}
        borderColor="border.default"
      >
        <Text color="fg.heading" fontFamily="heading" fontSize="3xl" lineHeight="1">
          Episode {episode.episode_number}
        </Text>
        <Text color="accent.warmMuted" fontSize="sm">
          Aired {formatEpisodeDate(episode.aired_at)}
        </Text>
      </Stack>

      <HStack justify={{ base: "center", md: "end" }}>
        {nextEpisodeNumber ? (
          <HStack
            as={RouterLink}
            to={`/anime/${malId}/episode/${nextEpisodeNumber}`}
            color="fg.heading"
            gap="2"
            _hover={{ color: "accent.primary" }}
          >
            <Text fontFamily="heading" fontSize="xl">
              Episode {nextEpisodeNumber}
            </Text>
            <ArrowRight size={18} />
          </HStack>
        ) : (
          <Box />
        )}
      </HStack>
    </Grid>
  );
}

export default AnimeStreamingEpisodeNavigation;
