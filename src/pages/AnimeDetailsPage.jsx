import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import AnimeDetailsCharacters from "../components/anime-details/anime-details-character";
import AnimeDetailsEpisodes from "../components/anime-details/anime-details-episodes";
import AnimeDetailsHero from "../components/anime-details/anime-details-hero";
import AnimeDetailsOverview from "../components/anime-details/AnimeDetailsOverview";
import AnimeDetailsSynopsis from "../components/anime-details/AnimeDetailsSynopsis";
import AnimeDetailsSkeleton from "../components/skeletons/anime-details/AnimeDetailsSkeleton";
import { ANIME_DETAILS_ITEMS_LIMIT } from "../constants/anime-details";
import {
  getAnimeDetails,
  getAnimeDetailsCharacters,
  getAnimeDetailsEpisodes,
} from "../services/anime-details";

function AnimeDetailsPage() {
  const { mal_id: malId } = useParams();

  const episodesRef = useRef(null);

  const isValidMalId = /^\d+$/.test(malId ?? "") && Number(malId) > 0;

  const detailsQuery = useQuery({
    queryKey: ["anime-details", malId],
    queryFn: () => getAnimeDetails(malId),
    enabled: isValidMalId,
  });

  const episodesQuery = useQuery({
    queryKey: ["anime-details", malId, "episodes"],
    queryFn: () =>
      getAnimeDetailsEpisodes(malId, {
        page: 1,
        limit: ANIME_DETAILS_ITEMS_LIMIT,
      }),
    enabled: isValidMalId && detailsQuery.isSuccess,
  });

  const charactersQuery = useQuery({
    queryKey: ["anime-details", malId, "characters"],
    queryFn: () =>
      getAnimeDetailsCharacters(malId, {
        page: 1,
        limit: ANIME_DETAILS_ITEMS_LIMIT,
      }),
    enabled: isValidMalId && detailsQuery.isSuccess,
  });

  const jumpToEpisodes = () => {
    episodesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!isValidMalId) {
    return (
      <Center minH="70vh" bg="bg.canvas" px="4">
        <Stack layerStyle="panel" p="7" gap="5" align="center">
          <Text as="h1" textStyle="sectionTitle" color="fg.heading">
            Anime not found
          </Text>

          <Text color="fg.muted">MAL ID must be a positive number.</Text>
          <Button as={RouterLink} to="/anime">
            Back to Anime List
          </Button>
        </Stack>
      </Center>
    );
  }

  if (detailsQuery.isPending) {
    return <AnimeDetailsSkeleton />;
  }

  if (detailsQuery.isError) {
    return (
      <Center minH="70vh" bg="bg.canvas" px="4">
        <Stack layerStyle="panel" p="7" gap="5" align="center" maxW="480px">
          <Text as="h1" textStyle="sectionTitle" color="fg.heading">
            Failed to load anime
          </Text>
          <Text color="fg.muted" textAlign="center">
            {detailsQuery.error?.response?.data?.error?.message ||
              "Failed to load anime details."}
          </Text>
          <Button as={RouterLink} to="/anime">
            Back to Anime List
          </Button>
        </Stack>
      </Center>
    );
  }

  const anime = detailsQuery.data;
  const episodes = episodesQuery.data?.items ?? [];
  const characters = charactersQuery.data?.items ?? [];

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "0" }}>
      <AnimeDetailsHero anime={anime} onJumpToEpisodes={jumpToEpisodes} />

      <Container
        maxW="1440px"
        px={{ base: "4", md: "8", xl: "12" }}
        py={{ base: "8", md: "12" }}
      >
        <Stack gap={{ base: "9", md: "12" }}>
          <Grid
            templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 360px" }}
            gap={{ base: "5", md: "6" }}
            alignItems="start"
          >
            <AnimeDetailsSynopsis synopsis={anime.synopsis} />

            <AnimeDetailsOverview anime={anime} />
          </Grid>

          <Box ref={episodesRef}>
            <AnimeDetailsEpisodes
              malId={malId}
              episodes={episodes}
              pagination={episodesQuery.data?.pagination}
              isError={episodesQuery.isError}
            />
          </Box>

          <AnimeDetailsCharacters
            characters={characters}
            isError={charactersQuery.isError}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default AnimeDetailsPage;
