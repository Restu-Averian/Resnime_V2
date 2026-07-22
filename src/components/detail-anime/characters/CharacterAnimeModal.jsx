import { Alert, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import CardData from "../../global/CardData";
import Modal from "../../global/Modal";
import useResponsive from "../../../hooks/useResponsive";
import Box from "../../global/Box";
import BgImage from "../../global/BgImage";

/**
 *
 * @param {Object} props
 * @param {Boolean} props.isOpen state for check is modal detail of va is open
 * @param {(char:String)=>void} props.onOpenVA handler for open modal va
 * @returns {Element}
 */
const CharacterAnimeModal = ({ isOpen, onClose, charactersSelected }) => {
  const { sm } = useResponsive();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <CardData
        useDefault
        header={
          <Heading as="h3" textAlign="center">
            {charactersSelected?.name?.full}
          </Heading>
        }
      >
        {charactersSelected?.voiceActors?.length > 0 ? (
          <SimpleGrid columns={sm ? 2 : 3} spacing={5}>
            {charactersSelected?.voiceActors?.map((va) => (
              <Box key={va?.id}>
                <BgImage
                  src={va?.image}
                  w={120}
                  h={120}
                  m="auto"
                  borderRadius="full"
                />
                <Text textAlign="center">{va?.name?.full}</Text>
                <Text textAlign="center">{va?.language}</Text>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Alert status="info">No Information About Voice Actors</Alert>
        )}
      </CardData>
    </Modal>
  );
};
export default CharacterAnimeModal;
