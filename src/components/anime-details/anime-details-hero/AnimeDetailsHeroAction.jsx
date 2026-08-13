import { Button, HStack } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

function AnimeDetailsHeroAction({ onJumpToEpisodes }) {
  return (
    <HStack gap="3" wrap="wrap" pt="2">
      <Button size="lg" onClick={onJumpToEpisodes}>
        Watch Episode 1
      </Button>
      <Button size="lg" variant="plain" onClick={onJumpToEpisodes}>
        Jump to episodes <ArrowRight size={18} />
      </Button>
    </HStack>
  );
}

export default AnimeDetailsHeroAction;
