import { Badge, Stack, Text } from "@chakra-ui/react";
import { ANIME_DETAILS_ROLE_LABELS } from "../../../constants/anime-details";

function AnimeDetailsCharacterInfo({ character }) {
  const voiceActor = character.voice_actors?.[0];
  const roleLabel =
    ANIME_DETAILS_ROLE_LABELS[character.role] ?? character.role ?? "Cast";

  return (
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
  );
}

export default AnimeDetailsCharacterInfo;
