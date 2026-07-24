import {
  Box as ChakraBox,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState, useMemo, useEffect } from "react";
import { useEpisodeAnimeContext } from "../../../context/EpisodesAnimeContextProvider";
import EpisodesAnimeOrder from "./EpisodesAnimeOrder";
import EpisodesAnimePagination from "./EpisodesAnimePagination";
import EpisodesAnimeListItem from "./EpisodesAnimeListItem";

const EpisodesAnimeList = ({ sortMode, setSortMode }) => {
  const { data, openModalVideo, episodeValParam } = useEpisodeAnimeContext();

  const episodes = data?.episodes || [];

  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(episodes.length / itemsPerPage) || 1;

  const paginatedEpisodes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return episodes.slice(start, start + itemsPerPage);
  }, [episodes, currentPage]);

  const currentStart = (currentPage - 1) * itemsPerPage + 1;
  const currentEnd = Math.min(currentPage * itemsPerPage, episodes.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortMode, episodes.length]);

  return (
    <ChakraBox
      border="1px solid rgba(255,255,255,0.12)"
      borderRadius="14px"
      bg="rgba(8, 13, 30, 0.72)"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.05), 0 22px 70px rgba(0,0,0,0.28)"
      px={{ base: 4, md: 7 }}
      py={{ base: 5, md: 6 }}
    >
      <Flex
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap={4}
        mb={{ base: 5, md: 8 }}
      >
        <HStack gap={3}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
            Episodes
          </Heading>
          <Text
            px={3}
            py={1}
            borderRadius="8px"
            bg="rgba(255,109,143,0.18)"
            color="#ff9ab5"
            fontSize={{ base: "sm", md: "md" }}
            lineHeight={1.2}
          >
            {episodes.length} Episode{episodes.length === 1 ? "" : "s"}
          </Text>
        </HStack>

        <Stack gap={2} align={{ base: "flex-start", md: "flex-end" }}>
          <HStack gap={{ base: 4, md: 6 }} flexWrap="wrap">
            <EpisodesAnimeOrder sortMode={sortMode} setSortMode={setSortMode} />

            {episodes.length > 10 && (
              <EpisodesAnimePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                buttonSize="32px"
              />
            )}
          </HStack>

          {episodes.length > 0 && (
            <Text fontSize="xs" color="gray.500" pr={{ base: 0, md: 1 }}>
              Showing {currentStart}-{currentEnd}{" "}
              <Text as="span" color="gray.600" mx={1}>
                |
              </Text>{" "}
              10 episodes per page
            </Text>
          )}
        </Stack>
      </Flex>

      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3, xl: 4, "2xl": 6 }}
        gap={{ base: 4, md: 5 }}
      >
        {paginatedEpisodes.map((episode) => {
          const isActive = episode?.id === episodeValParam;

          return (
            <EpisodesAnimeListItem
              key={episode?.id}
              episode={episode}
              isActive={isActive}
              openModalVideo={openModalVideo}
            />
          );
        })}
      </SimpleGrid>

      {episodes.length > 10 && totalPages > 1 && (
        <Flex justify="center" mt={{ base: 6, md: 8 }}>
          <EpisodesAnimePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            buttonSize="36px"
          />
        </Flex>
      )}
    </ChakraBox>
  );
};
export default EpisodesAnimeList;
