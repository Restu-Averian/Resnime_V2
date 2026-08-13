import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useRef } from "react";
import AnimeDetailsEpisodesItem from "./AnimeDetailsEpisodesItem";
import AnimeDetailsHeaderSection from "../AnimeDetailsHeaderSection";

function AnimeDetailsEpisodes({ malId, episodes, pagination, isError }) {
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
            pt="4"
            pb="4"
            px="4"
            mx="-4"
            mt="-4"
            scrollSnapType="x proximity"
            css={{
              scrollbarWidth: "thin",
            }}
          >
            {episodes.map((episode) => (
              <AnimeDetailsEpisodesItem
                key={episode.episode_number}
                malId={malId}
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
