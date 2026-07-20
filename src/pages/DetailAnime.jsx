import { lazy, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Badge,
  Box as ChakraBox,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Bookmark,
  BookOpen,
  Building2,
  CalendarDays,
  CircleCheck,
  FileText,
  Flame,
  Heart,
  Info,
  ListVideo,
  Play,
  Sparkles,
  Star,
  SunMedium,
  Tag,
  Users,
  Video,
  Zap,
} from "lucide-react";
import useFetchData from "../hooks/useFetchData";
import Loading from "../components/global/Loading";
import useChangeDocTitle from "../hooks/useChangeDocTitle";
import Box from "../components/global/Box";
import ErrorPage from "../components/global/ErrorPage";
import imageError from "../assets/image_error.png";
import { sortAnime } from "../services/animeService";

const CharacterAnime = lazy(
  () => import("../components/detail-anime/character-anime/CharacterAnime"),
);
const EpisodesAnime = lazy(
  () => import("../components/detail-anime/episodes-anime/EpisodesAnime"),
);

const tabs = [
  { id: "episodes", label: "Episodes", icon: Video },
  { id: "overview", label: "Overview", icon: FileText },
  { id: "characters", label: "Characters", icon: Users },
  { id: "reviews", label: "Reviews", icon: Star },
];

const getTitle = (data, fallback) => data?.title?.romaji || decodeURI(fallback);

const emptyValue = "Unknown";

const cleanDescription = (description) =>
  description?.replace(/<[^>]*>/g, "").trim() || "No story summary available.";

const toDisplayValue = (value) => {
  if (Array.isArray(value)) return value.length ? value.join(", ") : emptyValue;
  return value || emptyValue;
};

const sortEpisodes = (episodes, direction) => {
  return [...(episodes || [])].sort((a, b) => {
    const first = Number(a?.number) || 0;
    const second = Number(b?.number) || 0;
    return direction === "episode-desc" ? second - first : first - second;
  });
};

