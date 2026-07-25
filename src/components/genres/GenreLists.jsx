import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import GenreListItem from "./GenreListItem";

const GenreLists = ({ filteredGenres, selectedGenre }) => {
  const navigate = useNavigate();

  return (
    <Stack gap={4}>
      {filteredGenres.length ? (
        <SimpleGrid columns={{ base: 2, md: 3 }} gap={3}>
          {filteredGenres.map((item) => (
            <GenreListItem
              key={item.value}
              genre={item}
              active={item.value === selectedGenre}
              onClick={() => navigate(`/genres/${item.value}`)}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text color="#aeb7cb" fontSize="sm" textAlign="center" py={4}>
          No genres found.
        </Text>
      )}
    </Stack>
  );
};

export default GenreLists;
