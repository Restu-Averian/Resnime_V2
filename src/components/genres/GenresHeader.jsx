import { Flex, Heading, Input, InputGroup, Stack, Text } from "@chakra-ui/react";
import { Search } from "lucide-react";

const GenresHeader = ({ genreQuery, setGenreQuery }) => {
  return (
    <Flex
      justify="space-between"
      align={{ base: "stretch", md: "flex-start" }}
      direction={{ base: "column", md: "row" }}
      gap={4}
    >
      <Stack gap={2}>
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} lineHeight={1}>
          Genres
        </Heading>
        <Text color="#aeb7cb">Browse anime by genre.</Text>
      </Stack>

      <InputGroup
        maxW={{ base: "100%", md: "390px" }}
        startElement={<Search size={18} />}
      >
        <Input
          ps={10}
          h="48px"
          type="search"
          borderRadius="10px"
          borderColor="rgba(165, 183, 226, 0.16)"
          bg="rgba(255,255,255,0.04)"
          placeholder="Search genres..."
          _placeholder={{ color: "#8993aa" }}
          value={genreQuery}
          onChange={({ target }) => setGenreQuery(target.value)}
        />
      </InputGroup>
    </Flex>
  );
};

export default GenresHeader;
