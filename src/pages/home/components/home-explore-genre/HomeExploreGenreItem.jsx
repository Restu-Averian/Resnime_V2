import { ArrowRight, Heart, Search, Sword } from "lucide-react";
import { Box, Grid, HStack, Text, useBreakpointValue } from "@chakra-ui/react";

const iconMap = {
  sword: Sword,
  heart: Heart,
  search: Search,
};

function HomeExploreGenreItem({ genre }) {
  const Icon = iconMap[genre.icon];
  const iconSize = useBreakpointValue({ base: 44, md: 32 });

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
      rowGap={{ base: "2.5", md: "2" }}
      columnGap="5"
      flex={{ base: "0 0 205px", sm: "0 0 220px", md: "initial" }}
      w={{ base: "205px", sm: "220px", md: "auto" }}
      minH={{ base: "176px", sm: "188px", md: "auto" }}
      px={{ base: "5", sm: "6", md: "5" }}
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
          fontSize={{ base: "xl", md: "lg" }}
          lineHeight={{ base: "1.15", md: "1.3" }}
          noOfLines={1}
        >
          {genre.name}
        </Text>

        <Text
          color="fg.muted"
          fontSize={{ base: "sm", md: "sm", xl: "md" }}
          lineHeight={{ base: "1.45", md: "1.4" }}
          mt={{ base: "2", md: "0" }}
          noOfLines={{ base: 2, md: 1, xl: 2 }}
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
          fontSize={{ base: "sm", md: "sm", xl: "md" }}
          lineHeight="1.2"
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
