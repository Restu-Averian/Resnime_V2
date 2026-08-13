import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useRef } from "react";
import AnimeDetailsEpisodesCard from "./AnimeDetailsEpisodesCard";
import AnimeDetailsHeaderSection from "../AnimeDetailsHeaderSection";

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
        <AnimeDetailsHeaderSection
          title="Episodes"
          suffixTitle={
            <Text color="fg.muted" fontSize="sm">
              {total} episodes
            </Text>
          }
          showArrows={episodes.length > 0}
          onScroll={scrollBy}
        />

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
              <AnimeDetailsEpisodesCard
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
