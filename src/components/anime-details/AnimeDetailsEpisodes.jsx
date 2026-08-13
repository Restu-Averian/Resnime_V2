import { Box, Flex, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import AnimeDetailsEpisodeCard from "./AnimeDetailsEpisodeCard";

function AnimeDetailsEpisodes({ episodes, pagination, isError }) {
  const scrollerRef = useRef(null);
  const total = pagination?.total ?? episodes.length;

  const scrollBy = (direction) => {
    scrollerRef.current?.scrollBy({
      left: direction * 520,
      behavior: "smooth",
    });
  };

  return (
    <Box as="section" id="anime-details-episodes" scrollMarginTop="96px">
      <Stack gap="4">
        <Flex align="center" justify="space-between" gap="4">
          <HStack gap="3">
            <Text as="h2" textStyle="sectionTitle" color="fg.heading">
              Episodes
            </Text>
            <Text color="fg.muted" fontSize="sm">
              {total} episodes
            </Text>
          </HStack>

          {episodes.length > 0 && (
            <HStack gap="2" display={{ base: "none", md: "flex" }}>
              <IconButton
                aria-label="Scroll episodes left"
                variant="outline"
                size="sm"
                onClick={() => scrollBy(-1)}
              >
                <ChevronLeft size={17} />
              </IconButton>

              <IconButton
                aria-label="Scroll episodes right"
                variant="outline"
                size="sm"
                onClick={() => scrollBy(1)}
              >
                <ChevronRight size={17} />
              </IconButton>
            </HStack>
          )}
        </Flex>

        {isError ? (
          <Box layerStyle="panel" p="5">
            <Text color="fg.muted">Failed to load episodes.</Text>
          </Box>
        ) : episodes.length === 0 ? (
          <Box layerStyle="panel" p="5">
            <Text color="fg.muted">No episodes available.</Text>
          </Box>
        ) : (
          <Flex
            ref={scrollerRef}
            gap="4"
            overflowX="auto"
            pb="2"
            scrollSnapType="x proximity"
            css={{
              scrollbarWidth: "thin",
            }}
          >
            {episodes.map((episode) => (
              <AnimeDetailsEpisodeCard
                key={episode.episode_number}
                episode={episode}
              />
            ))}
          </Flex>
        )}
      </Stack>
    </Box>
  );
}

export default AnimeDetailsEpisodes;
