import { Box, Container, Grid, Stack } from "@chakra-ui/react";
import HomeExploreGenre from "./components/home-explore-genre";
import HomeFinderAnime from "./components/HomeFinderAnime";
import HomeHeroBanner from "./components/home-hero-banner";
import HomePicksSection from "./components/home-picks";
import {
  animeThumbnail,
  finderPromo,
  genres,
  hero,
  tonightPicks,
} from "./data/home.data";

function HomePage() {
  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "0" }}>
      <Container maxW="1600px" px={{ base: "4", md: "5", xl: "10" }} py="3">
        <Stack gap={{ base: "7", md: "4" }}>
          <HomeHeroBanner hero={hero} />

          <HomePicksSection picks={tonightPicks} imageUrl={animeThumbnail} />

          <Grid
            templateColumns={{
              base: "minmax(0, 1fr)",
              lg: "repeat(2, minmax(0, 1fr))",
            }}
            gap={{ base: "7", md: "4" }}
            minW="0"
          >
            <HomeFinderAnime promo={finderPromo} />

            <HomeExploreGenre genres={genres} />
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

export default HomePage;
