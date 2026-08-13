import { Grid } from "@chakra-ui/react";
import HomeHeroBannerSkeleton from "./HomeHeroBannerSkeleton";
import HomePicksSkeleton from "./HomePicksSkeleton";
import HomeFinderAnimeSkeleton from "./HomeFinderAnimeSkeleton";
import HomeExploreGenreSkeleton from "./HomeExploreGenreSkeleton";

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
