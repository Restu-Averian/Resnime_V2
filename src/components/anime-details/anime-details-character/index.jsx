import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useRef } from "react";
import AnimeDetailsCharacterItem from "./AnimeDetailsCharacterItem";
import AnimeDetailsHeaderSection from "../AnimeDetailsHeaderSection";

function AnimeDetailsCharacters({ characters, isError }) {
  const scrollerRef = useRef(null);

  const scrollBy = (direction) => {
    scrollerRef.current?.scrollBy({
      left: direction * 520,
      behavior: "smooth",
    });
  };

  return (
    <Box as="section">
      <Stack gap="4">
        <AnimeDetailsHeaderSection
          title="Characters & Voice Cast"
          showArrows={characters.length > 0}
          onScroll={scrollBy}
        />

        {isError ? (
          <Box layerStyle="panel" p="5">
            <Text color="fg.muted">Failed to load characters.</Text>
          </Box>
        ) : characters.length === 0 ? (
          <Box layerStyle="panel" p="5">
            <Text color="fg.muted">No character data available.</Text>
          </Box>
        ) : (
          <Flex
            ref={scrollerRef}
            gap="4"
            overflowX="auto"
            pb="2"
            scrollSnapType="x proximity"
            css={{
              scrollbarWidth: "thin",
            }}
          >
            {characters.map((character) => (
              <AnimeDetailsCharacterItem
                key={character.character_id}
                character={character}
              />
            ))}
          </Flex>
        )}
      </Stack>
    </Box>
  );
}

export default AnimeDetailsCharacters;
