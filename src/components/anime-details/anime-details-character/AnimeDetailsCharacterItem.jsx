import { Stack } from "@chakra-ui/react";
import AnimeDetailsCharacterPhoto from "./AnimeDetailsCharacterPhoto";
import AnimeDetailsCharacterInfo from "./AnimeDetailsCharacterInfo";

function AnimeDetailsCharacterItem({ character }) {
  return (
    <Stack
      as="article"
      flex="0 0 150px"
      gap="2.5"
      align="center"
      textAlign="center"
      scrollSnapAlign="start"
    >
      <AnimeDetailsCharacterPhoto character={character} />

      <AnimeDetailsCharacterInfo character={character} />
    </Stack>
  );
}

export default AnimeDetailsCharacterItem;
