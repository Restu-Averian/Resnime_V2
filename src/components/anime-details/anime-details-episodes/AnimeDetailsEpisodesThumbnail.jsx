import { Box, Image } from "@chakra-ui/react";

function AnimeDetailsEpisodesThumbnail({ episode }) {
  const episodeNumber = Number(episode.episode_number);
  const fallbackLabel = `EP ${String(episodeNumber).padStart(2, "0")}`;

  return (
    <Box aspectRatio="16 / 9" overflow="hidden" bg="bg.subtle">
      {episode.thumbnail_url ? (
        <Image
          src={episode.thumbnail_url}
          alt={`Episode ${episodeNumber}`}
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center"
        />
      ) : (
        <Box
          display="grid"
          placeItems="center"
          w="full"
          h="full"
          bg="bg.panel"
          color="fg.heading"
          fontFamily="heading"
          fontSize="3xl"
          borderBottom="1px solid"
          borderColor="border.subtle"
        >
          {fallbackLabel}
        </Box>
      )}
    </Box>
  );
}

export default AnimeDetailsEpisodesThumbnail;
