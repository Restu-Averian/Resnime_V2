import { Feather } from "lucide-react";
import { HStack, Stack, Text } from "@chakra-ui/react";
import GenreRow from "./global/GenreRow";

function HomeExploreGenre({ genres }) {
  return (
    <Stack
      layerStyle={{ base: "none", md: "panel" }}
      minH={{ base: "auto", md: "235px" }}
      gap={{ base: "4", md: "3" }}
      p={{ base: "0", md: "7" }}
    >
      <HStack gap={{ base: "4", md: "3" }}>
        <Feather
          size={28}
          strokeWidth={1.5}
          color="var(--resnime-colors-accent-muted)"
        />

        <Text
          textStyle="sectionTitle"
          color="fg.heading"
          fontSize={{ base: "3xl", md: "2xl" }}
          lineHeight="1"
        >
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
