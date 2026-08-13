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
        base: `linear-gradient(90deg, rgba(3, 17, 31, 0.98) 0%, rgba(3, 17, 31, 0.82) 45%, rgba(3, 17, 31, 0.1) 100%), url(${hero?.banner_bg_img})`,
        md: `linear-gradient(90deg, rgba(3, 17, 31, 0.96) 0%, rgba(3, 17, 31, 0.8) 28%, rgba(3, 17, 31, 0.18) 62%, rgba(3, 17, 31, 0.06) 100%), url(${hero?.banner_bg_img})`,
      }}
      bgPosition={{ base: "63% center", md: "62% center", lg: "center" }}
      bgRepeat="no-repeat"
      bgSize="cover"
      boxShadow="panel"
    >
      <Stack
        align="flex-start"
        gap={{ base: "0", md: "5" }}
        justify={{ base: "flex-start", md: "center" }}
        minH={{ base: "280px", md: "420px", lg: "340px" }}
        px={{ base: "5", md: "12" }}
        py={{ base: "6", md: "12" }}
      >
        <HomeHeroBannerCopy
          hero={hero}
          titleSize={{ base: "2xl", sm: "3xl", md: "4xl", xl: "5xl" }}
        />
      </Stack>
    </Box>
  );
}

export default HomeHeroBanner;
