import { Feather } from "lucide-react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import HomeExploreGenreItem from "./HomeExploreGenreItem";
import HomeSectionHeader from "../HomeSectionHeader";
import { GENRE_METADATA } from "../../../constants/home";

function HomeExploreGenre({ genres }) {
  const enhancedGenres = genres.map(g => ({
    ...g,
    ...(GENRE_METADATA[g.name] || {
      description: "Explore this genre and find your next favorite anime.",
      icon: "search",
      color: "fg.muted"
    })
  }));
  return (
    <Stack
      layerStyle={{ base: "none", md: "panel" }}
      minH={{ base: "auto", md: "235px" }}
      gap={{ base: "4", md: "3" }}
      minW="0"
      p={{ base: "0", md: "7" }}
    >
      <HomeSectionHeader icon={Feather} title="Explore by Genre" />

      <Box
        w="full"
        maxW="full"
        minW="0"
        overflowX={{ base: "auto", md: "visible" }}
        pb={{ base: "1", md: "0" }}
        css={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <HStack
          align="stretch"
          gap={{ base: "3", md: "0" }}
          w={{ base: "max-content", md: "auto" }}
          flexDirection={{ base: "row", md: "column" }}
        >
          {enhancedGenres.map((genre) => (
            <HomeExploreGenreItem key={genre.name} genre={genre} />
          ))}
        </HStack>
      </Box>
    </Stack>
  );
}

export default HomeExploreGenre;
