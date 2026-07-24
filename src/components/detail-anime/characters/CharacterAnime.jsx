import { useState } from "react";
import { Box, Flex, Drawer, useBreakpointValue } from "@chakra-ui/react";
import CharacterAnimeList from "./CharacterAnimeList";
import CharacterAnimeVoiceActors from "./CharacterAnimeVoiceActors";

const CharacterAnime = ({ data }) => {
  const characters = Array.isArray(data?.characters) ? data.characters : [];
  const [idChar, setIdChar] = useState(null);
  const charactersSelected = characters.find((char) => char?.id === idChar);

  const selectedId = charactersSelected?.id;
  const voiceActors = Array.isArray(charactersSelected?.voiceActors)
    ? charactersSelected.voiceActors
    : [];
  const visibleVoiceActors = voiceActors.slice(0, 4);

  const isMobile = useBreakpointValue({ base: true, xl: false });

  if (!characters.length) return null;

  return (
    <Flex
      direction={{ base: "column", xl: "row" }}
      gap={{ base: 0, xl: idChar ? 8 : 0 }}
      alignItems="start"
    >
      <Box
        flex={{ base: "1", xl: idChar ? "1.25" : "1" }}
        minW={0}
        w="full"
        transition="flex 0.3s ease"
      >
        <CharacterAnimeList
          characters={characters}
          selectedId={selectedId}
          setIdChar={(id) => setIdChar((prev) => (prev === id ? null : id))}
        />
      </Box>

      {isMobile ? (
        <Drawer.Root open={!!idChar} placement="bottom" onOpenChange={(e) => { if (!e.open) setIdChar(null); }}>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg="transparent" boxShadow="none" mb={4} px={4}>
              <CharacterAnimeVoiceActors
                charactersSelected={charactersSelected}
                voiceActors={voiceActors}
                visibleVoiceActors={visibleVoiceActors}
                onClose={() => setIdChar(null)}
              />
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      ) : (
        <Box
          flex={idChar ? "0.95" : "0"}
          minW={idChar ? "360px" : "0px"}
          w={idChar ? "full" : "0px"}
          opacity={idChar ? 1 : 0}
          h={idChar ? "auto" : "0px"}
          overflow="hidden"
          transition="all 0.3s ease"
          position="sticky"
          top="180px"
        >
          <CharacterAnimeVoiceActors
            charactersSelected={charactersSelected}
            voiceActors={voiceActors}
            visibleVoiceActors={visibleVoiceActors}
            onClose={() => setIdChar(null)}
          />
        </Box>
      )}
    </Flex>
  );
};

export default CharacterAnime;
