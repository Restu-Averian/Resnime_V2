import { Avatar, Badge, Box, Image, Stack, Text } from "@chakra-ui/react";
import { ANIME_DETAILS_ROLE_LABELS } from "../../constants/anime-details";

function AnimeDetailsCharacterItem({ character }) {
  const voiceActor = character.voice_actors?.[0];
  const roleLabel =
    ANIME_DETAILS_ROLE_LABELS[character.role] ?? character.role ?? "Cast";

  return (
    <Stack
      as="article"
      flex="0 0 150px"
      gap="2.5"
      align="center"
      textAlign="center"
      scrollSnapAlign="start"
    >
      {character.photo ? (
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
      )}

      <Stack gap="1.5" minW="0" w="full" align="center">
        <Stack gap="1">
          <Text
            textStyle="cardTitle"
            color="fg.heading"
            lineClamp="1"
            fontSize={{ base: "md", md: "lg" }}
          >
            {character.name}
          </Text>
          <Badge
            variant={character.role === "Main" ? "warm" : "neutral"}
            size="sm"
          >
            {roleLabel}
          </Badge>
        </Stack>

        <Text color="fg.muted" fontSize="sm" lineClamp="1" maxW="full">
          CV: {voiceActor?.name ?? "—"}
        </Text>
      </Stack>
    </Stack>
  );
}

export default AnimeDetailsCharacterItem;
