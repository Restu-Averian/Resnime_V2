import { ArrowRight, Heart, Search, Sword } from "lucide-react";
import { Box, Grid, HStack, Text, useBreakpointValue } from "@chakra-ui/react";

const iconMap = {
  sword: Sword,
  heart: Heart,
  search: Search,
};

function HomeExploreGenreItem({ genre }) {
  const Icon = iconMap[genre.icon];
  const iconSize = useBreakpointValue({ base: 52, md: 32 });

  return (
    <Grid
      role="group"
      cursor="pointer"
      align="center"
      justifyItems={{ base: "center", md: "stretch" }}
      templateColumns={{
        base: "1fr",
        md: "42px minmax(0, 1fr) auto 22px",
      }}
      rowGap={{ base: "3", md: "2" }}
      columnGap="5"
      flex={{ base: "0 0 230px", md: "initial" }}
      w={{ base: "230px", md: "auto" }}
      minH={{ base: "212px", md: "auto" }}
      px={{ base: "7", md: "5" }}
      py={{ base: "4", md: "4" }}
      textAlign={{ base: "center", md: "left" }}
      bg={{ base: "bg.subtle", md: "transparent" }}
      border="1px solid"
      borderColor={{ base: "border.default", md: "transparent" }}
      borderBottomColor="border.subtle"
      borderRadius={{ base: "panel", md: "control" }}
      transition="all 0.2s"
      _hover={{
        borderColor: "border.emphasized",
        bg: "bg.surface",
      }}
    >
      <Box color={genre.color || "accent.primary"} transition="color 0.2s">
        <Icon size={iconSize} strokeWidth={1.25} />
      </Box>

      <Box minW="0">
        <Text
          textStyle="panelTitle"
          color="fg.heading"
          fontSize={{ base: "2xl", md: "lg" }}
          lineHeight={{ base: "1", md: "1.3" }}
        >
          {genre.name}
        </Text>

        <Text
          color="fg.muted"
          fontSize="xl"
          lineHeight={{ base: "1.35", md: "1.4" }}
          mt={{ base: "2", md: "0" }}
        >
          {genre.description}
        </Text>
      </Box>

      <HStack
        gap={{ base: "3", md: "7" }}
        color={genre.color || "fg.muted"}
        transition="color 0.2s"
      >
        <Text
          fontSize={{ base: "lg", md: "md" }}
          lineHeight="1"
          whiteSpace="nowrap"
        >
          {genre.count} Anime
        </Text>

        <Box display={{ base: "none", md: "block" }}>
          <ArrowRight size={20} strokeWidth={1.6} />
        </Box>
      </HStack>
    </Grid>
  );
}

export default HomeExploreGenreItem;