const DetailHero = ({ data, animeName, onWatch }) => {
  const title = getTitle(data, animeName);
  const genres = data?.genres?.slice(0, 5) || [];

  return (
    <ChakraBox
      minH={{ base: "680px", md: "500px" }}
      borderRadius="16px"
      overflow="hidden"
      border="1px solid rgba(255,255,255,0.12)"
      bgImage={`linear-gradient(90deg, rgba(4, 8, 22, 0.98) 0%, rgba(7, 11, 27, 0.88) 38%, rgba(7, 11, 27, 0.58) 100%), url(${data?.cover || data?.image})`}
      bgSize="cover"
      bgPos="center"
      boxShadow="0 24px 80px rgba(0,0,0,0.38)"
      position="relative"
    >
      <Flex
        minH={{ base: "680px", md: "500px" }}
        align="center"
        gap={{ base: 6, lg: 9 }}
        direction={{ base: "column", md: "row" }}
        px={{ base: 5, md: 10, xl: 14 }}
        py={{ base: 8, md: 10 }}
      >
        <Image
          src={data?.image}
          alt={title}
          w={{ base: "210px", md: "240px" }}
          aspectRatio="2 / 3"
          objectFit="cover"
          borderRadius="16px"
          border="1px solid rgba(255,255,255,0.18)"
          boxShadow="0 18px 60px rgba(0,0,0,0.45)"
        />

        <Stack
          gap={4}
          w="full"
          maxW={{ base: "300px", md: "680px" }}
          minW={0}
          align={{ base: "center", md: "flex-start" }}
        >
          <Stack gap={2} w="full" textAlign={{ base: "center", md: "left" }}>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl" }}
              lineHeight={1.05}
              maxW="full"
              overflowWrap="anywhere"
            >
              {title}
            </Heading>
            <Stack
              direction={{ base: "column", md: "row" }}
              gap={3}
              color="gray.200"
              align={{ base: "center", md: "flex-start" }}
              maxW="full"
            >
              {data?.averageScore && (
                <HStack gap={1} color="#ffd166">
                  <Star size={18} fill="currentColor" />
                  <Text fontWeight="bold">{data.averageScore}</Text>
                </HStack>
              )}
              {data?.releaseDate && <Text>{data.releaseDate}</Text>}
              {data?.totalEpisodes && (
                <Text>{data.totalEpisodes} Episodes</Text>
              )}
              {data?.type && <Text>{data.type}</Text>}
            </Stack>
          </Stack>

          <Stack
            direction={{ base: "column", md: "row" }}
            gap={5}
            color="gray.300"
            fontSize="sm"
            align={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
            maxW="full"
          >
            {data?.status && <Text>Status {data.status}</Text>}
            {data?.season && <Text>Season {data.season}</Text>}
            {data?.studios?.length > 0 && (
              <Text>Studio {data.studios.join(", ")}</Text>
            )}
          </Stack>

          <Text
            color="gray.200"
            lineClamp={4}
            maxW="full"
            textAlign={{ base: "center", md: "left" }}
            overflowWrap="anywhere"
          >
            {data?.description}
          </Text>

          <HStack
            gap={2}
            wrap="wrap"
            justify={{ base: "center", md: "flex-start" }}
            maxW="full"
          >
            {genres.map((genre) => (
              <Badge
                key={genre}
                px={3}
                py={1}
                borderRadius="full"
                bg="rgba(255,255,255,0.09)"
                color="gray.100"
                border="1px solid rgba(255,255,255,0.13)"
              >
                {genre}
              </Badge>
            ))}
          </HStack>

          <HStack
            gap={3}
            pt={2}
            wrap="wrap"
            justify={{ base: "center", md: "flex-start" }}
            maxW="full"
          >
            <Button
              onClick={onWatch}
              disabled={!data?.episodes?.length}
              bg="#ff6d8f"
              color="white"
              borderRadius="12px"
              px={7}
              _hover={{ bg: "#ff7fa0" }}
            >
              <Play size={18} fill="currentColor" />
              Watch Now
            </Button>
            <Button
              variant="outline"
              borderRadius="12px"
              color="white"
              borderColor="rgba(255,109,143,0.5)"
            >
              <Bookmark size={18} />
              Bookmark
            </Button>
          </HStack>
        </Stack>
      </Flex>
    </ChakraBox>
  );
};

const DetailOverview = ({ data }) => {
  const description = cleanDescription(data?.description);
  const infoItems = [
    { label: "Genres", value: data?.genres, icon: Tag },
    { label: "Status", value: data?.status, icon: CircleCheck },
    { label: "Release Date", value: data?.releaseDate, icon: CalendarDays },
    { label: "Season", value: data?.season, icon: SunMedium },
    { label: "Studio", value: data?.studios, icon: Building2 },
    { label: "Type", value: data?.type, icon: Video },
    { label: "Episodes", value: data?.totalEpisodes, icon: ListVideo },
  ];
  const episodeLabel =
    data?.totalEpisodes &&
    `${data.totalEpisodes} Episode${Number(data.totalEpisodes) === 1 ? "" : "s"}`;
  const storyBadges = [
    { label: data?.type, icon: BookOpen },
    { label: data?.status, icon: Zap },
    { label: data?.genres?.[0], icon: Flame },
    { label: episodeLabel, icon: Heart },
  ].filter(({ label }) => label);

  return (
    <Stack gap={4}>
      <Stack gap={1}>
        <HStack gap={2}>
          <Sparkles size={20} color="#ff6d8f" fill="rgba(255,109,143,0.28)" />
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            lineHeight={1.1}
          >
            Overview
          </Heading>
        </HStack>
        <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
          Learn more about the story, world, and production.
        </Text>
      </Stack>

      <Grid templateColumns={{ base: "1fr", xl: "1.42fr 1fr" }} gap={7}>
        <GridItem minW={0}>
          <ChakraBox
            minH="310px"
            border="1px solid rgba(255,109,143,0.22)"
            borderRadius="14px"
            bgImage={`linear-gradient(90deg, rgba(10, 14, 33, 0.96) 0%, rgba(4, 6, 17, 0.85) 75%, rgba(2, 3, 10, 0.74) 100%), url(${data?.cover || data?.image})`}
            bgSize="cover"
            bgPos="center"
            boxShadow="inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 55px rgba(0,0,0,0.24)"
            overflow="hidden"
            px={{ base: 5, md: 6 }}
            py={{ base: 5, md: 6 }}
          >
            <Stack gap={5} h="full" justify="space-between">
              <Stack gap={4}>
                <HStack gap={3} color="#ff8daf">
                  <BookOpen size={23} />
                  <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
                    Story Summary
                  </Heading>
                </HStack>
                <Text
                  color="gray.100"
                  fontSize={{ base: "sm", md: "md" }}
                  lineHeight="1.75"
                  maxW="760px"
                  whiteSpace="pre-line"
                  lineClamp={8}
                >
                  {description}
                </Text>
              </Stack>

              <HStack gap={2} wrap="wrap">
                {storyBadges.map(({ label, icon }) => (
                  <HStack
                    key={label}
                    gap={2}
                    px={3}
                    py={2}
                    borderRadius="9px"
                    border="1px solid rgba(255,109,143,0.18)"
                    bg="rgba(255,255,255,0.045)"
                    color="gray.100"
                    fontSize="sm"
                  >
                    <Icon as={icon} boxSize={4} color="#ff6d8f" />
                    <Text>{label}</Text>
                  </HStack>
                ))}
              </HStack>
            </Stack>
          </ChakraBox>
        </GridItem>

        <GridItem minW={0}>
          <ChakraBox
            minH="310px"
            border="1px solid rgba(255,109,143,0.2)"
            borderRadius="14px"
            bg="rgba(15, 18, 43, 0.82)"
            boxShadow="inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 55px rgba(0,0,0,0.22)"
            px={{ base: 5, md: 6 }}
            py={{ base: 5, md: 6 }}
          >
            <Stack gap={4}>
              <HStack gap={3} color="#ffc1d2">
                <Info size={22} color="#ff6d8f" />
                <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
                  Information
                </Heading>
              </HStack>

              <Stack gap={0}>
                {infoItems.map(({ label, value, icon }) => (
                  <Flex
                    key={label}
                    align="center"
                    justify="space-between"
                    gap={4}
                    py={2.5}
                    borderBottom="1px solid rgba(255,255,255,0.07)"
                    _last={{ borderBottom: 0 }}
                  >
                    <HStack gap={3} minW={0} color="gray.400">
                      <Icon as={icon} boxSize={4} color="gray.300" />
                      <Text fontSize="sm">{label}</Text>
                    </HStack>
                    <Text
                      color="gray.100"
                      fontSize="sm"
                      textAlign="right"
                      overflowWrap="anywhere"
                    >
                      {toDisplayValue(value)}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Stack>
          </ChakraBox>
        </GridItem>
      </Grid>
    </Stack>
  );
};

const DetailAnime = () => {
  const { id, anime_name } = useParams();
  const { pathname, state } = useLocation();
  const [activeTab, setActiveTab] = useState("episodes");
  const [sortMode, setSortMode] = useState("episode-asc");
  const [sortError, setSortError] = useState("");

  const {
    data: detailData,
    loading,
    error,
    refetch,
  } = useFetchData(`/anime/${id}`);

  useChangeDocTitle(`Resnime | ${decodeURI(anime_name)}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!detailData?.id) return;

    const controller = new AbortController();
    setSortError("");

    sortAnime(
      {
        name: detailData?.title?.romaji,
        genre: detailData?.genres?.join(","),
        page: 1,
      },
      controller.signal,
    ).catch((err) => {
      if (!err?.cancelled && !controller.signal.aborted) {
        setSortError(err?.message || "Unable to sync sort.");
      }
    });

    return () => controller.abort();
  }, [detailData?.genres, detailData?.id, detailData?.title?.romaji, sortMode]);

  const sortedDetailData = useMemo(
    () => ({
      ...detailData,
      episodes: sortEpisodes(detailData?.episodes, sortMode),
    }),
    [detailData, sortMode],
  );

  const scrollToEpisodes = () => {
    setActiveTab("episodes");
    requestAnimationFrame(() => {
      document.getElementById("detail-tabs")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <Stack direction="column" gap={7} maxW="1680px" mx="auto">
      {state && (
        <Link to={state?.prevPath}>
          <Box>
            <Button>Back</Button>
          </Box>
        </Link>
      )}

      {error ? (
        <ErrorPage
          btnAction={{
            onClick: refetch,
            text: "Refresh",
          }}
          title="Error"
          subTitle={error}
          src={imageError}
        />
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <DetailHero
            data={detailData}
            animeName={anime_name}
            onWatch={scrollToEpisodes}
          />

          <ChakraBox id="detail-tabs">
            <Flex
              align={{ base: "stretch", md: "center" }}
              justify="space-between"
              direction={{ base: "column", md: "row" }}
              gap={4}
              borderBottom="1px solid rgba(255,255,255,0.1)"
              mb={5}
            >
              <HStack
                as="div"
                role="tablist"
                gap={{ base: 1, md: 5 }}
                overflowX="auto"
              >
                {tabs.map((tab) => {
                  const active = activeTab === tab.id;

                  return (
                    <Button
                      key={tab.id}
                      role="tab"
                      aria-selected={active}
                      variant="ghost"
                      borderRadius={0}
                      px={{ base: 3, md: 4 }}
                      color={active ? "#ff6d8f" : "gray.300"}
                      borderBottom={
                        active ? "2px solid #ff6d8f" : "2px solid transparent"
                      }
                      onClick={() => setActiveTab(tab.id)}
                      _hover={{
                        bg: "rgba(255,255,255,0.06)",
                        color: active ? "#ff6d8f" : "white",
                      }}
                    >
                      <Icon as={tab.icon} boxSize={4} />
                      {tab.label}
                    </Button>
                  );
                })}
              </HStack>

            </Flex>

            {activeTab === "episodes" && (
              <Stack gap={3}>
                {sortError && (
                  <Text color="#ffb3c4" fontSize="sm">
                    {sortError}
                  </Text>
                )}
                <Box
                  showIf={sortedDetailData?.episodes?.length > 0}
                  useSuspense
                >
                  <EpisodesAnime
                    data={sortedDetailData}
                    sortMode={sortMode}
                    setSortMode={setSortMode}
                  />
                </Box>
                {!sortedDetailData?.episodes?.length && (
                  <ChakraBox
                    minH="160px"
                    display="grid"
                    placeItems="center"
                    border="1px solid rgba(255,255,255,0.1)"
                    borderRadius="12px"
                    color="gray.400"
                  >
                    No episodes available.
                  </ChakraBox>
                )}
              </Stack>
            )}

            {activeTab === "overview" && <DetailOverview data={detailData} />}

            {activeTab === "characters" && (
              <>
                <Box showIf={detailData?.characters?.length > 0} useSuspense>
                  <CharacterAnime data={detailData} />
                </Box>
                {!detailData?.characters?.length && (
                  <ChakraBox
                    minH="160px"
                    display="grid"
                    placeItems="center"
                    border="1px solid rgba(255,255,255,0.1)"
                    borderRadius="12px"
                    color="gray.400"
                  >
                    No characters available.
                  </ChakraBox>
                )}
              </>
            )}

            {activeTab === "reviews" && (
              <ChakraBox
                minH="160px"
                display="grid"
                placeItems="center"
                border="1px solid rgba(255,255,255,0.1)"
                borderRadius="12px"
                color="gray.400"
              >
                No reviews available.
              </ChakraBox>
            )}
          </ChakraBox>

          <Box
            showIf={
              detailData?.id &&
              !detailData?.episodes?.length &&
              detailData?.streamingStatus === "error"
            }
          >
            <Stack align="center" spacing={3}>
              <Text textAlign="center">
                {detailData?.streamingError ||
                  "Unable to check streaming availability."}
              </Text>
              <Button onClick={refetch}>Retry</Button>
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
};
export default DetailAnime;
