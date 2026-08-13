import { HStack, Stack, Text } from "@chakra-ui/react";
import { Star } from "lucide-react";
import {
  ANIME_DETAILS_STATUS_LABELS,
  ANIME_DETAILS_TYPE_LABELS,
} from "../../../constants/anime-details";

function AnimeDetailsHeroInfo({ anime }) {
  const typeLabel = ANIME_DETAILS_TYPE_LABELS[anime.type] ?? anime.type ?? "—";

  const statusLabel =
    ANIME_DETAILS_STATUS_LABELS[anime.status] ?? anime.status ?? "—";

  const seasonYear = [anime.season, anime.year].filter(Boolean).join(" ");

  const episodeLabel = `${anime.episodes_count ?? 0} Episodes`;

  return (
    <>
      <Stack gap="2">
        <Text
          as="h1"
          textStyle="display"
          color="fg.heading"
          fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}
          lineHeight="1"
        >
          {anime.title_en || anime.title_romaji}
        </Text>

        {anime.title_romaji && anime.title_romaji !== anime.title_en && (
          <Text color="fg.muted" fontSize={{ base: "md", md: "lg" }}>
            {anime.title_romaji}
          </Text>
        )}
      </Stack>

      <HStack
        gap="2.5"
        wrap="wrap"
        color="fg.default"
        fontSize={{ base: "sm", md: "md" }}
      >
        <Text>{typeLabel}</Text>
        <Text color="accent.warmMuted">•</Text>
        <Text>{episodeLabel}</Text>
        <Text color="accent.warmMuted">•</Text>
        <Text>{statusLabel}</Text>
        {seasonYear && (
          <>
            <Text color="accent.warmMuted">•</Text>
            <Text>{seasonYear}</Text>
          </>
        )}
      </HStack>

      <HStack gap="3" wrap="wrap" color="fg.default">
        {anime.score !== null && anime.score !== undefined && (
          <HStack gap="1.5">
            <Star
              size={18}
              fill="var(--resnime-colors-rating-default)"
              color="var(--resnime-colors-rating-default)"
              strokeWidth={1.4}
            />
            <Text color="rating.default" fontWeight="600">
              {Number(anime.score).toFixed(1)}
            </Text>
          </HStack>
        )}

        {anime.studio && (
          <>
            <Text color="accent.warmMuted">•</Text>
            <Text>Studio: {anime.studio}</Text>
          </>
        )}
      </HStack>

      {anime.synopsis && (
        <Text
          color="fg.default"
          maxW="700px"
          lineClamp={{ base: "4", md: "3" }}
          lineHeight="1.8"
        >
          {anime.synopsis}
        </Text>
      )}
    </>
  );
}

export default AnimeDetailsHeroInfo;
