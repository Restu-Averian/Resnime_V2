import { Button, SimpleGrid, Stack, Tag, Text } from "@chakra-ui/react";
import useResponsive from "../../../hooks/useResponsive";
import BgImage from "../../global/BgImage";
import { ROLES } from "../../../constants";

/**
 *
 * @param {Object} props
 * @param {Object} props.data
 * @param {(char:String)=>void} props.onOpenVA
 * @returns {Element}
 */
const CharacterAnimeList = ({ data, onOpenVA }) => {
  const { sm } = useResponsive();

  return (
    <SimpleGrid columns={sm ? 2 : 5} spacing={10}>
      {data?.characters?.map((char) => (
        <Stack key={char?.id} spacing={sm ? 3 : 5}>
          <BgImage
            src={char?.image}
            w={120}
            h={120}
            m="auto"
            borderRadius="full"
          />

          <Text textAlign="center">{char?.name?.full}</Text>

          <Tag.Root
            textAlign="center"
            display="block"
            pt={1}
            variant="outline"
            colorPalette={ROLES[char?.role]}
            borderRadius="full"
          >
            <Tag.Label>{char?.role}</Tag.Label>
          </Tag.Root>

          <Button
            onClick={() => {
              onOpenVA(char);
            }}
          >
            Voice Actors
          </Button>
        </Stack>
      ))}
    </SimpleGrid>
  );
};
export default CharacterAnimeList;
