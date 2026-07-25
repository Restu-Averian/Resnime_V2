import {
  Button,
  Stack,
  Text,
  HStack,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useEpisodeAnimeContext } from "../../../context/EpisodesAnimeContextProvider";

const StreamingAnimeAction = ({ requestClose }) => {
  const { data, episodeValParam, openModalVideo } = useEpisodeAnimeContext();

  const episodes = data?.episodes || [];
  const currentIndex = episodes.findIndex(
    (ep) => String(ep.id) === String(episodeValParam),
  );
  const totalEpisodes = episodes.length;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < totalEpisodes - 1;
  const currentEpisodeNum = currentIndex !== -1 ? currentIndex + 1 : 0;

  const episodeCollection = useMemo(() => {
    return createListCollection({
      items: episodes.map((ep, idx) => ({
        label: `Episode ${ep.number || idx + 1}`,
        value: String(ep.id),
      })),
    });
  }, [episodes]);

  const handlePrev = (e) => {
    if (hasPrev) {
      openModalVideo(e, episodes[currentIndex - 1].id);
    }
  };

  const handleNext = (e) => {
    if (hasNext) {
      openModalVideo(e, episodes[currentIndex + 1].id);
    }
  };

  return (
    <Stack gap={4} flex="1">
      <Stack gap={3} flex="1" justify="center">
        <Text color="#ff5f92" fontSize="sm" fontWeight="bold" mb={3}>
          Episode Navigation
        </Text>

        <HStack gap={3} w="100%">
          <Button
            flex="1"
            h="40px"
            borderRadius="8px"
            variant="outline"
            borderColor="rgba(255, 104, 152, 0.5)"
            color="#ff5f92"
            fontSize="sm"
            _hover={{ bg: "rgba(255, 95, 146, 0.1)" }}
            disabled={!hasPrev}
            onClick={handlePrev}
          >
            &lt; Prev
          </Button>

          <Select.Root
            collection={episodeCollection}
            size="sm"
            flex="1"
            value={episodeValParam ? [String(episodeValParam)] : []}
            onValueChange={(e) => {
              if (e.value?.[0]) {
                openModalVideo(null, e.value[0]);
              }
            }}
          >
            <Select.HiddenSelect aria-label="Select episode" />

            <Select.Control
              h="40px"
              borderRadius="8px"
              border="1px solid rgba(255, 104, 152, 0.5)"
              bg="transparent"
            >
              <Select.Trigger border="0" px={3} h="100%">
                <Select.ValueText
                  placeholder="Select episode"
                  color="white"
                  fontSize="sm"
                />
              </Select.Trigger>

              <Select.IndicatorGroup px={2}>
                <Select.Indicator color="white" />
              </Select.IndicatorGroup>
            </Select.Control>

            <Select.Positioner zIndex={1500}>
              <Select.Content
                bg="#0a1027"
                borderColor="rgba(255, 104, 152, 0.3)"
                maxH="240px"
              >
                {episodeCollection.items.map((item) => (
                  <Select.Item item={item} key={item.value} color="white">
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>

          <Button
            flex="1"
            h="40px"
            borderRadius="8px"
            variant="outline"
            borderColor="rgba(255, 104, 152, 0.5)"
            color="#ff5f92"
            fontSize="sm"
            _hover={{ bg: "rgba(255, 95, 146, 0.1)" }}
            disabled={!hasNext}
            onClick={handleNext}
          >
            Next &gt;
          </Button>
        </HStack>

        {totalEpisodes > 0 && (
          <Stack gap={1} mt={1}>
            <Text color="gray.400" fontSize="xs" textAlign="center">
              {currentEpisodeNum} of {totalEpisodes} episodes
            </Text>
            <Text color="gray.400" fontSize="10px" textAlign="center">
              Jump between episodes without leaving the player.
            </Text>
          </Stack>
        )}
      </Stack>

      <Button
        mt="auto"
        h="56px"
        borderRadius="10px"
        variant="outline"
        borderColor="rgba(255, 104, 152, 0.74)"
        color="white"
        _hover={{ bg: "rgba(255,255,255,0.06)" }}
        _focusVisible={{
          outline: "2px solid #ff6d8f",
          outlineOffset: "2px",
        }}
        onClick={requestClose}
      >
        Close Player
      </Button>
    </Stack>
  );
};

export default StreamingAnimeAction;
