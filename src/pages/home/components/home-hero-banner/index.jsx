import { Box, Stack } from "@chakra-ui/react";
import HomeHeroBannerCopy from "./HomeHeroBannerCopy";

function HomeHeroBanner({ hero }) {
  return (
    <Box
      as="section"
      layerStyle="panel"
      minH={{ base: "280px", md: "420px", lg: "340px" }}
      overflow="hidden"
      position="relative"
      bgImage={{
        base: `linear-gradient(90deg, rgba(3, 17, 31, 0.98) 0%, rgba(3, 17, 31, 0.82) 45%, rgba(3, 17, 31, 0.1) 100%), url(${hero.imageUrl})`,
        md: `linear-gradient(90deg, rgba(3, 17, 31, 0.96) 0%, rgba(3, 17, 31, 0.8) 28%, rgba(3, 17, 31, 0.18) 62%, rgba(3, 17, 31, 0.06) 100%), url(${hero.imageUrl})`,
      }}
      bgPosition={{ base: "center", md: "62% center", lg: "center" }}
      bgRepeat="no-repeat"
      bgSize="cover"
      boxShadow="panel"
    >
      <Stack
        align="flex-start"
        gap={{ base: "0", md: "5" }}
        justify={{ base: "flex-start", md: "center" }}
        minH={{ base: "280px", md: "420px", lg: "340px" }}
        maxW={{ base: "100%", md: "580px" }}
        px={{ base: "5", md: "12" }}
        py={{ base: "6", md: "12" }}
      >
        <HomeHeroBannerCopy
          hero={hero}
          titleSize={{ base: "3xl", md: "5xl" }}
          titleMaxW={{ base: "260px", md: "620px", xl: "780px" }}
        />
      </Stack>
    </Box>
  );
}

export default HomeHeroBanner;
