import { lazy, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Stack, Text } from "@chakra-ui/react";
import useFetchData from "../hooks/useFetchData";
import Loading from "../components/global/Loading";
import useChangeDocTitle from "../hooks/useChangeDocTitle";
import Box from "../components/global/Box";
import ErrorPage from "../components/global/ErrorPage";
import imageError from "../assets/image_error.png";

const CoverAnime = lazy(
  () => import("../components/detail-anime/cover-anime/CoverAnime"),
);
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

const DetailAnime = () => {
  const { id, anime_name } = useParams();
  const { pathname, state } = useLocation();

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

  return (
    <Stack direction="column" spacing={10}>
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
          <Box useSuspense height={480}>
            <CoverAnime src={detailData?.image} srcBg={detailData?.cover} />
          </Box>

          <Box useSuspense>
            <TitleAnime data={detailData} />
          </Box>

          <Box useSuspense>
            <DescriptionAnime data={detailData} />
          </Box>

          <Box showIf={detailData?.episodes?.length > 0} useSuspense>
            <EpisodesAnime data={detailData} />
          </Box>

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

          <Box showIf={detailData?.relations?.length > 0} useSuspense>
            <RelationsAnime data={detailData} />
          </Box>

          <Box showIf={detailData?.characters?.length > 0} useSuspense>
            <CharacterAnime data={detailData} />
          </Box>

          <Box showIf={detailData?.recommendations?.length > 0} useSuspense>
            <RecommendationAnime data={detailData} />
          </Box>
        </>
      )}
    </Stack>
  );
};
export default DetailAnime;
