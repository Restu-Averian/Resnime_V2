import { Grid } from "@chakra-ui/react";
import HomeHeroBannerSkeleton from "./home-hero-banner/HomeHeroBannerSkeleton";
import HomePicksSkeleton from "./home-picks/HomePicksSkeleton";
import HomeFinderAnimeSkeleton from "./HomeFinderAnimeSkeleton";
import HomeExploreGenreSkeleton from "./home-explore-genre/HomeExploreGenreSkeleton";

function HomeSkeleton() {
  return (
    <>
      <HomeHeroBannerSkeleton />
      <HomePicksSkeleton />
      <Grid
        templateColumns={{
          base: "minmax(0, 1fr)",
          lg: "repeat(2, minmax(0, 1fr))",
        }}
        gap={{ base: "7", md: "4" }}
        minW="0"
      >
        <HomeFinderAnimeSkeleton />
        <HomeExploreGenreSkeleton />
      </Grid>
    </>
  );
}

export default HomeSkeleton;
