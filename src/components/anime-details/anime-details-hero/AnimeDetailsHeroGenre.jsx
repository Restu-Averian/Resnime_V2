import { Badge, HStack } from "@chakra-ui/react";

function AnimeDetailsHeroGenre({ anime }) {
  if (!anime.genres || anime.genres.length === 0) return null;

  return (
    <HStack gap="2" wrap="wrap" pt="1">
      {anime.genres.map((genre) => (
        <Badge key={genre} variant="accent" size="sm">
          {genre}
        </Badge>
      ))}
    </HStack>
  );
}

export default AnimeDetailsHeroGenre;
