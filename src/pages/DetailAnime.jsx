import { lazy, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Badge,
  Box as ChakraBox,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Bookmark,
  FileText,
  ListFilter,
  Play,
  Star,
  Users,
  Video,
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
const DescriptionAnime = lazy(
  () => import("../components/detail-anime/description-anime/DescriptionAnime"),
);
const EpisodesAnime = lazy(
  () => import("../components/detail-anime/episodes-anime/EpisodesAnime"),
);
const RecommendationAnime = lazy(
  () =>
    import("../components/detail-anime/recommendation-anime/RecommendationAnime"),
);
const RelationsAnime = lazy(
  () => import("../components/detail-anime/relations-anime/RelationsAnime"),
);
const TitleAnime = lazy(
  () => import("../components/detail-anime/title-anime/TitleAnime"),
);

const tabs = [
  { id: "episodes", label: "Episodes", icon: Video },
  { id: "overview", label: "Overview", icon: FileText },
  { id: "characters", label: "Characters", icon: Users },
  { id: "reviews", label: "Reviews", icon: Star },
];

const getTitle = (data, fallback) => data?.title?.romaji || decodeURI(fallback);

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
              {data?.totalEpisodes && <Text>{data.totalEpisodes} Episodes</Text>}
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
              <HStack as="div" role="tablist" gap={{ base: 1, md: 5 }} overflowX="auto">
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
                        active
                          ? "2px solid #ff6d8f"
                          : "2px solid transparent"
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

              {activeTab === "episodes" && (
                <HStack
                  align="center"
                  gap={2}
                  border="1px solid rgba(255,255,255,0.14)"
                  borderRadius="10px"
                  px={3}
                  py={2}
                  bg="rgba(255,255,255,0.03)"
                >
                  <ListFilter size={16} color="#cbd5e1" />
                  <Text color="gray.300" fontSize="sm">
                    Sort
                  </Text>
                  <Select.Root
                    size="sm"
                    value={[sortMode]}
                    onValueChange={({ value }) => {
                      setSortMode(value?.[0] || "episode-asc");
                    }}
                  >
                    <Select.HiddenSelect aria-label="Sort episodes" />
                    <Select.Control minW="140px" border="0">
                      <Select.Trigger bg="transparent" border="0" px={1}>
                        <Select.ValueText placeholder="Episode" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content bg="#08101f" borderColor="rgba(255,255,255,0.14)">
                        <Select.Item item="episode-asc">
                          Episode
                          <Select.ItemIndicator />
                        </Select.Item>
                        <Select.Item item="episode-desc">
                          Latest
                          <Select.ItemIndicator />
                        </Select.Item>
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                </HStack>
              )}
            </Flex>

            {activeTab === "episodes" && (
              <Stack gap={3}>
                {sortError && (
                  <Text color="#ffb3c4" fontSize="sm">
                    {sortError}
                  </Text>
                )}
                <Box showIf={sortedDetailData?.episodes?.length > 0} useSuspense>
                  <EpisodesAnime data={sortedDetailData} />
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

            {activeTab === "overview" && (
              <Stack gap={7}>
                <Box useSuspense>
                  <TitleAnime data={detailData} />
                </Box>
                <Box useSuspense>
                  <DescriptionAnime data={detailData} />
                </Box>
                <Box showIf={detailData?.relations?.length > 0} useSuspense>
                  <RelationsAnime data={detailData} />
                </Box>
                <Box showIf={detailData?.recommendations?.length > 0} useSuspense>
                  <RecommendationAnime data={detailData} />
                </Box>
              </Stack>
            )}

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
