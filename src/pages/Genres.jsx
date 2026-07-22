import {
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Coffee,
  Compass,
  Crown,
  Drama,
  Heart,
  LandPlot,
  Laugh,
  MicVocal,
  Orbit,
  Search,
  Shield,
  Skull,
  Sparkles,
  Swords,
  Trophy,
  WandSparkles,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorPage from "../components/global/ErrorPage";
import GenresHeader from "../components/genres/GenresHeader";
import GenreLists from "../components/genres/GenreLists";
import AnimeCard from "../components/global/anime-card/AnimeCard";
import AnimeCardSkeleton from "../components/global/anime-card/AnimeCardSkeleton";
import imageError from "../assets/image_error.png";
import useChangeDocTitle from "../hooks/useChangeDocTitle";
import { getAnimeByGenre } from "../services/animeService";

const genres = [
  { label: "Action", value: "action", icon: Swords },
  { label: "Adventure", value: "adventure", icon: Compass },
  { label: "Comedy", value: "comedy", icon: Laugh },
  { label: "Drama", value: "drama", icon: Drama },
  { label: "Fantasy", value: "fantasy", icon: WandSparkles },
  { label: "Romance", value: "romance", icon: Heart },
  { label: "Sci-Fi", value: "sci-fi", icon: Orbit },
  { label: "Slice of Life", value: "slice-of-life", icon: Coffee },
  { label: "Mystery", value: "mystery", icon: Search },
  { label: "Horror", value: "horror", icon: Skull },
  { label: "Sports", value: "sports", icon: Trophy },
  { label: "Supernatural", value: "supernatural", icon: MicVocal },
  { label: "School", value: "school", icon: LandPlot },
  { label: "Magic", value: "magic", icon: Sparkles },
  { label: "Military", value: "military", icon: Shield },
  { label: "Shounen", value: "shounen", icon: Crown },
].filter((genre) => genre.label && genre.value && genre.icon);

const fallbackGenre = genres[0].value;

const getGenreLabel = (value) =>
  genres.find((genre) => genre.value === value)?.label || "Action";

const getSafePage = (value) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

const sortAnime = (results, sortMode) =>
  [...results].sort((left, right) => {
    if (sortMode === "title") {
      return left.title.romaji.localeCompare(right.title.romaji);
    }

    const leftValue = sortMode === "rating" ? left.score : left.ratingsCount;
    const rightValue = sortMode === "rating" ? right.score : right.ratingsCount;
    return (rightValue || 0) - (leftValue || 0);
  });

const Genres = () => {
  const { genre } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [genreQuery, setGenreQuery] = useState("");
  const [sortMode] = useState("popularity");
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: "",
  });
  const controllerRef = useRef(null);

  const selectedGenre = genre || searchParams.get("genre") || fallbackGenre;
  const currentPage = getSafePage(searchParams.get("page"));
  const genreLabel = getGenreLabel(selectedGenre);
  const filteredGenres = useMemo(
    () =>
      genres.filter((item) =>
        item.label.toLowerCase().includes(genreQuery.trim().toLowerCase()),
      ),
    [genreQuery],
  );
  const results = useMemo(
    () => sortAnime(state.data?.results || [], sortMode),
    [state.data?.results, sortMode],
  );

  useChangeDocTitle(`Resnime | ${genreLabel} Anime`);

  const fetchData = useCallback(async () => {
    const signal = controllerRef.current?.signal;
    if (!signal) return;

    setState({ data: null, loading: true, error: "" });

    try {
      const data = await getAnimeByGenre(selectedGenre, currentPage, signal);
      if (!signal.aborted) {
        setState({ data, loading: false, error: "" });
      }
    } catch (error) {
      if (error?.cancelled || signal.aborted) return;
      setState({
        data: null,
        loading: false,
        error: error?.message || "Unable to load genre anime.",
      });
    }
  }, [selectedGenre, currentPage]);

  useEffect(() => {
    controllerRef.current = new AbortController();
    fetchData();

    return () => {
      controllerRef.current?.abort();
    };
  }, [fetchData]);

  const setPage = (nextPage) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(nextPage));
      return params;
    });
  };

  return (
    <Stack
      minH="calc(100vh - 88px)"
      gap={4}
      p={{ base: 4, md: 7 }}
      borderRadius="12px"
      border="1px solid rgba(165, 183, 226, 0.18)"
      bg="radial-gradient(circle at top left, rgba(255, 95, 143, 0.08), transparent 36%), linear-gradient(180deg, rgba(8, 14, 30, 0.92), rgba(5, 11, 22, 0.98))"
      color="#f5f7ff"
    >
      <GenresHeader genreQuery={genreQuery} setGenreQuery={setGenreQuery} />

      <GenreLists
        filteredGenres={filteredGenres}
        selectedGenre={selectedGenre}
      />

      <Stack
        gap={4}
        p={{ base: 3, md: 5 }}
        borderRadius="10px"
        border="1px solid rgba(165, 183, 226, 0.14)"
        bg="rgba(255,255,255,0.025)"
      >
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={3}
        >
          <Stack gap={1}>
            <HStack gap={3}>
              <Icon
                as={
                  genres.find((item) => item.value === selectedGenre)?.icon ||
                  Swords
                }
                boxSize={5}
                color="#ff5f8f"
              />
              <Heading as="h2" fontSize="xl">
                {genreLabel} Anime
              </Heading>
            </HStack>
            <Text color="#aeb7cb" fontSize="sm">
              {state.loading ? "Loading" : `${results.length} results`}
            </Text>
          </Stack>
        </Flex>

        {state.error ? (
          <ErrorPage
            btnAction={{
              onClick: () => setPage(currentPage),
              text: "Refresh",
            }}
            title="Error"
            subTitle={state.error}
            src={imageError}
          />
        ) : state.loading ? (
          <SimpleGrid columns={{ base: 1, xl: 2 }} gap={3.5}>
            {Array.from({ length: 10 }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </SimpleGrid>
        ) : results.length ? (
          <SimpleGrid columns={{ base: 1, xl: 2 }} gap={3.5}>
            {results.map((anime) => (
              <AnimeCard anime={anime} key={anime.id} />
            ))}
          </SimpleGrid>
        ) : (
          <Grid
            minH="220px"
            placeItems="center"
            borderRadius="10px"
            border="1px solid rgba(165, 183, 226, 0.14)"
            color="#aeb7cb"
          >
            <Text>No anime found for this genre.</Text>
          </Grid>
        )}
      </Stack>
    </Stack>
  );
};

export default Genres;
