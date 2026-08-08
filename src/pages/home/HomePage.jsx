import { Box, Container, Grid, Stack } from "@chakra-ui/react";
import HomeExploreGenre from "./components/HomeExploreGenre";
import HomeFinderAnime from "./components/HomeFinderAnime";
import HomeHeroBanner from "./components/HomeHeroBanner";
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

      <Container maxW="1600px" px={{ base: "5", xl: "10" }} py="3">
        <Stack gap="4">
          <HomeHeroBanner hero={hero} />
          <HomePicksSection picks={tonightPicks} imageUrl={animeThumbnail} />

          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="4">
            <HomeFinderAnime promo={finderPromo} />

            <HomeExploreGenre genres={genres} />
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

export default HomePage;
