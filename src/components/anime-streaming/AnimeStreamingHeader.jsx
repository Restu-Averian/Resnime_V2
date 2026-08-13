import { HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

function AnimeStreamingHeader({ malId, episode }) {
  return (
    <Stack gap="2">
      <HStack
        as={RouterLink}
        to={`/anime/${malId}`}
        color="accent.primary"
        fontSize="sm"
        gap="2"
        w="fit-content"
        _hover={{ color: "accent.hover" }}
      >
        <ArrowLeft size={18} />
        <Text>Back to anime details</Text>
      </HStack>

      <HStack align="baseline" gap="4" wrap="wrap">
        <Text as="h1" textStyle="display" color="fg.heading">
          {episode.title_en || episode.title_romaji || "Untitled Anime"}
        </Text>
        {episode.title_romaji ? (
          <Text color="accent.warmMuted" fontFamily="heading" fontSize="lg">
            {episode.title_romaji}
          </Text>
        ) : null}
      </HStack>

      <Text color="fg.heading" fontFamily="heading" fontSize="lg">
        Episode {episode.episode_number} of {episode.total_episodes}
      </Text>
    </Stack>
  );
}

export default AnimeStreamingHeader;
