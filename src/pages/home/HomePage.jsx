import { Box, Container, Grid, Stack } from "@chakra-ui/react";
import HomeExploreGenre from "./components/HomeExploreGenre";
import HomeFinderAnime from "./components/HomeFinderAnime";
import HomeHeroBanner from "./components/home-hero-banner";
import HomeNavbar from "./components/HomeNavbar";
import HomePicksSection from "./components/HomePicksSection";
import {
  animeThumbnail,
  finderPromo,
  genres,
  hero,
  navItems,
  tonightPicks,
} from "./data/home.data";

function HomePage() {
  return (
    <Box minH="100vh" bg="bg.canvas">
      <HomeNavbar items={navItems} />

      <Container maxW="1600px" px={{ base: "4", md: "5", xl: "10" }} py="3">
        <Stack gap={{ base: "7", md: "4" }}>
          <HomeHeroBanner hero={hero} />
          <HomePicksSection picks={tonightPicks} imageUrl={animeThumbnail} />

          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: "7", md: "4" }}
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
