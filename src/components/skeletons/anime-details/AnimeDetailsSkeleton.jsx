import { Box, Container, Grid, Stack } from "@chakra-ui/react";
import AnimeDetailsSkeletonHero from "./AnimeDetailsSkeletonHero";
import AnimeDetailsSkeletonSynopsis from "./AnimeDetailsSkeletonSynopsis";
import AnimeDetailsSkeletonOverview from "./AnimeDetailsSkeletonOverview";
import AnimeDetailsSkeletonEpisodes from "./AnimeDetailsSkeletonEpisodes";
import AnimeDetailsSkeletonCharacters from "./AnimeDetailsSkeletonCharacters";

function AnimeDetailsSkeleton() {
  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
      <AnimeDetailsSkeletonHero />

      <Container maxW="1440px" px={{ base: "4", md: "8", xl: "12" }} py="10">
        <Stack gap="10">
          <Grid
            templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 360px" }}
            gap="6"
          >
            <AnimeDetailsSkeletonSynopsis />

            <AnimeDetailsSkeletonOverview />
          </Grid>

          <AnimeDetailsSkeletonEpisodes />

          <AnimeDetailsSkeletonCharacters />
        </Stack>
      </Container>
    </Box>
  );
}

export default AnimeDetailsSkeleton;
