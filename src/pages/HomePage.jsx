import { Box, Container, Grid, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import HomeExploreGenre from "../components/home/home-explore-genre";
import HomeFinderAnime from "../components/home/home-finder-anime/HomeFinderAnime";
import HomeHeroBanner from "../components/home/home-hero-banner";
import HomePicksSection from "../components/home/home-picks";
import HomeSkeleton from "../components/skeletons/home";
import { FINDER_PROMO } from "../constants/home";
import { getHomeData } from "../services/home.service";

function HomePage() {
  const {
    data: homeData,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["home"],
    queryFn: getHomeData,
  });

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "0" }}>
      <Container maxW="1600px" px={{ base: "4", md: "5", xl: "10" }} py="3">
        <Stack gap={{ base: "7", md: "4" }}>
          {error && (
            <Box p="4" bg="red.500" color="white" borderRadius="md">
              <Text>Failed to load data: {error}</Text>
            </Box>
          )}

          {isLoading ? (
            <HomeSkeleton />
          ) : (
            <>
              {homeData?.featured && Object.keys(homeData.featured).length > 0 && (
                <HomeHeroBanner hero={homeData.featured} />
              )}

              {homeData?.tonights_picks && homeData.tonights_picks.length > 0 && (
                <HomePicksSection picks={homeData.tonights_picks} />
              )}

              <Grid
                templateColumns={{
                  base: "minmax(0, 1fr)",
                  lg: "repeat(2, minmax(0, 1fr))",
                }}
                gap={{ base: "7", md: "4" }}
                minW="0"
              >
                <HomeFinderAnime promo={FINDER_PROMO} />

                {homeData?.genres && homeData.genres.length > 0 && (
                  <HomeExploreGenre genres={homeData.genres} />
                )}
              </Grid>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default HomePage;
