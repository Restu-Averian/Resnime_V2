import { Box, HStack, IconButton, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ANIME_STREAMING_EPISODES_LIMIT } from "../../../constants/anime-streaming";
import AnimeStreamingEpisodesItem from "./AnimeStreamingEpisodesItem";

function AnimeStreamingEpisodes({
  episodes,
  currentEpisodeNumber,
  pagination,
  isError,
  page,
  onPageChange,
}) {
  const total = pagination?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / ANIME_STREAMING_EPISODES_LIMIT));
  const startEpisode = total === 0 ? 0 : (page - 1) * ANIME_STREAMING_EPISODES_LIMIT + 1;
  const endEpisode = Math.min(page * ANIME_STREAMING_EPISODES_LIMIT, total);

  return (
    <Stack gap="4">
      <HStack justify="space-between" align="end" gap="4">
        <Text as="h2" textStyle="sectionTitle" color="fg.heading">
          Episode List
        </Text>

        <Stack align="center" gap="1">
          <HStack gap="2">
            <IconButton
              aria-label="Previous episode page"
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft size={18} />
            </IconButton>
            <Box
              minW="48px"
              h="36px"
              display="grid"
              placeItems="center"
              border="1px solid"
              borderColor="border.emphasized"
              borderRadius="control"
              color="fg.heading"
            >
              {page}
            </Box>
            <IconButton
              aria-label="Next episode page"
              variant="ghost"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              <ChevronRight size={18} />
            </IconButton>
          </HStack>
          <Text color="accent.warmMuted" fontSize="sm">
            Eps. {startEpisode}-{endEpisode}
          </Text>
        </Stack>
      </HStack>

      {isError ? (
        <Box layerStyle="panel" p="5">
          <Text color="fg.muted">Failed to load episodes.</Text>
        </Box>
      ) : episodes.length === 0 ? (
        <Box layerStyle="panel" p="5">
          <Text color="fg.muted">No episodes available.</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 6 }} gap="4">
          {episodes.map((episode) => (
            <AnimeStreamingEpisodesItem
              key={episode.episode_number}
              episode={episode}
              isActive={Number(episode.episode_number) === currentEpisodeNumber}
            />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}

export default AnimeStreamingEpisodes;
