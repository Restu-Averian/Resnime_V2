import { Box, Image } from "@chakra-ui/react";
import placeholderImage from "../../../assets/placeholder.png";

function AnimeDetailsHeroPhoto({ anime }) {
  return (
    <Box
      flex="0 0 auto"
      w={{ base: "190px", md: "250px", xl: "292px" }}
      alignSelf={{ base: "center", md: "flex-start" }}
      aspectRatio="2 / 3"
      overflow="hidden"
      borderRadius="media"
      border="1px solid"
      borderColor="border.emphasized"
      boxShadow="elevated"
      bg="bg.panel"
    >
      <Image
        src={anime.photo || placeholderImage}
        alt={anime.title_en || anime.title_romaji || "Anime poster"}
        w="full"
        h="full"
        objectFit="cover"
        objectPosition="center top"
      />
    </Box>
  );
}

export default AnimeDetailsHeroPhoto;
