import { Heading, HStack, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Grid2X2 } from "lucide-react";
import GenreListItem from "./GenreListItem";

const GenreLists = ({ filteredGenres, selectedGenre, selectGenre }) => {
  return (
    <Stack
      gap={4}
      p={{ base: 3, md: 5 }}
      borderRadius="10px"
      border="1px solid rgba(165, 183, 226, 0.14)"
      bg="rgba(255,255,255,0.025)"
    >
      <HStack gap={3}>
        <Icon as={Grid2X2} boxSize={5} color="#ff5f8f" />
        <Heading as="h2" fontSize="xl">
          All Genres
        </Heading>
      </HStack>
      {filteredGenres.length ? (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, "2xl": 4 }} gap={4}>
          {filteredGenres.map((item) => (
            <GenreListItem
              key={item.value}
              genre={item}
              active={item.value === selectedGenre}
              onClick={() => selectGenre(item.value)}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text color="#aeb7cb">No genres found.</Text>
      )}
    </Stack>
  );
};

export default GenreLists;
