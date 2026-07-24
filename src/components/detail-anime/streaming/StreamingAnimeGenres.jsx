import { Badge, HStack } from "@chakra-ui/react";

const StreamingAnimeGenres = ({ genres }) => {
  if (!genres || genres.length === 0) return null;
  return (
    <HStack gap={3} flexWrap="wrap">
      {genres.map((genre) => (
        <Badge
          key={genre}
          px={3}
          py={2}
          borderRadius="12px"
          bg="rgba(255,255,255,0.075)"
          color="gray.100"
          border="1px solid rgba(255,255,255,0.05)"
          textTransform="none"
          fontSize="sm"
          fontWeight="medium"
        >
          {genre}
        </Badge>
      ))}
    </HStack>
  );
};

export default StreamingAnimeGenres;
