import { Box, Flex, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import AnimeDetailsCharacterItem from "./AnimeDetailsCharacterItem";

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
        <Flex align="center" justify="space-between" gap="4">
          <Text as="h2" textStyle="sectionTitle" color="fg.heading">
            Characters & Voice Cast
          </Text>

          {characters.length > 0 && (
            <HStack gap="2" display={{ base: "none", md: "flex" }}>
              <IconButton
                aria-label="Scroll characters left"
                variant="outline"
                size="sm"
                onClick={() => scrollBy(-1)}
              >
                <ChevronLeft size={17} />
              </IconButton>

              <IconButton
                aria-label="Scroll characters right"
                variant="outline"
                size="sm"
                onClick={() => scrollBy(1)}
              >
                <ChevronRight size={17} />
              </IconButton>
            </HStack>
          )}
        </Flex>

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
