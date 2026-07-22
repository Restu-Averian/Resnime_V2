import { useMemo, useState } from "react";
import { Heading } from "@chakra-ui/react";
import CardData from "../../global/CardData";
import CharacterAnimeModal from "./CharacterAnimeModal";
import CharacterAnimeList from "./CharacterAnimeList";

const CharacterAnime = ({ data }) => {
  const [idChar, setIdChar] = useState();
  const [isOpenVA, setIsOpenVA] = useState(false);

  const charactersSelected = useMemo(() => {
    return data?.characters?.find((char) => char?.id === idChar);
  }, [idChar]);

  return (
    <CardData useDefault header={<Heading>Characters</Heading>}>
      <CharacterAnimeList
        data={data}
        onOpenVA={(char) => {
          setIdChar(char?.id);
          setIsOpenVA(true);
        }}
      />
      <CharacterAnimeModal
        charactersSelected={charactersSelected}
        isOpen={isOpenVA}
        onClose={() => {
          setIsOpenVA(false);
        }}
      />
    </CardData>
  );
};
export default CharacterAnime;
