import { Button, HStack } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

function AnimeDetailsHeroAction({ anime, onJumpToEpisodes }) {
  const canWatchEpisode = Number(anime.episodes_count) > 0;

  return (
    <HStack gap="3" wrap="wrap" pt="2">
      <Button
        as={canWatchEpisode ? RouterLink : undefined}
        to={canWatchEpisode ? `/anime/${anime.id}/episode/1` : undefined}
        size="lg"
        disabled={!canWatchEpisode}
      >
        Watch Episode 1
      </Button>
      <Button size="lg" variant="plain" onClick={onJumpToEpisodes}>
        Jump to episodes <ArrowRight size={18} />
      </Button>
    </HStack>
  );
}

export default AnimeDetailsHeroAction;
