import { lazy, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Box as ChakraBox,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import useFetchData from "../hooks/useFetchData";
import Loading from "../components/global/Loading";
import useChangeDocTitle from "../hooks/useChangeDocTitle";
import Box from "../components/global/Box";
import ErrorPage from "../components/global/ErrorPage";
import { sortAnime } from "../services/animeService";
import { TAB_DATAS } from "../constants/detail-anime";

const BannerHeroAnime = lazy(
  () => import("../components/detail-anime/banner-hero/BannerHeroAnime"),
);
const CharacterAnime = lazy(
  () => import("../components/detail-anime/characters/CharacterAnime"),
);
const EpisodesAnime = lazy(
  () => import("../components/detail-anime/episodes/EpisodesAnime"),
);
const OverviewAnime = lazy(
  () => import("../components/detail-anime/overview/OverviewAnime"),
);
const sortEpisodes = (episodes, direction) => {
  return [...(episodes || [])].sort((a, b) => {
    const first = Number(a?.number) || 0;
    const second = Number(b?.number) || 0;
    return direction === "episode-desc" ? second - first : first - second;
  });
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
        />
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <Box useSuspense>
            <BannerHeroAnime
              data={detailData}
              animeName={anime_name}
              onWatch={scrollToEpisodes}
            />
          </Box>

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
                {TAB_DATAS.filter(
                  (tab) =>
                    tab.id !== "characters" ||
                    detailData?.characters?.length > 0,
                ).map((tab) => {
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

            {activeTab === "overview" && (
              <Box useSuspense>
                <OverviewAnime data={detailData} />
              </Box>
            )}

            {activeTab === "characters" && (
              <Box useSuspense>
                <CharacterAnime data={detailData} />
              </Box>
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
