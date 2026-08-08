import { ArrowRight, Heart, Search, Sword } from "lucide-react";
import { Box, Grid, HStack, Text } from "@chakra-ui/react";

const iconMap = {
  sword: Sword,
  heart: Heart,
  search: Search,
};

function GenreRow({ genre }) {
  const Icon = iconMap[genre.icon];
  const iconColor = genre.isSelected ? "accent.primary" : "accent.warmMuted";

  return (
    <Grid
      align="center"
      templateColumns={{
        base: "34px minmax(0, 1fr) auto",
        md: "42px minmax(0, 1fr) auto 22px",
      }}
      columnGap={{ base: "3", md: "5" }}
      rowGap="2"
      px={{ base: "4", md: "5" }}
      py={{ base: "3", md: "4" }}
      minH={{ base: "76px", md: "auto" }}
      borderRadius="control"
      border={genre.isSelected ? "1px solid" : "1px solid transparent"}
      borderColor={genre.isSelected ? "border.emphasized" : "transparent"}
      bg={genre.isSelected ? "bg.surface" : "transparent"}
      borderBottom={!genre.isSelected ? "1px solid" : undefined}
      borderBottomColor={!genre.isSelected ? "border.subtle" : undefined}
    >
      <Box color={iconColor}>
        <Icon size={32} strokeWidth={1.25} />
      </Box>

      <Box minW="0">
        <Text
          textStyle="panelTitle"
          color="fg.heading"
          fontSize={{ base: "xl", md: "lg" }}
          lineHeight={{ base: "1.1", md: "1.3" }}
        >
          {genre.name}
        </Text>

        <Text
          color="fg.muted"
          fontSize={{ base: "sm", md: "sm" }}
          lineHeight={{ base: "1.45", md: "1.4" }}
        >
          {genre.description}
        </Text>
      </Box>

      <HStack
        gap={{ base: "3", md: "7" }}
        color={genre.isSelected ? "accent.primary" : "fg.muted"}
      >
        <Text
          fontSize={{ base: "md", md: "md" }}
          lineHeight="1"
          whiteSpace="nowrap"
        >
          {genre.count}
        </Text>

        <ArrowRight size={20} strokeWidth={1.6} />
      </HStack>
    </Grid>
  );
}

export default GenreRow;
