import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Coffee,
  Compass,
  Crown,
  Drama,
  Grid2X2,
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
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ErrorPage from "../components/global/ErrorPage";
import Image from "../components/global/Image";
import { animePath } from "../components/home/utils";
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

const sortLabels = {
  popularity: "Popularity",
  rating: "Rating",
  title: "Title",
};

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

const getAnimeYear = (anime) =>
  String(anime?.releaseDate || anime?.season || "").match(/\d{4}/)?.[0] || "";

const inferType = (anime) => {
  const title = anime?.title?.romaji || "";
  const type = anime?.type?.trim();

  if (type) return type.toUpperCase();
  if (/ova/i.test(title)) return "OVA";
  if (/movie/i.test(title)) return "MOVIE";
  return "TV";
};

const GenreButton = ({ genre, active, onClick }) => (
  <Button
    type="button"
    justifyContent="flex-start"
    h="64px"
    px={5}
    gap={4}
    borderRadius="8px"
    border={
      active ? "1px solid #ff5f8f" : "1px solid rgba(165, 183, 226, 0.16)"
    }
    bg={
      active
        ? "linear-gradient(135deg, rgba(255, 95, 143, 0.18), rgba(255,255,255,0.045))"
        : "linear-gradient(145deg, rgba(20, 27, 50, 0.78), rgba(13, 20, 39, 0.88))"
    }
    boxShadow={active ? "0 0 0 1px rgba(255, 95, 143, 0.18)" : "none"}
    color="#f5f7ff"
    onClick={onClick}
    _hover={{
      bg: "linear-gradient(145deg, rgba(31, 39, 68, 0.9), rgba(16, 24, 44, 0.96))",
      borderColor: "rgba(255, 95, 143, 0.46)",
    }}
  >
    <Icon as={genre.icon} boxSize={5.5} color="#ff5f8f" />
    <Text flex={1} textAlign="left" fontSize="sm" fontWeight="700">
      {genre.label}
    </Text>
    {active ? <CircleCheck size={20} fill="#ff5f8f" color="#ffedf3" /> : null}
  </Button>
);

const AnimeCard = ({ anime }) => (
  <Box
    as={Link}
    to={animePath(anime)}
    display="block"
    p={2}
    borderRadius="8px"
    border="1px solid rgba(165, 183, 226, 0.14)"
    bg="linear-gradient(180deg, rgba(20, 27, 50, 0.74), rgba(11, 17, 34, 0.92))"
    minW={0}
    transition="160ms ease"
    _hover={{
      borderColor: "rgba(255, 95, 143, 0.42)",
      textDecoration: "none",
      transform: "translateY(-2px)",
    }}
  >
    <Image
      src={anime.image}
      alt={anime.title.romaji}
      w="100%"
      aspectRatio="2 / 3"
      borderRadius="7px"
      objectFit="cover"
    />
    <Stack gap={2} pt={2.5} minW={0}>
      <Text
        color="#f6f8ff"
        fontWeight="800"
        fontSize="sm"
        lineHeight="1.25"
        lineClamp={2}
      >
        {anime.title.romaji}
      </Text>
      <HStack color="#aeb7cb" fontSize="xs" gap={2} flexWrap="wrap">
        <Text>{getAnimeYear(anime) || "Anime"}</Text>
        <Text color="#6f7890">•</Text>
        <Text>{inferType(anime)}</Text>
      </HStack>
      <HStack gap={2} minH="24px">
        {anime.score ? (
          <HStack gap={1} color="#ff5f8f" fontSize="sm">
            <Sparkles size={13} fill="currentColor" />
            <Text color="#f3dbe4">{anime.score.toFixed(1)}</Text>
          </HStack>
        ) : null}
        {(anime.totalEpisodes || anime.status) && (
          <Badge
            bg="rgba(255,255,255,0.045)"
            color="#d8dcec"
            border="1px solid rgba(255,255,255,0.1)"
            borderRadius="7px"
            px={2}
            fontWeight="medium"
          >
            {anime.totalEpisodes ? `${anime.totalEpisodes} Ep` : anime.status}
          </Badge>
        )}
      </HStack>
    </Stack>
  </Box>
);

