import { Stack, Text } from "@chakra-ui/react";
import { formatDate as formatEpisodeDate } from "../../../lib/formatDate";

function AnimeStreamingEpsNavigationMain({ episode }) {
  return (
    <Stack
      align="center"
      gap="0.5"
      borderX={{ base: "0", md: "1px solid" }}
      borderColor="border.default"
    >
      <Text
        color="fg.heading"
        fontFamily="heading"
        fontSize="3xl"
        lineHeight="1"
      >
        Episode {episode?.episode_number}
      </Text>

      <Text color="accent.warmMuted" fontSize="sm">
        Aired {formatEpisodeDate(episode?.aired_at)}
      </Text>
    </Stack>
  );
}

export default AnimeStreamingEpsNavigationMain;
