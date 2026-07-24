import { useState } from "react";
import { Grid } from "@chakra-ui/react";
import CharacterAnimeList from "./CharacterAnimeList";
import CharacterAnimeVoiceActors from "./CharacterAnimeVoiceActors";

const CharacterAnime = ({ data }) => {
  const characters = Array.isArray(data?.characters) ? data.characters : [];
  const [idChar, setIdChar] = useState();
  const charactersSelected =
    characters.find((char) => char?.id === idChar) || characters[0];

  const selectedId = charactersSelected?.id;
  const voiceActors = Array.isArray(charactersSelected?.voiceActors)
    ? charactersSelected.voiceActors
    : [];
  const visibleVoiceActors = voiceActors.slice(0, 4);

  if (!characters.length) return null;

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        xl: "minmax(0, 1.25fr) minmax(360px, 0.95fr)",
      }}
      gap={{ base: 5, xl: 8 }}
      alignItems="start"
    >
      <CharacterAnimeList
        characters={characters}
        selectedId={selectedId}
        setIdChar={setIdChar}
      />

      <CharacterAnimeVoiceActors
        charactersSelected={charactersSelected}
        voiceActors={voiceActors}
        visibleVoiceActors={visibleVoiceActors}
      />
    </Grid>
  );
};

export default CharacterAnime;
