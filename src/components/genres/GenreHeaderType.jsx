import { Flex, Heading, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { Swords } from "lucide-react";
import { GENRES } from "../../constants/genres";

const GenreHeaderType = ({
  selectedGenre,
  genreLabel,
  loading,
  resultsCount,
}) => {
  const selectedIcon =
    GENRES.find((item) => item.value === selectedGenre)?.icon || Swords;

  return (
    <Flex
      justify="space-between"
      align={{ base: "flex-start", md: "center" }}
      direction={{ base: "column", md: "row" }}
      gap={3}
    >
      <Stack gap={1}>
        <HStack gap={3}>
          <Icon as={selectedIcon} boxSize={5} color="#ff5f8f" />
          <Heading as="h2" fontSize="xl">
            {genreLabel} Anime
          </Heading>
        </HStack>
        <Text color="#aeb7cb" fontSize="sm">
          {loading ? "Loading" : `${resultsCount} results`}
        </Text>
      </Stack>
    </Flex>
  );
};

export default GenreHeaderType;
