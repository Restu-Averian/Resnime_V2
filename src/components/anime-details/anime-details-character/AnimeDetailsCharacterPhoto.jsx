import { Avatar, Box, Image } from "@chakra-ui/react";

function AnimeDetailsCharacterPhoto({ character }) {
  return character.photo ? (
    <Box
      w={{ base: "96px", md: "112px" }}
      h={{ base: "96px", md: "112px" }}
      overflow="hidden"
      borderRadius="full"
      border="1px solid"
      borderColor="border.emphasized"
      bg="bg.surface"
      boxShadow="media"
    >
      <Image
        src={character.photo}
        alt={character.name}
        w="full"
        h="full"
        objectFit="cover"
        objectPosition="center top"
      />
    </Box>
  ) : (
    <Avatar.Root
      w={{ base: "96px", md: "112px" }}
      h={{ base: "96px", md: "112px" }}
      bg="bg.surface"
      color="fg.heading"
      border="1px solid"
      borderColor="border.emphasized"
    >
      <Avatar.Fallback name={character.name} />
    </Avatar.Root>
  );
}

export default AnimeDetailsCharacterPhoto;
