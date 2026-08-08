import { ArrowRight, Heart, Search, Sword } from "lucide-react";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";

const iconMap = {
  sword: Sword,
  heart: Heart,
  search: Search,
};

function GenreRow({ genre }) {
  const Icon = iconMap[genre.icon];
  const iconColor = genre.isSelected ? "accent.primary" : "accent.warmMuted";

  return (
    <Flex
      align="center"
      gap="5"
      px="5"
      py="4"
      borderRadius="control"
      border={genre.isSelected ? "1px solid" : "1px solid transparent"}
      borderColor={genre.isSelected ? "border.emphasized" : "transparent"}
      bg={genre.isSelected ? "bg.surface" : "transparent"}
      borderBottom={!genre.isSelected ? "1px solid" : undefined}
      borderBottomColor={!genre.isSelected ? "border.subtle" : undefined}
    >
      <Box color={iconColor} flex="0 0 auto">
        <Icon size={34} strokeWidth={1.25} />
      </Box>

      <Box flex="1" minW="0">
        <Text textStyle="panelTitle" color="fg.heading">
          {genre.name}
        </Text>

        <Text color="fg.muted" fontSize="sm" noOfLines={1}>
          {genre.description}
        </Text>
      </Box>

      <HStack
        gap="7"
        flex="0 0 auto"
        color={genre.isSelected ? "accent.primary" : "fg.muted"}
      >
        <Text fontSize="md" whiteSpace="nowrap">
          {genre.count}
        </Text>

        <ArrowRight size={20} strokeWidth={1.6} />
      </HStack>
    </Flex>
  );
}

export default GenreRow;
