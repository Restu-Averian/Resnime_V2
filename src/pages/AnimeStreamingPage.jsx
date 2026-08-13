import {
  Box,
  Button,
  Center,
  Container,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import AnimeStreamingEpisodeNavigation from "../components/anime-streaming/AnimeStreamingEpisodeNavigation";
import AnimeStreamingEpisodes from "../components/anime-streaming/anime-streaming-episodes";
import AnimeStreamingHeader from "../components/anime-streaming/AnimeStreamingHeader";
import AnimeStreamingPlayer from "../components/anime-streaming/AnimeStreamingPlayer";
import AnimeStreamingServerSelector from "../components/anime-streaming/AnimeStreamingServerSelector";
import AnimeStreamingSkeleton from "../components/skeletons/anime-streaming/AnimeStreamingSkeleton";
import { ANIME_STREAMING_EPISODES_LIMIT } from "../constants/anime-streaming";
import { getAnimeDetailsEpisodes } from "../services/anime-details";
import { getAnimeStreamingEpisode } from "../services/anime-streaming";

function AnimeStreamingPage() {
  const { mal_id: malId, episode_number: episodeNumberParam } = useParams();
  const currentEpisodeNumber = Number(episodeNumberParam);
  const isValidMalId = /^\d+$/.test(malId ?? "") && Number(malId) > 0;
  const isValidEpisodeNumber =
    /^\d+$/.test(episodeNumberParam ?? "") &&
    Number.isSafeInteger(currentEpisodeNumber) &&
    currentEpisodeNumber > 0;
  const initialPage = Math.ceil(
    (currentEpisodeNumber || 1) / ANIME_STREAMING_EPISODES_LIMIT,
  );
  const [page, setPage] = useState(initialPage);
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);

  useEffect(() => {
    setPage(initialPage);
    setSelectedServerIndex(0);
  }, [initialPage]);

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

  if (!isValidMalId || !isValidEpisodeNumber) {
    return (
      <Center minH="70vh" bg="bg.canvas" px="4">
        <Stack layerStyle="panel" p="7" gap="5" align="center">
          <Text as="h1" textStyle="sectionTitle" color="fg.heading">
            Episode not found
          </Text>
          <Text color="fg.muted">
            MAL ID and episode number must be positive numbers.
          </Text>
          <Button as={RouterLink} to="/anime">
            Back to Anime List
          </Button>
        </Stack>
      </Center>
    );
  }

  if (episodeQuery.isPending) {
    return <AnimeStreamingSkeleton />;
  }

  if (episodeQuery.isError) {
    const errorCode = episodeQuery.error?.response?.data?.error?.code;
    const backPath =
      errorCode === "ANIME_NOT_FOUND" ? "/anime" : `/anime/${malId}`;

    return (
      <Center minH="70vh" bg="bg.canvas" px="4">
        <Stack layerStyle="panel" p="7" gap="5" align="center" maxW="480px">
          <Text as="h1" textStyle="sectionTitle" color="fg.heading">
            Failed to load episode
          </Text>
          <Text color="fg.muted" textAlign="center">
            {episodeQuery.error?.response?.data?.error?.message ||
              "Failed to load streaming episode."}
          </Text>
          <Button as={RouterLink} to={backPath}>
            Go back
          </Button>
        </Stack>
      </Center>
    );
  }

  const episode = episodeQuery.data;
  const links = episode.links ?? [];
  const episodes = episodesQuery.data?.items ?? [];
  const currentEpisode = episodes.find(
    (item) => Number(item.episode_number) === currentEpisodeNumber,
  );
  const selectedEmbedUrl = links[selectedServerIndex]?.embed_url;

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
      <Container
        maxW="1440px"
        px={{ base: "4", md: "8", xl: "12" }}
        py={{ base: "6", md: "7" }}
      >
        <Stack gap={{ base: "5", md: "6" }}>
          <AnimeStreamingHeader malId={malId} episode={episode} />

          <AnimeStreamingPlayer
            selectedEmbedUrl={selectedEmbedUrl}
            poster={currentEpisode?.thumbnail_url}
          />

          <AnimeStreamingEpisodeNavigation malId={malId} episode={episode} />

          <Separator borderColor="border.subtle" />

          <AnimeStreamingServerSelector
            links={links}
            selectedIndex={selectedServerIndex}
            onSelect={setSelectedServerIndex}
          />

          <Separator borderColor="border.subtle" />

          <AnimeStreamingEpisodes
            malId={malId}
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
