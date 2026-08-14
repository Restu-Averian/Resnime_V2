import { Box, Container, Separator, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AnimeStreamingEpisodeNavigation from "../components/anime-streaming/AnimeStreamingEpisodeNavigation";
import AnimeStreamingEpisodes from "../components/anime-streaming/anime-streaming-episodes";
import AnimeStreamingError from "../components/anime-streaming/AnimeStreamingError";
import AnimeStreamingHeader from "../components/anime-streaming/AnimeStreamingHeader";
import AnimeStreamingNotFound from "../components/anime-streaming/AnimeStreamingNotFound";
import AnimeStreamingPlayer from "../components/anime-streaming/AnimeStreamingPlayer";
import AnimeStreamingServerSelector from "../components/anime-streaming/AnimeStreamingServerSelector";
import AnimeStreamingSkeleton from "../components/skeletons/anime-streaming/AnimeStreamingSkeleton";
import { ANIME_STREAMING_EPISODES_LIMIT } from "../constants/anime-streaming";
import { getAnimeDetailsEpisodes } from "../services/anime-details";
import { getAnimeStreamingEpisode } from "../services/anime-streaming";

function AnimeStreamingPage() {
  const { mal_id: malId, episode_number: episodeNumberParam } = useParams();

  const {
    currentEpisodeNumber,
    isValidMalId,
    isValidEpisodeNumber,
    initialPage,
  } = useMemo(() => {
    const currentEpisodeNumber = Number(episodeNumberParam);

    const isValidMalId = /^\d+$/.test(malId ?? "") && Number(malId) > 0;

    const isValidEpisodeNumber =
      /^\d+$/.test(episodeNumberParam ?? "") &&
      Number.isSafeInteger(currentEpisodeNumber) &&
      currentEpisodeNumber > 0;

    const initialPage = Math.ceil(
      (currentEpisodeNumber || 1) / ANIME_STREAMING_EPISODES_LIMIT,
    );

    return {
      currentEpisodeNumber,
      isValidMalId,
      isValidEpisodeNumber,
      initialPage,
    };
  }, [malId, episodeNumberParam]);

  const [page, setPage] = useState(initialPage);

  const [selectedServerIndex, setSelectedServerIndex] = useState(0);

  const episodeQuery = useQuery({
    queryKey: ["anime-streaming", malId, episodeNumberParam],
    queryFn: () => getAnimeStreamingEpisode(malId, episodeNumberParam),
    enabled: isValidMalId && isValidEpisodeNumber,
  });

  const episodesQuery = useQuery({
    queryKey: [
      "anime-streaming",
      malId,
      "episodes",
      page,
      ANIME_STREAMING_EPISODES_LIMIT,
    ],
    queryFn: () =>
      getAnimeDetailsEpisodes(malId, {
        page,
        limit: ANIME_STREAMING_EPISODES_LIMIT,
      }),
    enabled: isValidMalId && isValidEpisodeNumber,
  });

  useEffect(() => {
    setPage(initialPage);
    setSelectedServerIndex(0);
  }, [initialPage]);

  const { episode, links, episodes, currentEpisode, selectedEmbedUrl } =
    useMemo(() => {
      const episode = episodeQuery.data;

      const links = episode?.links ?? [];

      const episodes = episode?.items ?? [];

      const currentEpisode = episodes.find(
        (item) => Number(item.episode_number) === currentEpisodeNumber,
      );
      const selectedEmbedUrl = links[selectedServerIndex]?.embed_url;

      return {
        episode,
        links,
        episodes,
        currentEpisode,
        selectedEmbedUrl,
      };
    }, [
      episodeQuery.data,
      episodesQuery.data,
      currentEpisodeNumber,
      selectedServerIndex,
    ]);

  if (!isValidMalId || !isValidEpisodeNumber) {
    return <AnimeStreamingNotFound />;
  }

  if (episodeQuery.isPending) {
    return <AnimeStreamingSkeleton />;
  }

  if (episodeQuery.isError) {
    return <AnimeStreamingError error={episodeQuery.error} />;
  }

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
      <Container
        maxW="1440px"
        px={{ base: "4", md: "8", xl: "12" }}
        py={{ base: "6", md: "7" }}
      >
        <Stack gap={{ base: "5", md: "6" }}>
          <AnimeStreamingHeader episode={episode} />

          <AnimeStreamingPlayer
            selectedEmbedUrl={selectedEmbedUrl}
            poster={currentEpisode?.thumbnail_url}
            episodeNumber={currentEpisodeNumber}
          />

          <AnimeStreamingEpisodeNavigation episode={episode} />

          {links.length > 1 && (
            <>
              <Separator borderColor="border.subtle" />

              <AnimeStreamingServerSelector
                links={links}
                selectedIndex={selectedServerIndex}
                onSelect={setSelectedServerIndex}
              />
            </>
          )}

          <Separator borderColor="border.subtle" />

          <AnimeStreamingEpisodes
            episodes={episodes}
            currentEpisodeNumber={currentEpisodeNumber}
            pagination={episodesQuery.data?.pagination}
            isError={episodesQuery.isError}
            page={page}
            onPageChange={setPage}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default AnimeStreamingPage;