const Genres = () => {
  const navigate = useNavigate();
  const { genre } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [genreQuery, setGenreQuery] = useState("");
  const [sortMode, setSortMode] = useState("popularity");
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: "",
  });

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

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: "" });

    getAnimeByGenre(selectedGenre, currentPage, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setState({ data, loading: false, error: "" });
        }
      })
      .catch((error) => {
        if (error?.cancelled || controller.signal.aborted) return;
        setState({
          data: null,
          loading: false,
          error: error?.message || "Unable to load genre anime.",
        });
      });

    return () => controller.abort();
  }, [currentPage, selectedGenre]);

  const selectGenre = (nextGenre) => {
    navigate(`/genres/${nextGenre}`);
  };

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
      <Flex
        justify="space-between"
        align={{ base: "stretch", md: "flex-start" }}
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Stack gap={2}>
          <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} lineHeight={1}>
            Genres
          </Heading>
          <Text color="#aeb7cb">Browse anime by genre.</Text>
        </Stack>

        <InputGroup
          maxW={{ base: "100%", md: "390px" }}
          startElement={<Search size={18} />}
        >
          <Input
            ps={10}
            h="48px"
            type="search"
            borderRadius="10px"
            borderColor="rgba(165, 183, 226, 0.16)"
            bg="rgba(255,255,255,0.04)"
            placeholder="Search genres..."
            _placeholder={{ color: "#8993aa" }}
            value={genreQuery}
            onChange={({ target }) => setGenreQuery(target.value)}
          />
        </InputGroup>
      </Flex>

      <Stack
        gap={4}
        p={{ base: 3, md: 5 }}
        borderRadius="10px"
        border="1px solid rgba(165, 183, 226, 0.14)"
        bg="rgba(255,255,255,0.025)"
      >
        <HStack gap={3}>
          <Icon as={Grid2X2} boxSize={5} color="#ff5f8f" />
          <Heading as="h2" fontSize="xl">
            All Genres
          </Heading>
        </HStack>
        {filteredGenres.length ? (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, "2xl": 4 }} gap={4}>
            {filteredGenres.map((item) => (
              <GenreButton
                key={item.value}
                genre={item}
                active={item.value === selectedGenre}
                onClick={() => selectGenre(item.value)}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text color="#aeb7cb">No genres found.</Text>
        )}
      </Stack>

      <Stack
        gap={4}
        p={{ base: 3, md: 5 }}
        borderRadius="10px"
        border="1px solid rgba(165, 183, 226, 0.14)"
        bg="rgba(255,255,255,0.025)"
      >
        <Flex
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={3}
        >
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
          <HStack gap={4} justify={{ base: "space-between", md: "flex-end" }}>
            <Text color="#aeb7cb" fontSize="sm">
              {state.loading ? "Loading" : `${results.length} results`}
            </Text>
            <HStack
              gap={2}
              border="1px solid rgba(165, 183, 226, 0.14)"
              borderRadius="9px"
              px={3}
              py={1}
              bg="rgba(255,255,255,0.035)"
            >
              <Text color="#aeb7cb" fontSize="sm">
                Sort by:
              </Text>
              <Select.Root
                size="sm"
                value={[sortMode]}
                onValueChange={({ value }) =>
                  setSortMode(value?.[0] || "popularity")
                }
              >
                <Select.HiddenSelect aria-label="Sort genre results" />
                <Select.Control minW="132px" border="0">
                  <Select.Trigger bg="transparent" border="0" px={1}>
                    <Select.ValueText>{sortLabels[sortMode]}</Select.ValueText>
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content
                    bg="#08101f"
                    borderColor="rgba(255,255,255,0.14)"
                  >
                    <Select.Item item="popularity">
                      Popularity
                      <Select.ItemIndicator />
                    </Select.Item>
                    <Select.Item item="rating">
                      Rating
                      <Select.ItemIndicator />
                    </Select.Item>
                    <Select.Item item="title">
                      Title
                      <Select.ItemIndicator />
                    </Select.Item>
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </HStack>
          </HStack>
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
          <SimpleGrid columns={{ base: 2, md: 3, xl: 5, "2xl": 8 }} gap={4}>
            {Array.from({ length: 8 }, (_, index) => (
              <Skeleton key={index} aspectRatio="2 / 3" borderRadius="8px" />
            ))}
          </SimpleGrid>
        ) : results.length ? (
          <SimpleGrid columns={{ base: 2, md: 3, xl: 5, "2xl": 8 }} gap={4}>
            {results.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
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

        <HStack justify="center" gap={3}>
          <IconButton
            aria-label="Previous genre page"
            size="sm"
            borderRadius="8px"
            borderColor="rgba(255,255,255,0.16)"
            variant="outline"
            disabled={currentPage <= 1 || state.loading}
            onClick={() => setPage(currentPage - 1)}
          >
            <ChevronLeft size={18} />
          </IconButton>
          <Badge bg="#ff5f8f" color="white" borderRadius="8px" px={4} py={2}>
            Page {currentPage}
          </Badge>
          <IconButton
            aria-label="Next genre page"
            size="sm"
            borderRadius="8px"
            borderColor="rgba(255,255,255,0.16)"
            variant="outline"
            disabled={!state.data?.hasNextPage || state.loading}
            onClick={() => setPage(currentPage + 1)}
          >
            <ChevronRight size={18} />
          </IconButton>
        </HStack>
      </Stack>

      <Text color="#8993aa" textAlign="center" fontSize="sm">
        Results provided by{" "}
        <Text as="span" color="#ff5f8f" fontWeight="700">
          AniPub
        </Text>{" "}
        API • /api/findbyGenre/:genre?Page=1
      </Text>
    </Stack>
  );
};

export default Genres;
