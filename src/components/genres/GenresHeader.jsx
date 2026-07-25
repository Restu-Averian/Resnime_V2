import {
  Heading,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Search } from "lucide-react";

const GenresHeader = ({ genreQuery, setGenreQuery }) => {
  return (
    <Stack gap={5}>
      <Stack gap={1}>
        <Heading as="h1" fontSize="2xl" fontWeight="700">
          Browse Genres
        </Heading>
        <Text color="#aeb7cb" fontSize="sm">
          Explore anime by genre.
        </Text>
      </Stack>

      <InputGroup startElement={<Search size={18} color="#8993aa" />}>
        <Input
          ps={10}
          h="44px"
          type="search"
          fontSize="sm"
          borderRadius="12px"
          borderColor="rgba(165, 183, 226, 0.12)"
          bg="rgba(255,255,255,0.02)"
          placeholder="Search genres..."
          _placeholder={{ color: "#8993aa" }}
          value={genreQuery}
          onChange={({ target }) => setGenreQuery(target.value)}
          _hover={{ borderColor: "rgba(165, 183, 226, 0.24)" }}
          _focus={{ borderColor: "#ff5f8f", boxShadow: "0 0 0 1px #ff5f8f" }}
        />
      </InputGroup>
    </Stack>
  );
};

export default GenresHeader;
