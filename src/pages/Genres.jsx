import { Grid, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import GenreHeaderType from "../components/genres/GenreHeaderType";
import GenreLists from "../components/genres/GenreLists";
import GenresHeader from "../components/genres/GenresHeader";
import AnimeCard from "../components/global/anime-card/AnimeCard";
import AnimeCardSkeleton from "../components/global/anime-card/AnimeCardSkeleton";
import ErrorPage from "../components/global/ErrorPage";
import { GENRES } from "../constants/genres";
import useChangeDocTitle from "../hooks/useChangeDocTitle";
import { getAnimeByGenre } from "../services/animeService";

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

  const selectedGenre = genre || searchParams.get("genre") || GENRES[0].value;

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
      const rightValue =
        sortMode === "rating" ? right.score : right.ratingsCount;
      return (rightValue || 0) - (leftValue || 0);
    });

  const currentPage = getSafePage(searchParams.get("page"));

  const genreLabel = useMemo(
    () => GENRES.find((g) => g.value === selectedGenre)?.label || "Action",
    [selectedGenre],
  );

  const filteredGenres = useMemo(
    () =>
      GENRES.filter((item) =>
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
        <GenreHeaderType
          selectedGenre={selectedGenre}
          genreLabel={genreLabel}
          loading={state.loading}
          resultsCount={results.length}
        />

        {state.error ? (
          <ErrorPage
            btnAction={{
              onClick: () => setPage(currentPage),
              text: "Refresh",
            }}
            title="Error"
            subTitle={state.error}
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
