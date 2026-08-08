import { Feather } from "lucide-react";
import { HStack, Stack, Text } from "@chakra-ui/react";
import GenreRow from "./global/GenreRow";

function HomeExploreGenre({ genres }) {
  return (
    <Stack layerStyle="panel" minH="235px" gap="3" p={{ base: "6", md: "7" }}>
      <HStack gap="3">
        <Feather
          size={19}
          strokeWidth={1.5}
          color="var(--resnime-colors-accent-muted)"
        />

        <Text textStyle="sectionTitle" color="fg.heading">
          Explore by Genre
        </Text>
      </HStack>

      <Stack gap="0">
        {genres.map((genre) => (
          <GenreRow key={genre.name} genre={genre} />
        ))}
      </Stack>
    </Stack>
  );
}

export default HomeExploreGenre;
